'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Sidebar from '@/components/Sidebar';
import Filters from '@/components/Filters';
import { fetchAssignments, submitAssignment } from '@/utils/apihelper';

export default function AssignmentList() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('assignments');
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState({});
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
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
                        loadAssignments(1, updatedFilters);
                    } else if (value === '') {
                        // If search is cleared, reload without job_name filter
                        const updatedFilters = { ...filters };
                        delete updatedFilters.job_name;
                        setFilters(updatedFilters);
                        setPagination(prev => ({ ...prev, currentPage: 1 }));
                        loadAssignments(1, updatedFilters);
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

        loadAssignments();
    }, [router]);

    const loadAssignments = async (page = 1, filterParams = {}) => {
        try {
            setLoading(true);
            
            // Merge filters with search term
            const searchFilters = {
                ...filterParams,
                ...(searchTerm && { job_name: searchTerm })
            };
            
            const result = await fetchAssignments(page, pagination.limit, searchFilters);
            
            if (result.success && result.data) {
                setAssignments(result.data);
                
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
                console.error('Failed to load assignments:', result.message);
                toast.error(result.message || 'Failed to load assignments');
            }
        } catch (error) {
            console.error('Error loading assignments:', error);
            toast.error('Failed to load assignments');
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
        loadAssignments(1, filterParams);
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
        loadAssignments(newPage, filters);
    };

    const handleClearFilters = () => {
        setFilters({});
        setSearchTerm('');
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        loadAssignments(1, {});
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
        loadAssignments(1, updatedFilters);
    };

    const handleSidebarNavigation = (tab) => {
        setActiveTab(tab);
        
        // Handle navigation to other pages (only for non-assignment related tabs)
        if (tab === 'interviews' || tab === 'chat' || tab === 'companies-followed') {
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
        
        // For assignments tab, reset filters and reload assignments
        if (tab === 'assignments') {
            setFilters({});
            setSearchTerm('');
            setPagination(prev => ({ ...prev, currentPage: 1 }));
            loadAssignments(1, {});
        }
    };

    const handleDownload = async () => {
        try {
            // You can implement assignment export functionality here
            toast.info('Assignment export functionality will be implemented');
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Failed to download assignments');
        }
    };

    const handleOpenSubmitModal = (assignment) => {
        setSelectedAssignment(assignment);
        setSubmitForm({
            message: 'sw assignment message',
            attachment: null
        });
        setShowSubmitModal(true);
    };

    const handleCloseSubmitModal = () => {
        setShowSubmitModal(false);
        setSelectedAssignment(null);
        setSubmitForm({
            message: '',
            attachment: null
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSubmitForm(prev => ({
            ...prev,
            attachment: file
        }));
    };

    const handleSubmitAssignment = async () => {
        if (!selectedAssignment) return;
        
        try {
            setSubmitting(prev => ({ ...prev, [selectedAssignment.id]: true }));
            
            // Prepare submission data
            const submissionData = {
                message: submitForm.message,
                attachment: submitForm.attachment
            };
            
            const result = await submitAssignment(selectedAssignment.id, submissionData);
            
            if (result.success || result.status) {
                toast.success('Assignment submitted successfully!');
                handleCloseSubmitModal();
                // Reload assignments to update status
                loadAssignments();
            } else {
                toast.error('Failed to submit assignment: ' + (result.message || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Submit assignment error:', error);
            toast.error('Failed to submit assignment: ' + error.message);
        } finally {
            setSubmitting(prev => ({ ...prev, [selectedAssignment.id]: false }));
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading assignments...</p>
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
                                <span className="font-semibold text-gray-900">Assignments</span>
                            </nav>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
                                </div>
                                
                                {/* Search and Download */}
                                <div className="flex items-center space-x-4">
                                    {/* Search Bar */}
                                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search Assignment"
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

                        {/* Assignment List Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Assignment List</h2>
                        </div>

                        {/* Assignments List */}
                        <div className="space-y-6">
                            {assignments.length > 0 ? (
                                assignments.map((assignment) => (
                                    <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                        {/* Top Section */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-4">
                                                {/* Company Logo */}
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                    {assignment.job?.employer?.logo_url ? (
                                                        <img 
                                                            src={assignment.job.employer.logo_url} 
                                                            alt={assignment.job.employer.organization_name}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                                            <span className="text-gray-600 font-semibold text-sm">
                                                                {assignment.job?.employer?.organization_name?.charAt(0) || 'C'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Job Info */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {assignment.job?.job_title || 'Job Title'}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {assignment.job?.employer?.organization_name || 'Company Name'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message Section */}
                                        <div className="mb-6">
                                            <p className="text-gray-500 text-sm mb-3">
                                                {formatDate(assignment.createdAt)}
                                            </p>
                                            
                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <div 
                                                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: assignment.message || 'Thank you for your interest in our job opening. As a next step, we are expecting you to complete a short assignment.' }}
                                                />
                                                <p className="text-gray-600 mt-2">
                                                    Thanks, James Doe
                                                </p>
                                            </div>

                                            {/* View Attachment Button */}
                                            {assignment.attachment && (
                                                <button 
                                                    onClick={() => window.open(`http://localhost:5000/${assignment.attachment}`, '_blank')}
                                                    className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                    </svg>
                                                    View Attachment
                                                </button>
                                            )}
                                        </div>

                                        {/* Bottom Section - Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            {assignment.deadline && (
                                                <div className="text-gray-700">
                                                    <span className="font-medium">Deadline:</span> {formatDeadline(assignment.deadline)}
                                                </div>
                                            )}
                                            
                                            {assignment.assignment_status === 'pending' && (
                                                <button
                                                    onClick={() => handleOpenSubmitModal(assignment)}
                                                    disabled={submitting[assignment.id]}
                                                    className={`px-6 py-3 rounded-full font-medium transition-colors ${
                                                        submitting[assignment.id]
                                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                                    }`}
                                                >
                                                    {submitting[assignment.id] ? 'Submitting...' : 'Submit Assignment'}
                                                </button>
                                            )}
                                            
                                            {assignment.assignment_status === 'submitted' && (
                                                <div className="px-6 py-3 bg-green-100 text-green-700 rounded-full font-medium">
                                                    Assignment Submitted
                                                </div>
                                            )}
                                            
                                            {assignment.assignment_status === 'shortlisted' && (
                                                <div className="px-6 py-3 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                                                    Shortlisted
                                                </div>
                                            )}
                                            
                                            {assignment.assignment_status === 'hired' && (
                                                <div className="px-6 py-3 bg-green-100 text-green-700 rounded-full font-medium">
                                                    Hired
                                                </div>
                                            )}
                                            
                                            {assignment.assignment_status === 'rejected' && (
                                                <div className="px-6 py-3 bg-red-100 text-red-700 rounded-full font-medium">
                                                    Rejected
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h3>
                                    <p className="text-gray-600">You don't have any pending assignments at the moment.</p>
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

            {/* Submit Assignment Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Submit Assignment</h2>
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                    placeholder="Enter your message..."
                                />
                            </div>

                            {/* Attachment Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                    Attachment
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                                onClick={handleSubmitAssignment}
                                disabled={submitting[selectedAssignment?.id] || !submitForm.message.trim()}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                    submitting[selectedAssignment?.id] || !submitForm.message.trim()
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {submitting[selectedAssignment?.id] ? 'Sending...' : 'Send Assignment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
