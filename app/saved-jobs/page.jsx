'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { fetchSavedJobs, unsaveJob } from '@/utils/apihelper';
import { toast } from 'react-toastify';

export default function SavedJobs() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('saved-jobs');
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [unsaving, setUnsaving] = useState({});
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

    const loadSavedJobs = async (page = 1) => {
        try {
            setJobsLoading(true);
            
            // Prepare filters for saved jobs API
            const filters = {};
            if (searchTerm) {
                filters.job_name = searchTerm;
            }
            
            const result = await fetchSavedJobs(page, pagination.limit, filters);
            if (result.success && result.data) {
                // Extract jobs from the nested structure
                const savedJobs = result.data.map(item => item.job);
                setJobs(savedJobs);
                
                // Update pagination if API returns pagination info
                if (result.pagination) {
                    setPagination({
                        currentPage: result.pagination.page || page,
                        totalPages: result.pagination.totalPages || 1,
                        totalItems: result.pagination.total || 0,
                        limit: pagination.limit
                    });
                }
            }
        } catch (error) {
            console.error('Failed to load saved jobs:', error);
        } finally {
            setJobsLoading(false);
        }
    };

    useEffect(() => {
        loadSavedJobs();
    }, []);

    const handleSidebarNavigation = (tab) => {
        setActiveTab(tab);
        
        // Handle navigation to other pages
        if (tab === 'assignments') {
            router.push('/assignments');
            return;
        }
        
        if (tab === 'interviews') {
            router.push('/interviews');
            return;
        }
        
        if (tab === 'chat' || tab === 'companies-followed') {
            router.push(`/${tab}`);
            return;
        }
        
        // Handle job-related navigation (redirect to dashboard)
        if (tab === 'all-jobs' || tab === 'applied-jobs' || tab === 'shortlisted' || 
            tab === 'hired' || tab === 'rejected') {
            router.push('/dashboard');
            return;
        }
        
        // For saved jobs tab, reload saved jobs
        if (tab === 'saved-jobs') {
            loadSavedJobs();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        loadSavedJobs(1);
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
        loadSavedJobs(newPage);
    };

    const handleUnsaveJob = async (jobId) => {
        try {
            setUnsaving(prev => ({ ...prev, [jobId]: true }));
            
            const result = await unsaveJob(jobId);
            
            if (result.success || result.status) {
                toast.success('Job removed from saved jobs!');
                // Reload saved jobs to update the list
                loadSavedJobs(pagination.currentPage);
            } else {
                toast.error('Failed to remove job from saved jobs: ' + (result.message || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Unsave job error:', error);
            toast.error('Failed to remove job from saved jobs: ' + error.message);
        } finally {
            setUnsaving(prev => ({ ...prev, [jobId]: false }));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'applied':
                return 'bg-blue-100 text-blue-700';
            case 'shortlisted':
                return 'bg-yellow-100 text-yellow-700';
            case 'hired':
                return 'bg-green-100 text-green-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            case 'saved':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    if (jobsLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading saved jobs...</p>
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
                    <div className="max-w-7xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="mb-4">
                            <nav className="text-sm">
                                <span className="text-gray-500">Dashboard</span>
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="font-semibold text-gray-900">Saved Jobs</span>
                            </nav>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
                                    <p className="text-gray-600 mt-1">Jobs you've saved for later</p>
                                </div>
                                
                                {/* Search Bar */}
                                <form onSubmit={handleSearch} className="flex items-center">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search saved jobs..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
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
                            </div>
                        </div>

                        {/* Jobs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                        {/* Job Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                {/* Company Logo */}
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                    {job.employer?.logo_url ? (
                                                        <img 
                                                            src={job.employer.logo_url} 
                                                            alt={job.employer.organization_name}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                                            <span className="text-gray-600 font-semibold text-sm">
                                                                {job.employer?.organization_name?.charAt(0) || 'C'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Job Info */}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                                        {job.job_title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        {job.employer?.organization_name}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Status Badge */}
                                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('saved')}`}>
                                                Saved
                                            </div>
                                        </div>

                                        {/* Job Details */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {job.job_location}
                                            </div>
                                            
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                </svg>
                                                {job.salary_range}
                                            </div>
                                            
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Apply by {formatDate(job.apply_by)}
                                            </div>
                                        </div>

                                        {/* Job Description */}
                                        <div className="mb-4">
                                            <div 
                                                className="text-gray-700 text-sm line-clamp-3 prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ 
                                                    __html: job.about_job ? job.about_job.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No description available' 
                                                }}
                                            />
                                        </div>

                                        {/* Skills */}
                                        {job.jobSkills && job.jobSkills.length > 0 && (
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {job.jobSkills.slice(0, 3).map((skill, index) => (
                                                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                            {skill.skill_name}
                                                        </span>
                                                    ))}
                                                    {job.jobSkills.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                            +{job.jobSkills.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <button
                                                onClick={() => router.push(`/job-detail/${job.id}`)}
                                                className="text-green-600 hover:text-green-700 font-medium text-sm"
                                            >
                                                View Details
                                            </button>
                                            
                                            <button
                                                onClick={() => handleUnsaveJob(job.id)}
                                                disabled={unsaving[job.id]}
                                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                                    unsaving[job.id]
                                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}
                                            >
                                                {unsaving[job.id] ? 'Removing...' : 'Remove'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h3>
                                    <p className="text-gray-600 mb-4">Start saving jobs you're interested in for easy access later.</p>
                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                                    >
                                        Browse Jobs
                                    </button>
                                </div>
                            )}
                        </div>

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
                </main>
            </div>
        </div>
    );
}
