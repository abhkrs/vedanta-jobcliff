import React, { useState } from "react";
import { submitInterview } from "@/utils/apihelper";
import { toast } from "react-toastify";
import dynamic from 'next/dynamic';

import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function InterviewModal({ open, onClose, onSend, interviewId }) {
  const [message, setMessage] = useState("sw interview message");
  const [attachmentName, setAttachmentName] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
      setAttachmentName(e.target.files[0].name);
    }
  };

  const handleSendInterview = async () => {
    // Validate form
    if (!message.trim()) {
      toast.warn('Please enter a message');
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare submission data
      const submissionData = {
        message: message,
        attachment: attachment
      };
      
      // Use the interviewId passed as prop
      if (!interviewId) {
        toast.error('Interview ID is required');
        return;
      }
      
      // Call submit interview API
      const result = await submitInterview(interviewId, submissionData);
      
      if (result.success || result.status) {
        toast.success('Interview submitted successfully');
        // Reset form
        setAttachment(null);
        setAttachmentName(null);
        setMessage("sw interview message");
        onSend();
      } else {
        toast.error(result.message || 'Failed to submit interview');
      }
    } catch (error) {
      console.error('Error submitting interview:', error);
      toast.error('An error occurred while submitting interview');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.7)' }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 sticky top-0">
          <h2 className="text-lg font-semibold text-gray-800">Submit Interview</h2>
          <button
            className="text-green-600 bg-green-50 px-4 py-2 rounded hover:bg-green-100 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendInterview}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Send Interview'}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Message */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Message*</label>
            <div className="border border-gray-300 rounded bg-white overflow-hidden">
              <ReactQuill
                value={message}
                onChange={setMessage}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'header': [1, 2, 3, false] }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
                formats={['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'list', 'script', 'header', 'link', 'image']}
                theme="snow"
                placeholder="Enter your message here..."
                className="min-h-[150px]"
              />
            </div>
          </div>

          {/* Attachment */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Attachment</label>
            <div className="border-2 border-dashed border-green-300 rounded px-4 py-6 bg-green-50 text-center">
              <svg className="w-8 h-8 mx-auto text-green-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <input
                type="file"
                accept=".jpg,.png,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="attachment"
              />
              <label htmlFor="attachment" className="text-green-600 cursor-pointer font-medium">
                Attachment
              </label>
              {attachmentName && <div className="text-sm text-gray-600 mt-2">✓ {attachmentName}</div>}
              <div className="text-xs text-gray-500 mt-2">Minimum file size 5Mb. Supported files jpg, png, pdf</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
