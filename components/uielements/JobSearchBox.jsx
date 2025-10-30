"use client";
import { useState } from "react";

export default function JobSearchBox() {
  const [isAISearch, setIsAISearch] = useState(false);

  const toggleSearchMode = () => {
    setIsAISearch(!isAISearch);
  };

  return (
    <div className="!bg-white rounded-2xl shadow-xl p-6 md:p-8 -mt-32 relative z-50">
      {isAISearch ? (
        /* AI Search Mode */
        <div className="space-y-4">
          <div className="relative">
            <textarea
              placeholder="Describe the job you are looking for with a clear focus on your skills, interests, and career goals."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prime resize-none h-32"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={toggleSearchMode}
              className="px-6 py-3 border-2 border-prime text-prime hover:bg-gray-50 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Basic Search
            </button>
            <button className="bg-prime hover:bg-sec text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              AI Search
            </button>
          </div>
        </div>
      ) : (
        /* Basic Search Mode */
        <>
          <div className="border border-gray-300 rounded-lg p-1 flex gap-3 mb-6 bg-white">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search Job Title, Keyword or Company"
                className="w-full px-4 py-2.5 pl-10 border-0 focus:outline-none focus:ring-0"
              />
              <svg
                className="w-5 h-5 text-gray-700 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="w-px bg-gray-300 my-1"></div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="City, State, Zip Code or Remote"
                className="w-full px-4 py-2.5 pl-10 border-0 focus:outline-none focus:ring-0"
              />
              <svg
                className="w-5 h-5 text-gray-700 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <button className="bg-prime hover:bg-sec text-white px-12 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap">
              Find Jobs
            </button>
            <button
              onClick={toggleSearchMode}
              className="px-6 py-2 border-2 border-prime text-prime hover:bg-sec hover:border-sec hover:text-white rounded-lg font-semibold transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              AI Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prime text-gray-500 bg-white">
                <option>Internship</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Salary (In Lakhs)
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prime text-gray-500 bg-white">
                <option>e.g 10 Lakhs</option>
                <option>0-3 Lakhs</option>
                <option>3-6 Lakhs</option>
                <option>6-10 Lakhs</option>
                <option>10+ Lakhs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prime text-gray-500 bg-white">
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prime text-gray-500 bg-white">
                <option>Select years of experience</option>
                <option>0-2 Years</option>
                <option>2-5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
