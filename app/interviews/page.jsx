'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Sidebar from '@/components/Sidebar';
import Filters from '@/components/Filters';
import { fetchInterviews, submitInterview, updateInterviewStatus, fetchInterviewDetail } from '@/utils/apihelper';
import InterviewDetailModal from '@/components/InterviewDetailModal';

export default function InterviewList() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('interviews');
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState({});
    const [accepting, setAccepting] = useState({});
    const [rejecting, setRejecting] = useState({});
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [selectedInterviewId, setSelectedInterviewId] = useState(null);
    const [submitForm, setSubmitForm] = useState({
        message: '',
        attachment: null
    });
    
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10
    });

    // Debounced search function
    const debouncedSearch = useCallback(
        (() => {
            let timeoutId;
            return (value) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    if (value.trim()) {
                        const updatedFilters = { ...filters, job_name: value };
                        setFilters(updatedFilters);
                        setPagination(prev => ({ ...prev, currentPage: 1 }));
                        loadInterviews(1, updatedFilters);
                    } else if (value === '') {
                        // If search is cleared, reload without job_name filter
                        const updatedFilters = { ...filters };
                        delete updatedFilters.job_name;
                        setFilters(updatedFilters);
                        setPagination(prev => ({ ...prev, currentPage: 1 }));
                        loadInterviews(1, updatedFilters);
                    }
                }, 500); // 500ms delay
            };
        })(),
        [filters]
    );

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        loadInterviews();
    }, [router]);

    const loadInterviews = async (page = 1, filterParams = {}) => {
        try {
            setLoading(true);
            
            // Merge filters with search term
            const searchFilters = {
                ...filterParams,
                ...(searchTerm && { job_name: searchTerm })
            };
            
            const result = await fetchInterviews(page, pagination.limit, searchFilters);
            
            if (result.success && result.data) {
                setInterviews(result.data);
                
                // Update pagination if API returns pagination info
                if (result.pagination) {
                    setPagination({
                        currentPage: result.pagination.page || page,
                        totalPages: result.pagination.totalPages || 1,
                        totalItems: result.pagination.total || 0,
                        limit: result.pagination.limit || 10
                    });
                }
            } else {
                console.error('Failed to load interviews:', result.message);
                toast.error(result.message || 'Failed to load interviews');
            }
        } catch (error) {
            console.error('Error loading interviews:', error);
            toast.error('Failed to load interviews');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filterParams) => {
        setFilters(filterParams);
        // Sync job_name filter with search term
        if (filterParams.job_name !== undefined) {
            setSearchTerm(filterParams.job_name || '');
        }
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        loadInterviews(1, filterParams);
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
        loadInterviews(newPage, filters);
    };

    const handleClearFilters = () => {
        setFilters({});
        setSearchTerm('');
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        loadInterviews(1, {});
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        // Update filters with job_name but don't trigger API call immediately
        const updatedFilters = { ...filters, job_name: value };
        setFilters(updatedFilters);
        // Trigger debounced search
        debouncedSearch(value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Trigger search with current search term
        const updatedFilters = { ...filters, job_name: searchTerm };
        setFilters(updatedFilters);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        loadInterviews(1, updatedFilters);
    };

    const handleSidebarNavigation = (tab) => {
        setActiveTab(tab);
        
        // Handle navigation to other pages (only for non-interview related tabs)
        if (tab === 'assignments' || tab === 'chat' || tab === 'companies-followed') {
            router.push(`/${tab}`);
            return;
        }
        
        // Handle saved jobs navigation (redirect to saved jobs page)
        if (tab === 'saved-jobs') {
            router.push('/saved-jobs');
            return;
        }
        
        // Handle other job-related navigation (redirect to dashboard)
        if (tab === 'all-jobs' || tab === 'applied-jobs' || 
            tab === 'shortlisted' || tab === 'hired' || tab === 'rejected') {
            router.push('/dashboard');
            return;
        }
        
        // For interviews tab, reset filters and reload interviews
        if (tab === 'interviews') {
            setFilters({});
            setSearchTerm('');
            setPagination(prev => ({ ...prev, currentPage: 1 }));
            loadInterviews(1, {});
        }
    };

    const handleDownload = async () => {
        try {
            // You can implement interview export functionality here
            toast.info('Interview export functionality will be implemented');
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Failed to download interviews');
        }
    };

    const handleOpenSubmitModal = (interview) => {
        setSelectedInterview(interview);
        setSubmitForm({
            message: 'sw interview message',
            attachment: null
        });
        setShowSubmitModal(true);
    };

    const handleCloseSubmitModal = () => {
        setShowSubmitModal(false);
        setSelectedInterview(null);
        setSubmitForm({
            message: '',
            attachment: null
        });
    };

    const handleOpenDetailModal = (interview) => {
        setSelectedInterviewId(interview.id);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedInterviewId(null);
    };

    const handleStatusUpdate = () => {
        // Reload interviews when status is updated from modal
        loadInterviews();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSubmitForm(prev => ({
            ...prev,
            attachment: file
        }));
    };

    const handleSubmitInterview = async () => {
        if (!selectedInterview) return;
        
        try {
            setSubmitting(prev => ({ ...prev, [selectedInterview.id]: true }));
            
            // Prepare submission data
            const submissionData = {
                message: submitForm.message,
                attachment: submitForm.attachment
            };
            
            const result = await submitInterview(selectedInterview.id, submissionData);
            
            if (result.success || result.status) {
                toast.success('Interview submitted successfully!');
                handleCloseSubmitModal();
                // Reload interviews to update status
                loadInterviews();
            } else {
                toast.error('Failed to submit interview: ' + (result.message || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Submit interview error:', error);
            toast.error('Failed to submit interview: ' + error.message);
        } finally {
            setSubmitting(prev => ({ ...prev, [selectedInterview.id]: false }));
        }
    };

    const handleAcceptInterview = async (interviewId) => {
        try {
            setAccepting(prev => ({ ...prev, [interviewId]: true }));
            
            const result = await updateInterviewStatus(interviewId, 'accepted');
            
            if (result.success || result.status) {
                toast.success('Interview accepted successfully!');
                // Reload interviews to update status
                loadInterviews();
            } else {
                toast.error('Failed to accept interview: ' + (result.message || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Accept interview error:', error);
            toast.error('Failed to accept interview: ' + error.message);
        } finally {
            setAccepting(prev => ({ ...prev, [interviewId]: false }));
        }
    };

    const handleRejectInterview = async (interviewId) => {
        const reason = prompt('Please provide a reason for rejecting this interview (optional):');
        
        try {
            setRejecting(prev => ({ ...prev, [interviewId]: true }));
            
            const result = await updateInterviewStatus(interviewId, 'rejected', reason || '');
            
            if (result.success || result.status) {
                toast.success('Interview rejected successfully!');
                // Reload interviews to update status
                loadInterviews();
            } else {
                toast.error('Failed to reject interview: ' + (result.message || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Reject interview error:', error);
            toast.error('Failed to reject interview: ' + error.message);
        } finally {
            setRejecting(prev => ({ ...prev, [interviewId]: false }));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Sent 1 day ago';
        if (diffDays < 7) return `Sent ${diffDays} days ago`;
        if (diffDays < 30) return `Sent ${Math.ceil(diffDays / 7)} weeks ago`;
        return `Sent ${Math.ceil(diffDays / 30)} months ago`;
    };

    const formatDeadline = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return 'Not specified';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-700';
            case 'completed':
                return 'bg-green-100 text-green-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            case 'hired':
                return 'bg-emerald-100 text-emerald-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading interviews...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Left Sidebar */}
                <Sidebar activeTab={activeTab} onNavigate={handleSidebarNavigation} />
                
                {/* Main Content */}
                <main className="flex-1 p-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="mb-4">
                            <nav className="text-sm">
                                <span className="text-gray-500">Dashboard</span>
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="font-semibold text-gray-900">Interviews</span>
                            </nav>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
                                </div>
                                
                                {/* Search and Download */}
                                <div className="flex items-center space-x-4">
                                    {/* Search Bar */}
                                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search Interview"
                                                value={searchTerm}
                                                onChange={(e) => handleSearch(e.target.value)}
                                                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                                            />
                                            <button
                                                type="submit"
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                    
                                    {/* Download Button */}
                                    <button 
                                        onClick={handleDownload}
                                        className="p-2 text-gray-600 hover:text-gray-800"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Interview List Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Interview List</h2>
                        </div>

                        {/* Interviews List */}
                        <div className="space-y-6">
                            {interviews.length > 0 ? (
                                interviews.map((interview) => (
                                    <div key={interview.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                        {/* Top Section */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-4">
                                                {/* Company Logo */}
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                    {interview.job?.employer?.logo_url ? (
                                                        <img 
                                                            src={interview.job.employer.logo_url} 
                                                            alt={interview.job.employer.organization_name}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                                            <span className="text-gray-600 font-semibold text-sm">
                                                                {interview.job?.employer?.organization_name?.charAt(0) || 'C'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Job Info */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {interview.job?.job_title || 'Job Title'}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {interview.job?.employer?.organization_name || 'Company Name'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Interview Details Section */}
                                        <div className="mb-6">
                                            <p className="text-gray-500 text-sm mb-3">
                                                {formatDate(interview.createdAt)}
                                            </p>
                                            
                                            {/* Interview Message */}
                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <div 
                                                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: interview.message || 'Thank you for your interest in our job opening. We would like to schedule an interview with you.' }}
                                                />
                                                <p className="text-gray-600 mt-2">
                                                    Thanks, {interview.job?.employer?.organization_name || 'Company'}
                                                </p>
                                            </div>

                                            {/* Interview Details */}
                                            <div className="bg-green-50 rounded-lg p-4 mb-4">
                                                <h4 className="font-semibold text-green-800 mb-3">Interview Details</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <span className="text-sm font-medium text-green-700">Interview Type:</span>
                                                        <p className="text-green-800 capitalize">{interview.interview_type || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-green-700">Interview Date:</span>
                                                        <p className="text-green-800">{formatDeadline(interview.interview_date)}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-green-700">Interview Time:</span>
                                                        <p className="text-green-800">{formatTime(interview.interview_time)}</p>
                                                    </div>
                                                    {interview.interview_type === 'office' && interview.office_address && (
                                                        <div className="md:col-span-2">
                                                            <span className="text-sm font-medium text-green-700">Office Address:</span>
                                                            <p className="text-green-800">{interview.office_address}</p>
                                                        </div>
                                                    )}
                                                    {interview.interview_type === 'online' && interview.video_link && (
                                                        <div className="md:col-span-2">
                                                            <span className="text-sm font-medium text-green-700">Video Link:</span>
                                                            <a 
                                                                href={interview.video_link} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-green-600 hover:text-green-800 underline"
                                                            >
                                                                {interview.video_link}
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Additional Information */}
                                            {(interview.reschedule_at || interview.hire_at || interview.cancel_at) && (
                                                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                                    <h4 className="font-semibold text-blue-800 mb-3">Status Updates</h4>
                                                    <div className="space-y-2">
                                                        {interview.reschedule_at && (
                                                            <div className="flex items-center text-blue-700">
                                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                <span className="text-sm">Rescheduled: {formatDate(interview.reschedule_at)}</span>
                                                            </div>
                                                        )}
                                                        {interview.hire_at && (
                                                            <div className="flex items-center text-green-700">
                                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <span className="text-sm">Hired: {formatDate(interview.hire_at)}</span>
                                                            </div>
                                                        )}
                                                        {interview.cancel_at && (
                                                            <div className="flex items-center text-red-700">
                                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                                <span className="text-sm">Cancelled: {formatDate(interview.cancel_at)}</span>
                                                                {interview.cancel_reason && (
                                                                    <span className="text-sm ml-2">- {interview.cancel_reason}</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Section - Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <div className="text-gray-700">
                                                <span className="font-medium">Interview Date:</span> {formatDeadline(interview.interview_date)}
                                            </div>
                                            
                                            {/* Status Badge */}
                                            <div className="flex items-center space-x-3">
                                                {/* View Detail Button */}
                                                <button
                                                    onClick={() => handleOpenDetailModal(interview)}
                                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium transition-colors"
                                                >
                                                    View Detail
                                                </button>
                                                
                                                {/* Show Accept/Reject buttons when both cancel_at and accepted_at are null */}
                                                {interview.cancel_at === null && interview.accepted_at === null && (
                                                    <>
                                                        <button
                                                            onClick={() => handleAcceptInterview(interview.id)}
                                                            disabled={accepting[interview.id]}
                                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                                accepting[interview.id]
                                                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            }`}
                                                        >
                                                            {accepting[interview.id] ? 'Accepting...' : 'Accept'}
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectInterview(interview.id)}
                                                            disabled={rejecting[interview.id]}
                                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                                rejecting[interview.id]
                                                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                            }`}
                                                        >
                                                            {rejecting[interview.id] ? 'Rejecting...' : 'Rejected'}
                                                        </button>
                                                    </>
                                                )}
                                                
                                                {/* Show Submit Response button for pending interviews */}
                                                {interview.user_status === 'pending' && (
                                                    <button
                                                        onClick={() => handleOpenSubmitModal(interview)}
                                                        disabled={submitting[interview.id]}
                                                        className={`px-6 py-3 rounded-full font-medium transition-colors ${
                                                            submitting[interview.id]
                                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                                : 'bg-green-500 text-white hover:bg-green-600'
                                                        }`}
                                                    >
                                                        {submitting[interview.id] ? 'Submitting...' : 'Submit Response'}
                                                    </button>
                                                )}
                                                
                                                {/* Show status badge for non-pending interviews */}
                                                {interview.user_status !== 'pending' && (
                                                    <div className={`px-6 py-3 rounded-full font-medium ${getStatusColor(interview.user_status)}`}>
                                                        {interview.user_status.charAt(0).toUpperCase() + interview.user_status.slice(1)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews yet</h3>
                                    <p className="text-gray-600">You don't have any pending interviews at the moment.</p>
                                </div>
                            )}
                            
                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-2 mt-8">
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        disabled={pagination.currentPage === 1}
                                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>
                                    
                                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-2 rounded-lg ${
                                                pagination.currentPage === page
                                                    ? 'bg-green-500 text-white'
                                                    : 'border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        disabled={pagination.currentPage === pagination.totalPages}
                                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Right Filters Sidebar */}
                <Filters 
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    currentSearchTerm={searchTerm}
                />
            </div>

            {/* Submit Interview Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Submit Interview</h2>
                            <button
                                onClick={handleCloseSubmitModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Message Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message*
                                </label>
                                <textarea
                                    value={submitForm.message}
                                    onChange={(e) => setSubmitForm(prev => ({ ...prev, message: e.target.value }))}
                                    rows={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                                    placeholder="Enter your message..."
                                />
                            </div>

                            {/* Attachment Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <svg className="w-4 h-4 inline mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                    Attachment
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Minimum file size 5Mb. Supported files: jpg, png, pdf
                                </p>
                                {submitForm.attachment && (
                                    <p className="text-sm text-green-600 mt-1">
                                        Selected: {submitForm.attachment.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                            <button
                                onClick={handleCloseSubmitModal}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitInterview}
                                disabled={submitting[selectedInterview?.id] || !submitForm.message.trim()}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                    submitting[selectedInterview?.id] || !submitForm.message.trim()
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                            >
                                {submitting[selectedInterview?.id] ? 'Sending...' : 'Send Interview'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Interview Detail Modal */}
            <InterviewDetailModal
                open={showDetailModal}
                onClose={handleCloseDetailModal}
                interviewId={selectedInterviewId}
                onStatusUpdate={handleStatusUpdate}
            />
        </div>
    );
}
