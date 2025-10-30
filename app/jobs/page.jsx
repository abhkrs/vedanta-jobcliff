"use client";
import { P } from "@/components/typography";
import Heading from "@/components/typography/Heading";
import Section from "@/components/uielements/Section";
import {
  MapPin,
  Clock,
  DollarSign,
  Search,
  Heart,
  Bell,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PreloaderLink from "@/components/PreloaderLink";

export default function page() {
  const [selectedFilters, setSelectedFilters] = useState({
    remote: true,
    partTime: true,
    fullTime: true,
    freelance: true,
    onsite: true,
    contractBased: true,
    internship: true,
  });

  const [salaryRange, setSalaryRange] = useState({ min: 1, max: 50 });
  const [showMap, setShowMap] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const jobListings = [
    {
      id: 1,
      title: "Client Acquisition Executive",
      company: "WWF India",
      logo: "/Company Logo.png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
    {
      id: 2,
      title: "Business Analyst",
      company: "Lenskart",
      logo: "/Logo Image (2).png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
    {
      id: 3,
      title: "Backend Manager",
      company: "Uber",
      logo: "/Company Logo (2).png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
    {
      id: 4,
      title: "Software Developer",
      company: "Apple",
      logo: "/Company Logo (1).png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
    {
      id: 5,
      title: "Sales Executive",
      company: "Google",
      logo: "/Company Logo (3).png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
    {
      id: 6,
      title: "Delivery Agent",
      company: "Zomato",
      logo: "/Logo Image.png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
    {
      id: 7,
      title: "Backend Manager",
      company: "Uber",
      logo: "/Company Logo (2).png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
    {
      id: 8,
      title: "Software Developer",
      company: "Apple",
      logo: "/Company Logo (1).png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
    {
      id: 9,
      title: "Backend Manager",
      company: "Uber",
      logo: "/Company Logo (2).png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
    {
      id: 10,
      title: "Software Developer",
      company: "Apple",
      logo: "/Company Logo (1).png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
    },
  ];

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  return (
    <>
      <Section
        className="py-8 md:py-10 lg:py-12"
        sclass="bg-gradient-to-t from-white via-prime/05 to-prime/10"
      >
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-3">
            <Heading black="Job" blue="Listing" />
            <P className="text-gray-600 mb-6">Home / Jobs</P>
          </div>

          <div className="lg:col-span-9">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-2 bg-white rounded-full p-1">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search Job Title, Keyword or Company"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-prime"
                />
              </div>
              <div className="w-[1px] bg-gray-200 my-1"></div>
              <div className="flex-1 relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="City, State, Zip Code or Remote"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-prime"
                />
              </div>
              <button className="bg-prime text-white px-8 py-2 rounded-full hover:bg-prime/90 transition-colors">
                Find Jobs
              </button>
              <button
                onClick={() => setShowMap(!showMap)}
                className="border border-prime text-prime px-6 py-2 rounded-full hover:bg-prime/10 transition-colors"
              >
                {showMap ? "Show Filters" : "Search on Map"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-3">
            {!showMap ? (
              <>
                <div className="bg-white rounded-xl p-4 px-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Bell className="text-prime" size={24} />
                    <span className="font-medium">
                      Save this search as alert
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24 mt-4">
                  {/* Filters Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Settings2 className="text-prime" size={28} />
                      <span className="font-semibold text-lg">Filters</span>
                    </div>
                    <button className="text-prime text-sm underline">
                      Clear
                    </button>
                  </div>

                  {/* Profile Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Profile
                    </label>
                    <input
                      type="text"
                      placeholder="e.g Marketing"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prime text-sm"
                    />
                  </div>

                  {/* Job Type Filters */}
                  <div className="space-y-3 mb-6">
                    {[
                      { key: "remote", label: "Remote" },
                      { key: "partTime", label: "Part-Time" },
                      { key: "fullTime", label: "Full-Time" },
                      { key: "freelance", label: "Freelance" },
                      { key: "onsite", label: "Onsite" },
                      { key: "contractBased", label: "Contract Based" },
                      { key: "internship", label: "Internship" },
                    ].map((filter) => (
                      <label
                        key={filter.key}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters[filter.key]}
                          onChange={() => toggleFilter(filter.key)}
                          className="w-4 h-4 accent-prime text-prime text-prime border-gray-300 rounded focus:ring-prime"
                        />
                        <span className="text-sm">{filter.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Salary Range */}
                  <div className="mb-6">
                    <label className="block text-base font-medium mb-4 text-gray-800">
                      Annual Salary (In Lakhs)
                    </label>
                    <div className="relative px-2">
                      {/* Labels */}
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          {salaryRange.min}L
                        </span>
                        <span className="text-sm font-medium text-gray-400">
                          50L+
                        </span>
                      </div>

                      {/* Track */}
                      <div className="relative h-1 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-full bg-prime rounded-full"
                          style={{
                            left: `${((salaryRange.min - 1) / 49) * 100}%`,
                            right: `${
                              100 - ((salaryRange.max - 1) / 49) * 100
                            }%`,
                          }}
                        />
                      </div>

                      {/* Sliders */}
                      <div className="relative -mt-1">
                        <input
                          type="range"
                          min="1"
                          max="50"
                          value={salaryRange.min}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value < salaryRange.max) {
                              setSalaryRange((prev) => ({
                                ...prev,
                                min: value,
                              }));
                            }
                          }}
                          className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-prime [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-prime [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                        />
                        <input
                          type="range"
                          min="1"
                          max="50"
                          value={salaryRange.max}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value > salaryRange.min) {
                              setSalaryRange((prev) => ({
                                ...prev,
                                max: value,
                              }));
                            }
                          }}
                          className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-prime [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-prime [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Years of Experience
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prime text-sm">
                      <option>Select years of experience</option>
                      <option>0-1 years</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option>5+ years</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4 sticky top-24">
                {/* Map Container */}
                <div className=" ">
                  <div className="relative w-full h-[500px] bg-white rounded-xl shadow-sm overflow-hidden border-white border-4">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                        searchLocation || "India"
                      )}&zoom=12`}
                    />
                  </div>

                  {/* Search by Filters Button */}
                  <div className="mt-3">
                    <button
                      onClick={() => setShowMap(false)}
                      className="w-full py-2 border-2 border-prime text-prime rounded-full hover:bg-prime/5 transition-colors font-medium"
                    >
                      Search by Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-9">
            <div className="grid md:grid-cols-2 gap-4">
              {jobListings.slice(0, 6).map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Company Logo & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                      <Clock size={14} />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                      <DollarSign size={14} />
                      {job.salary}
                    </span>
                  </div>

                  {/* Posted Date */}
                  <p className="text-xs text-gray-400 mb-3">{job.postedDate}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <PreloaderLink
                      href="/jobs/job-details"
                      className="block w-full"
                    >
                      <div className="flex-1 text-center block bg-sec text-white py-2.5 rounded-full hover:bg-sec/90 transition-colors font-medium">
                        Apply Now
                      </div>
                    </PreloaderLink>
                    <button className="aspect-square h-12 border border-sec rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Heart size={20} className="text-sec" />
                    </button>
                  </div>
                </div>
              ))}

              <Link href="/register" className="col-span-2 max-w-full ">
                <Image
                  src="/register-now.jpg"
                  alt="Register"
                  width={1112}
                  height={260}
                  className="w-full rounded-2xl border-white border-4 shadow-md"
                />
              </Link>

              {/* Remaining Job Listings */}
              {jobListings.slice(6).map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Company Logo & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                      <Clock size={14} />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                      <DollarSign size={14} />
                      {job.salary}
                    </span>
                  </div>

                  {/* Posted Date */}
                  <p className="text-xs text-gray-400 mb-3">{job.postedDate}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-sec text-white py-2.5 rounded-full hover:bg-sec/90 transition-colors font-medium">
                      Apply Now
                    </button>
                    <button className="w-12 h-12 border border-sec rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Heart size={20} className="text-sec" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-2 mt-8">
              <button className="w-10 h-10 rounded-full bg-prime text-white flex items-center justify-center hover:bg-prime/90 transition-colors font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors">
                3
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors">
                4
              </button>
              <span className="text-gray-400">...</span>
              <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors">
                7
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors">
                8
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors">
                9
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
