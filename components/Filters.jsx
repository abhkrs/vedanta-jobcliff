'use client'
import { useState, useEffect, useCallback } from 'react';

export default function Filters({ onFilterChange, onClearFilters, currentSearchTerm = '' }) {
    const [filters, setFilters] = useState({
        job_name: currentSearchTerm,
        location: '',
        skills: '',
        education: '',
        applicationProgress: '',
        salary: ''
    });

    // Sync filters with currentSearchTerm prop
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            job_name: currentSearchTerm
        }));
    }, [currentSearchTerm]);

    // Debounced filter change function
    const debouncedFilterChange = useCallback(
        (() => {
            let timeoutId;
            return (newFilters) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    if (onFilterChange) {
                        onFilterChange(newFilters);
                    }
                }, 500); // 500ms delay
            };
        })(),
        [onFilterChange]
    );

    const handleFilterChange = (field, value) => {
        const newFilters = {
            ...filters,
            [field]: value
        };
        setFilters(newFilters);
        
        // For text inputs (job_name, location, skills), use debounced filtering
        if (field === 'job_name' || field === 'location' || field === 'skills') {
            debouncedFilterChange(newFilters);
        } else {
            // For select inputs, apply immediately
            if (onFilterChange) {
                onFilterChange(newFilters);
            }
        }
    };

    const clearAllFilters = () => {
        const emptyFilters = {
            job_name: '',
            location: '',
            skills: '',
            education: '',
            applicationProgress: '',
            salary: ''
        };
        setFilters(emptyFilters);
        
        // Call parent clear filters handler
        if (onClearFilters) {
            onClearFilters();
        }
    };

    const showResults = () => {
        // Call parent filter change handler with current filters
        if (onFilterChange) {
            onFilterChange(filters);
        }
    };

    return (
        <aside className="w-80 bg-white shadow-sm border-l border-gray-200 min-h-screen">
            <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">20</span>
                </div>

                <div className="space-y-6">
                    {/* Job Name Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Name</label>
                        <input
                            type="text"
                            placeholder="Eg. Software Developer"
                            value={filters.job_name}
                            onChange={(e) => handleFilterChange('job_name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                    </div>

                    {/* Location Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            placeholder="Eg. Mumbai"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                    </div>

                    {/* Skills Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                        <input
                            type="text"
                            placeholder="Eg. Java"
                            value={filters.skills}
                            onChange={(e) => handleFilterChange('skills', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                    </div>

                    {/* Education Filter - Commented Out */}
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                        <select
                            value={filters.education}
                            onChange={(e) => handleFilterChange('education', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        >
                            <option value="">Select Education</option>
                            <option value="high-school">High School</option>
                            <option value="diploma">Diploma</option>
                            <option value="bachelor">Bachelor's Degree</option>
                            <option value="master">Master's Degree</option>
                            <option value="phd">PhD</option>
                            <option value="other">Other</option>
                        </select>
                    </div> */}

                    {/* Application Progress Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Application Progress</label>
                        <select
                            value={filters.applicationProgress}
                            onChange={(e) => handleFilterChange('applicationProgress', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        >
                            <option value="">Select Progress</option>
                            <option value="applied">Applied</option>
                            <option value="under-review">Under Review</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interview-scheduled">Interview Scheduled</option>
                            <option value="interviewed">Interviewed</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Salary Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                        <select
                            value={filters.salary}
                            onChange={(e) => handleFilterChange('salary', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        >
                            <option value="">Select Salary Range</option>
                            <option value="0-20k">₹0 - ₹20,000</option>
                            <option value="20k-30k">₹20,000 - ₹30,000</option>
                            <option value="30k-50k">₹30,000 - ₹50,000</option>
                            <option value="50k-75k">₹50,000 - ₹75,000</option>
                            <option value="75k-100k">₹75,000 - ₹1,00,000</option>
                            <option value="100k+">₹1,00,000+</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                    <button
                        type="button"
                        onClick={clearAllFilters}
                        className="w-full px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        type="button"
                        onClick={showResults}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Show Results
                    </button>
                </div>
            </div>
        </aside>
    );
}
