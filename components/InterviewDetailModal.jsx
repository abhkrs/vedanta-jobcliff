import React, { useState, useEffect } from "react";
import { fetchInterviewDetail, updateInterviewStatus } from "@/utils/apihelper";
import { toast } from "react-toastify";

export default function InterviewDetailModal({ open, onClose, interviewId, onStatusUpdate }) {
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    if (open && interviewId) {
      loadInterviewDetail();
    }
  }, [open, interviewId]);

  const loadInterviewDetail = async () => {
    try {
      setLoading(true);
      const result = await fetchInterviewDetail(interviewId);
      
      if (result.success && result.interview) {
        setInterview(result.interview);
      } else {
        toast.error(result.message || 'Failed to load interview details');
        onClose();
      }
    } catch (error) {
      console.error('Error loading interview detail:', error);
      toast.error('Failed to load interview details');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInterview = async () => {
    try {
      setAccepting(true);
      const result = await updateInterviewStatus(interviewId, 'accepted');
      
      if (result.success || result.status) {
        toast.success('Interview accepted successfully!');
        onStatusUpdate();
        onClose();
      } else {
        toast.error('Failed to accept interview: ' + (result.message || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Accept interview error:', error);
      toast.error('Failed to accept interview: ' + error.message);
    } finally {
      setAccepting(false);
    }
  };

  const handleRejectInterview = async () => {
    const reason = prompt('Please provide a reason for rejecting this interview (optional):');
    
    try {
      setRejecting(true);
      const result = await updateInterviewStatus(interviewId, 'rejected', reason || '');
      
      if (result.success || result.status) {
        toast.success('Interview rejected successfully!');
        onStatusUpdate();
        onClose();
      } else {
        toast.error('Failed to reject interview: ' + (result.message || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Reject interview error:', error);
      toast.error('Failed to reject interview: ' + error.message);
    } finally {
      setRejecting(false);
    }
  };

  const formatDate = (dateString) => {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 sticky top-0">
          <h2 className="text-xl font-bold text-gray-900">Schedule Interview</h2>
          <button
            onClick={onClose}
            className="text-blue-600 bg-blue-50 px-4 py-2 rounded hover:bg-blue-100 font-medium text-sm"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <span className="ml-3 text-gray-600">Loading interview details...</span>
            </div>
          ) : interview ? (
            <div className="space-y-6">
              {/* Interview Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview type*
                </label>
                <div className="flex items-center space-x-3">
                  <div className={`px-4 py-2 rounded-full border-2 flex items-center space-x-2 ${
                    interview.interview_type === 'online' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 bg-gray-50 text-gray-700'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">
                      {interview.interview_type === 'online' ? 'Video Call' : 'Office Interview'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interview Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Date*
                </label>
                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  {formatDate(interview.interview_date)}
                </div>
              </div>

              {/* Interview Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Time*
                </label>
                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  {formatTime(interview.interview_time)}
                </div>
              </div>

              {/* Meeting Link or Office Address */}
              {interview.interview_type === 'online' && interview.video_link && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Link*
                  </label>
                  <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    <a 
                      href={interview.video_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {interview.video_link}
                    </a>
                  </div>
                </div>
              )}

              {interview.interview_type === 'office' && interview.office_address && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Office Address*
                  </label>
                  <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    {interview.office_address}
                  </div>
                </div>
              )}

              {/* Job Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">Job Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-blue-700">Job Title:</span>
                    <p className="text-blue-800 font-medium">{interview.job?.job_title || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700">Job Type:</span>
                    <p className="text-blue-800">{interview.job?.job_type || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700">Salary Range:</span>
                    <p className="text-blue-800">{interview.job?.salary_range || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700">Duration:</span>
                    <p className="text-blue-800">{interview.job?.duration || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700">Company:</span>
                    <p className="text-blue-800">{interview.job?.employer?.organization_name || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700">Location:</span>
                    <p className="text-blue-800">{interview.job?.job_location || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message*
                </label>
                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 min-h-[100px]">
                  <div 
                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: interview.message || 'No message provided' }}
                  />
                </div>
              </div>

              {/* Job Skills, Perks, and Certificates */}
              {(interview.job?.jobSkills?.length > 0 || interview.job?.jobPerks?.length > 0 || interview.job?.jobCertificates?.length > 0) && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-3">Job Details</h4>
                  <div className="space-y-4">
                    {interview.job?.jobSkills?.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-purple-700">Required Skills:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {interview.job.jobSkills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              {skill.skill_name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {interview.job?.jobPerks?.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-purple-700">Job Perks:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {interview.job.jobPerks.map((perk, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              {perk.perk_name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {interview.job?.jobCertificates?.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-purple-700">Required Certificates:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {interview.job.jobCertificates.map((cert, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              {cert.certificate_name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Interview Status Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Interview Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Current Status:</span>
                    <p className="text-gray-800 capitalize">{interview.user_status || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Created:</span>
                    <p className="text-gray-800">{formatDate(interview.createdAt)}</p>
                  </div>
                  {interview.reschedule_at && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Rescheduled:</span>
                      <p className="text-gray-800">{formatDate(interview.reschedule_at)}</p>
                    </div>
                  )}
                  {interview.hire_at && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Hired:</span>
                      <p className="text-gray-800">{formatDate(interview.hire_at)}</p>
                    </div>
                  )}
                  {interview.cancel_at && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Cancelled:</span>
                      <p className="text-gray-800">{formatDate(interview.cancel_at)}</p>
                      {interview.cancel_reason && (
                        <p className="text-gray-600 text-sm mt-1">Reason: {interview.cancel_reason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {interview.cancel_at === null && interview.accepted_at === null && (
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleRejectInterview}
                    disabled={rejecting}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      rejecting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {rejecting ? 'Rejecting...' : 'Rejected'}
                  </button>
                  <button
                    onClick={handleAcceptInterview}
                    disabled={accepting}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      accepting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {accepting ? 'Accepting...' : 'Accept'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Failed to load interview details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
