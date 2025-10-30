'use client'
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { fetchJobDetail, applyJob, saveJob, unsaveJob } from '@/utils/apihelper';

export default function JobDetail() {
    const router = useRouter();
    const params = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applied, setApplied] = useState(false);
    const [saved, setSaved] = useState(false);
    const [applying, setApplying] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Check if user is authenticated
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (!token) {
                router.replace('/join');
                return;
            }
        }

        const loadJobDetail = async () => {
            try {
                setLoading(true);
                const jobId = params.id;
                
                if (!jobId) {
                    setJob(null);
                    return;
                }

                const result = await fetchJobDetail(jobId);
                
                if (result.success && result.job) {
                    // Map API response to our job object structure
                    const jobData = {
                        id: result.job.id || jobId,
                        title: result.job.job_title || 'Job Title',
                        company: result.job.employer?.organization_name || 'Company Name',
                        location: result.job.job_location || 'Location not specified',
                        startDate: result.job.job_date || 'Immediately',
                        ctc: result.job.salary_range || 'Salary not specified',
                        experience: result.job.min_experience ? `${result.job.min_experience} year(s)` : 'Experience not specified',
                        applyBy: result.job.apply_by ? new Date(result.job.apply_by).toLocaleDateString() : 'Apply by not specified',
                        tags: [
                            result.job.job_type || 'Job Type',
                            result.job.duration || 'Duration',
                            `Posted ${new Date(result.job.created_at).toLocaleDateString()}`
                        ],
                        isEarlyApplicant: result.job.openings > 0,
                        responsibilities: result.job.who_can_apply ? [result.job.who_can_apply] : [],
                        requirements: result.job.who_can_apply || 'Requirements not specified',
                        additionalInfo: [
                            `Openings: ${result.job.openings || 'Not specified'}`,
                            `Job Type: ${result.job.job_type || 'Not specified'}`,
                            `Duration: ${result.job.duration || 'Not specified'}`
                        ],
                        aboutJob: result.job.about_job || 'Job description not available',
                        skills: result.job.jobSkills?.map(skill => skill.skill_name) || [],
                        salary: {
                            annualCTC: result.job.salary_range || 'Salary not specified',
                            breakdown: {
                                fixedPay: result.job.salary_range || 'Fixed pay not specified',
                                variablePay: 'Variable pay not specified'
                            }
                        },
                        perks: result.job.jobPerks?.map(perk => perk.perk_name) || [],
                        aboutCompany: result.job.employer?.organization_dscrition || result.job.employer?.organization_description || 'Company information not available',
                        // Additional fields from API
                        jobType: result.job.job_type,
                        duration: result.job.duration,
                        openings: result.job.openings,
                        employer: result.job.employer,
                        jobApplications: result.job.jobApplications,
                        jobCertificates: result.job.jobCertificates?.map(cert => cert.certificate_name) || [],
                        // Metadata
                        hasApplied: result.metadata?.hasApplied || false,
                        applicationStatus: result.metadata?.applicationStatus || null,
                        canApply: result.metadata?.canApply || true
                    };
                    
                    setJob(jobData);
                } else {
                    console.error('Failed to load job detail:', result.message);
                    setJob(null);
                }
            } catch (error) {
                console.error('Error loading job detail:', error);
                setJob(null);
            } finally {
                setLoading(false);
            }
        };

        loadJobDetail();
    }, [params.id, router]);

    const handleApply = async () => {
        if (job?.hasApplied) {
            // User has already applied, show current status
            return;
        }

        try {
            setApplying(true);
            const result = await applyJob(job.id);
            
            if (result.success) {
                setApplied(true);
                // Update job data to reflect application status
                setJob(prev => ({
                    ...prev,
                    hasApplied: true,
                    applicationStatus: 'applied',
                    canApply: false
                }));
                
                // Show success message
                toast.success('Successfully applied for the job!');
            } else {
                // Show error message
                toast.error('Failed to apply: ' + (result.message || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Apply job error:', error);
            toast.error('Failed to apply: ' + error.message);
        } finally {
            setApplying(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            
            if (saved) {
                // Unsave the job
                const result = await unsaveJob(job.id);
                
                if (result.success) {
                    setSaved(false);
                    toast.success('Job removed from saved jobs!');
                } else {
                    toast.error('Failed to unsave job: ' + (result.message || 'Something went wrong'));
                }
            } else {
                // Save the job
                const result = await saveJob(job.id);
                
                if (result.success) {
                    setSaved(true);
                    toast.success('Job saved successfully!');
                } else {
                    toast.error('Failed to save job: ' + (result.message || 'Something went wrong'));
                }
            }
        } catch (error) {
            console.error('Save job error:', error);
            toast.error('Failed to save job: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleShare = () => {
        // Here you would implement share functionality
        console.log('Share job:', job.id);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
                    <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
                    <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Job Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <p className="text-xl text-gray-700 mb-4">{job.company}</p>
                            <div className="flex items-center text-gray-600 mb-4">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {/* Company Logo Placeholder */}
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-600 font-bold text-sm">{job.company.charAt(0)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mb-8">
                    <button
                        onClick={handleShare}
                        className="p-3 border border-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                        title="Share"
                    >
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-6 py-3 rounded-full border transition-colors ${
                            saved 
                                ? 'bg-blue-500 text-white border-blue-500' 
                                : saving
                                ? 'bg-gray-400 text-white border-gray-400 cursor-not-allowed'
                                : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                        }`}
                        disabled={saving}
                    >
                        {saving 
                            ? 'Saving...'
                            : saved 
                            ? 'Saved' 
                            : 'Save Job'
                        }
                    </button>
                    <button
                        onClick={handleApply}
                        className={`px-6 py-3 rounded-full transition-colors ${
                            job.hasApplied 
                                ? job.applicationStatus === 'interview' 
                                    ? 'bg-blue-500 text-white' 
                                    : job.applicationStatus === 'shortlisted'
                                    ? 'bg-yellow-500 text-white'
                                    : job.applicationStatus === 'hired'
                                    ? 'bg-green-500 text-white'
                                    : job.applicationStatus === 'rejected'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-500 text-white'
                                : applied 
                                ? 'bg-green-500 text-white' 
                                : applying
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                        disabled={job.hasApplied && !job.canApply || applying}
                    >
                        {applying 
                            ? 'Applying...'
                            : job.hasApplied 
                            ? job.applicationStatus === 'interview' 
                                ? 'Interview Scheduled'
                                : job.applicationStatus === 'shortlisted'
                                ? 'Shortlisted'
                                : job.applicationStatus === 'hired'
                                ? 'Hired'
                                : job.applicationStatus === 'rejected'
                                ? 'Rejected'
                                : 'Applied'
                            : applied 
                            ? 'Applied' 
                            : 'Apply Now'
                        }
                    </button>
                </div>

                {/* Key Job Details */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-500">Start Date</p>
                                <p className="font-semibold">{job.startDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-500">CTC (Annual)</p>
                                <p className="font-semibold">{job.ctc}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-500">Experience</p>
                                <p className="font-semibold">{job.experience}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-500">Apply By</p>
                                <p className="font-semibold">{job.applyBy}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags and Early Applicant */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    {job.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                            {tag}
                        </span>
                    ))}
                    {job.isEarlyApplicant && (
                        <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Be An Early Applicant
                        </div>
                    )}
                </div>

                {/* About The Job */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">About The Job</h2>
                    
                   

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements:</h3>
                        <div 
                            className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: job.requirements }}
                        />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Additional Information:</h3>
                        <ol className="list-decimal list-inside space-y-1 text-gray-700">
                            {job.additionalInfo.map((info, index) => (
                                <li key={index}>{info}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description:</h3>
                        <div 
                            className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: job.aboutJob }}
                        />
                    </div>
                </div>

                {/* Skills Required */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill(S) Required</h2>
                    <div className="flex flex-wrap gap-3">
                        {job.skills.map((skill, index) => (
                            <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Salary */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Salary</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Annual CTC:</h3>
                            <p className="text-xl font-bold text-green-600">{job.salary.annualCTC}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Annual CTC Breakup:</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Fixed Pay:</span>
                                    <span className="font-semibold text-gray-900">{job.salary.breakdown.fixedPay}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Variable Pay:</span>
                                    <span className="font-semibold text-gray-900">{job.salary.breakdown.variablePay}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Perks */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Perks</h2>
                    <div className="flex flex-wrap gap-3">
                        {job.perks.map((perk, index) => (
                            <span key={index} className="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">
                                {perk}
                            </span>
                        ))}
                    </div>
                </div>

                {/* About Company */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">About {job.company}</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div 
                            className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: job.aboutCompany }}
                        />
                    </div>
                </div>

                {/* Certificates Required */}
                {job.jobCertificates && job.jobCertificates.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Certificates Required</h2>
                        <div className="flex flex-wrap gap-3">
                            {job.jobCertificates.map((certificate, index) => (
                                <span key={index} className="px-4 py-2 bg-purple-100 text-purple-800 text-sm rounded-full border border-purple-200">
                                    {certificate}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Action Buttons */}
                <div className="flex justify-center space-x-4 pb-8">
                    <button
                        onClick={handleApply}
                        className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                            job.hasApplied 
                                ? job.applicationStatus === 'interview' 
                                    ? 'bg-blue-500 text-white' 
                                    : job.applicationStatus === 'shortlisted'
                                    ? 'bg-yellow-500 text-white'
                                    : job.applicationStatus === 'hired'
                                    ? 'bg-green-500 text-white'
                                    : job.applicationStatus === 'rejected'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-500 text-white'
                                : applied 
                                ? 'bg-green-500 text-white' 
                                : applying
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                        disabled={job.hasApplied && !job.canApply || applying}
                    >
                        {applying 
                            ? 'Applying...'
                            : job.hasApplied 
                            ? job.applicationStatus === 'interview' 
                                ? '✓ Interview Scheduled'
                                : job.applicationStatus === 'shortlisted'
                                ? '✓ Shortlisted'
                                : job.applicationStatus === 'hired'
                                ? '✓ Hired'
                                : job.applicationStatus === 'rejected'
                                ? '✗ Rejected'
                                : '✓ Applied'
                            : applied 
                            ? '✓ Applied Successfully' 
                            : 'Apply Now'
                        }
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-8 py-3 rounded-lg font-semibold border transition-colors ${
                            saved 
                                ? 'bg-blue-500 text-white border-blue-500' 
                                : saving
                                ? 'bg-gray-400 text-white border-gray-400 cursor-not-allowed'
                                : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                        }`}
                        disabled={saving}
                    >
                        {saving 
                            ? 'Saving...'
                            : saved 
                            ? '✓ Saved' 
                            : 'Save Job'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
