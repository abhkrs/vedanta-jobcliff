'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Filters from '@/components/Filters';
import { fetchJobs, exportJobs } from '@/utils/apihelper';

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all-jobs');
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 9
    });

    useEffect(() => {
        // Check if user is authenticated
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (!token) {
                router.replace('/join');
            }
        }
    }, [router]);

    const loadJobs = async (page = 1, filterParams = {}) => {
        try {
            setJobsLoading(true);
            
            // Use the filters passed directly (already includes status)
            const searchFilters = {
                ...filterParams,
                ...(searchTerm && { job_name: searchTerm })
            };
            
            const result = await fetchJobs(searchFilters, page, pagination.limit);
            if (result.success && result.data) {
                setJobs(result.data.jobs || result.data);
                
                // Update pagination if API returns pagination info
                if (result.data.pagination) {
                    setPagination({
                        currentPage: result.data.pagination.current_page || page,
                        totalPages: result.data.pagination.total_pages || 1,
                        totalItems: result.data.pagination.total || 0,
                        limit: pagination.limit
                    });
                }
            }
        } catch (error) {
            console.error('Failed to load jobs:', error);
        } finally {
            setJobsLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleSidebarNavigation = (tab) => {
        setActiveTab(tab);
        
        // Handle assignments navigation
        if (tab === 'assignments') {
            router.push('/assignments');
            return;
        }
        
        // Handle interviews navigation
        if (tab === 'interviews') {
            router.push('/interviews');
            return;
        }
        
        // Handle saved jobs navigation
        if (tab === 'saved-jobs') {
            router.push('/saved-jobs');
            return;
        }
        
        // Handle chat and companies-followed navigation
        if (tab === 'chat' || tab === 'companies-followed') {
            router.push(`/${tab}`);
            return;
        }
        
        // Map tab to status for API filtering
        let status = '';
        switch (tab) {
            case 'all-jobs':
                status = ''; // No status filter for all jobs
                break;
            case 'applied-jobs':
                status = 'applied';
                break;
            case 'shortlisted':
                status = 'shortlisted';
                break;
            case 'hired':
                status = 'hired';
                break;
            case 'rejected':
                status = 'rejected';
                break;
            default:
                status = '';
        }
        
        // Update status and immediately load jobs with new status
        setCurrentStatus(status);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        
        // Create filters with the new status
        const updatedFilters = {
            ...filters,
            ...(searchTerm && { job_name: searchTerm }),
            ...(status && { status: status })
        };
        
        loadJobs(1, updatedFilters);
    };

    const handleFilterChange = (filterParams) => {
        setFilters(filterParams);
        // Sync job_name filter with search term
        if (filterParams.job_name !== undefined) {
            setSearchTerm(filterParams.job_name);
        }
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        loadJobs(1, filterParams);
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
        loadJobs(newPage, filters);
    };

    const handleClearFilters = () => {
        setFilters({});
        setSearchTerm('');
        setCurrentStatus('');
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        loadJobs(1, {});
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        // Update filters with job_name
        const updatedFilters = { ...filters, job_name: value };
        setFilters(updatedFilters);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        loadJobs(1, updatedFilters);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    const handleExport = async () => {
        try {
            // Combine current filters with search term and status
            const exportFilters = {
                ...filters,
                ...(searchTerm && { job_name: searchTerm }),
                ...(currentStatus && { status: currentStatus })
            };
            
            const result = await exportJobs(exportFilters);
            
            if (result.success && result.data) {
                // Create blob URL and trigger download
                const blob = new Blob([result.data], { 
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                
                // Get filename from response headers or use default
                const contentDisposition = result.headers['content-disposition'];
                let filename = 'jobs_export.xlsx';
                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (filenameMatch) {
                        filename = filenameMatch[1];
                    }
                }
                
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Export failed:', result.message);
                alert('Export failed: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Export error:', error);
            alert('Export failed: ' + error.message);
        }
    };

    const getRelativeTime = (dateString) => {
        if (!dateString) return 'Posted recently';
        
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInSeconds = Math.floor((now - postDate) / 1000);
        
        if (diffInSeconds < 60) {
            return 'Posted just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds / 86400);
            return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 31536000) {
            const months = Math.floor(diffInSeconds / 2592000);
            return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
        } else {
            const years = Math.floor(diffInSeconds / 31536000);
            return `Posted ${years} year${years > 1 ? 's' : ''} ago`;
        }
    };

    const renderJobCard = (job, index) => {
        return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">
                            {job.company_name ? job.company_name.charAt(0).toUpperCase() : 'C'}
                        </span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{job.job_title || 'Job Title'}</h3>
                        <p className="text-sm text-gray-600">{job.company_name || 'Company Name'}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                    {job.job_type && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {job.job_type}
                        </span>
                    )}
                    {job.work_type && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {job.work_type}
                        </span>
                    )}
                    {job.salary_range && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            {job.salary_range}
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-600 mb-3">
                    {getRelativeTime(job.created_at)}
                </p>
                <div className="text-sm text-gray-700 mb-4">
                    {job.about_job ? (
                        <div 
                            dangerouslySetInnerHTML={{ 
                                __html: job.about_job.length > 150 
                                    ? job.about_job.substring(0, 150) + '...' 
                                    : job.about_job 
                            }}
                        />
                    ) : (
                        <p>Job description not available.</p>
                    )}
                </div>
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={() => router.push(`/job-detail/${job.id || index}`)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            View Details
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
            </div>
        );
    };

    const renderPagination = () => {
        if (pagination.totalPages <= 1) return null;

        const pages = [];
        const { currentPage, totalPages } = pagination;

        // Previous button
        pages.push(
            <button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 border border-gray-300 rounded-md text-sm ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
                Previous
            </button>
        );

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-2 border border-gray-300 rounded-md text-sm ${
                            i === currentPage
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {i}
                    </button>
                );
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pages.push(
                    <span key={i} className="px-3 py-2 text-gray-500">
                        ...
                    </span>
                );
            }
        }

        // Next button
        pages.push(
            <button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 border border-gray-300 rounded-md text-sm ${
                    currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
                Next
            </button>
        );

        return (
            <div className="flex items-center justify-center space-x-2 mt-6">
                {pages}
            </div>
        );
    };

    const renderContent = () => {
        // For status-based tabs (all-jobs, applied-jobs, shortlisted, hired, rejected), show the same job list
        const statusTabs = ['all-jobs', 'applied-jobs', 'shortlisted', 'hired', 'rejected'];
        
        if (statusTabs.includes(activeTab)) {
            return (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Applied Job List</h1>
                            <p className="text-gray-600">Manage your job applications</p>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        {jobsLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                                <span className="ml-2 text-gray-600">Loading jobs...</span>
                            </div>
                        ) : jobs.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {jobs.map((job, index) => renderJobCard(job, index))}
                                </div>
                                {renderPagination()}
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                                <p className="mt-1 text-sm text-gray-500">No job applications available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        
        // For other tabs, show their specific content
        switch (activeTab) {
            case 'saved-jobs':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
                            <p className="text-gray-600">Your bookmarked job opportunities</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <p className="text-gray-500 text-center py-8">No saved jobs yet</p>
                        </div>
                    </div>
                );
            case 'assignments':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
                            <p className="text-gray-600">Complete your assigned tasks</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <p className="text-gray-500 text-center py-8">No assignments available</p>
                        </div>
                    </div>
                );
            case 'interviews':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
                            <p className="text-gray-600">Upcoming and past interviews</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <p className="text-gray-500 text-center py-8">No interviews scheduled</p>
                        </div>
                    </div>
                );
            case 'chat':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Chat Messages</h1>
                            <p className="text-gray-600">Communicate with employers</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <p className="text-gray-500 text-center py-8">No messages yet</p>
                        </div>
                    </div>
                );
            case 'companies-followed':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Companies Followed</h1>
                            <p className="text-gray-600">Companies you're following</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <p className="text-gray-500 text-center py-8">No companies followed yet</p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600">Welcome to your job portal dashboard</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                                <span>Dashboard</span>
                                <span>/</span>
                                <span>Applications Received</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Application For Social Media Marketing</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Job"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                                />
                                <button type="submit" className="absolute left-3 top-2.5">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </form>
                            <button 
                                onClick={handleExport}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                title="Export to Excel"
                            >
                                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Left Sidebar */}
                <Sidebar activeTab={activeTab} onNavigate={handleSidebarNavigation} />
                
                {/* Main Content */}
                <main className="flex-1 p-6">
                    {renderContent()}
                </main>

                {/* Right Filters Sidebar */}
                <Filters 
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />
            </div>
        </div>
    );
}
