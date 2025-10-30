'use client'
import Section from "@/components/uielements/Section";
import { Share2, Heart, FileText, MapPin, Clock, IndianRupee, Bookmark, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Heading from "@/components/typography/Heading";
import { AnimatedText, H2, H3, H5, P } from "@/components/typography";
import Link from "next/link";
import StyleButton from "@/components/StyleButton";
import JobCarousel from "@/components/JobCarousel";

export default function page() {
    const [activeTab, setActiveTab] = useState('overview');

    const companyData = {
        name: "Sound Society India",
        logo: "/Logo Image (1).png",
        location: "Mumbai, India",
        rating: 4.5,
        reviews: 145,
        hiringSince: "2020",
        employeeCount: "2-10",
        opportunitiesPosted: 5,
        candidatesHired: 3,
        industry: "Media/ Entertainment",
        about: "Sound Society is a boutique music curation company based in the heart of South Mumbai, dedicated to crafting soulful, one-of-a-kind musical journeys. Rooted in the city's rich cultural heritage yet attuned to contemporary tastes, we specialize in bringing people together through the universal language of music.\n\nFrom intimate mehfils that celebrate classical, ghazal, and folk traditions, to lively karaoke nights where voices and spirits rise in unison, we design experiences that resonate beyond the front note. Each gathering is thoughtfully curated—whether it's a community evening, or a bespoke celebration—ensuring that music doesn't just play in the background, but becomes the heart of the experience.\n\nAt Sound Society, we believe music is best enjoyed in meaningful settings. Our collaborations with artists, hosts, and venues are carefully chosen to create immersive atmospheres—whether it's under the warm glow of candlelight, the intimacy of a living room, or the elegance of South Mumbai's heritage spaces. More than events, we create musical memories: conversations sparked, nostalgia awakened, and bonds strengthened through the shared joy of melody."
    };

    const jobOpenings = [
        {
            id: 1,
            title: "Sales Executive",
            company: "Sound Society",
            logo: "/Logo Image (1).png",
            location: "Remote",
            type: "Part-Time",
            salary: "20k - 30k",
            postedDate: "Posted 3 days ago",
            description: "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills."
        },
        {
            id: 2,
            title: "Client Acquisition Executive",
            company: "Sound Society",
            logo: "/Logo Image (1).png",
            location: "Remote",
            type: "Part-Time",
            salary: "20k - 30k",
            postedDate: "Posted 3 days ago",
            description: "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills."
        },
        {
            id: 3,
            title: "Business Analyst",
            company: "Sound Society",
            logo: "/Logo Image (1).png",
            location: "Remote",
            type: "Part-Time",
            salary: "20k - 30k",
            postedDate: "Posted 3 days ago",
            description: "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills."
        }
    ];

    return (
        <>
            <Section className="py-12" sclass="bg-gray-50">

                {/* Company Header - Simple Layout */}
                <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 bg-orange-500 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                            src={companyData.logo}
                            alt={companyData.name}
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start gap-3">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 mb-1">{companyData.name}</h1>
                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <MapPin size={16} className="text-gray-900" />
                                    <span className="text-sm">{companyData.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                   <Star size={16} className="text-gray-900" />
                                    <span className="text-sm text-gray-500">{companyData.rating}({companyData.reviews} Reviews)</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-1 px-3 py-1.5 text-gray-900 hover:bg-gray-100 transition-colors text-sm">
                                    <Share2 size={16} />
                                    <span className="underline">Share</span>
                                </button>
                                <button className="flex items-center gap-1 px-3 py-1.5 text-gray-900 hover:bg-gray-100 transition-colors text-sm">
                                    <Heart size={16} />
                                    <span className="underline">Follow</span>
                                </button>
                                <button className="flex items-center gap-1 px-3 py-1.5 text-gray-900 hover:bg-gray-100 transition-colors text-sm">
                                    <FileText size={16} />
                                    <span className="underline">Submit Review</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs - Sticky */}
                <div className="sticky top-0 z-10 bg-gray-50 border-b-2 border-gray-200 mb-6 -mx-4 px-4">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`pb-3 font-medium transition-colors relative text-sm ${activeTab === 'overview'
                                ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-prime'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Company Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`pb-3 font-medium transition-colors relative text-sm ${activeTab === 'jobs'
                                ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-prime'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Job Openings
                        </button>
                        <button
                            onClick={() => setActiveTab('salary')}
                            className={`pb-3 font-medium transition-colors relative text-sm ${activeTab === 'salary'
                                ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-prime'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Salary & Perks
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <>
                        <div className="bg-white rounded-xl p-8 shadow mb-8">
                            {/* Company Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-300">
                                <div className="bg-prime/5 p-3 rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">Hiring Since</p>
                                    <p className="text-base font-medium text-gray-900">{companyData.hiringSince}</p>
                                </div>
                                <div className="bg-prime/5 p-3 rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">Employee Count</p>
                                    <p className="text-base font-medium text-gray-900">{companyData.employeeCount}</p>
                                </div>
                                <div className="bg-prime/5 p-3 rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">Opportunities Posted</p>
                                    <p className="text-base font-medium text-gray-900">{companyData.opportunitiesPosted}</p>
                                </div>
                                <div className="bg-prime/5 p-3 rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">Candidates Hired</p>
                                    <p className="text-base font-medium text-gray-900">{companyData.candidatesHired}</p>
                                </div>
                                <div className="bg-prime/5 p-3 rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">Location</p>
                                    <p className="text-base font-medium text-gray-900">{companyData.location}</p>
                                </div>
                                <div className="bg-prime/5 p-3 rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">Industry</p>
                                    <p className="text-base font-medium text-gray-900">{companyData.industry}</p>
                                </div>
                            </div>

                            {/* About Section */}
                            <div>
                                <H5 className="font-bold text-gray-900 mb-3">About {companyData.name}</H5>
                                <AnimatedText className="whitespace-pre-line text-md">
                                    {companyData.about}
                                </AnimatedText>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'jobs' && (
                    <div>
                        {/* Job Cards Grid - Full List */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Repeat jobs to show full grid */}
                            {[...jobOpenings, ...jobOpenings, ...jobOpenings].map((job, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={job.logo}
                                                alt={job.company}
                                                width={48}
                                                height={48}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-gray-900 mb-1">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.company}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                                            <MapPin size={14} />
                                            {job.location}
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                                            <Clock size={14} />
                                            {job.type}
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                                            <IndianRupee size={14} />
                                            {job.salary}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-400 mb-3">{job.postedDate}</p>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{job.description}</p>

                                    <div className="flex gap-3">
                                        <button className="flex-1 bg-sec text-white py-2.5 rounded-full hover:bg-sec/90 transition-colors font-medium">
                                            Apply Now
                                        </button>
                                        <button className="w-12 h-12 border border-sec rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                             <Heart  size={20} className="text-sec" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'salary' && (
                    <>
                        {/* Average Salary Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Average Salary in {companyData.name}</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div key={item} className="bg-white rounded-xl p-6 shadow-sm">
                                        <h3 className="font-semibold text-gray-900 mb-2">Software Engineer</h3>
                                        <p className="text-lg font-bold text-gray-900">₹8,00,000 - ₹12,00,000/Yr</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Perks Section */}
                        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Perks</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Flexible Working Hours</h3>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Remote or Hybrid Work Options</h3>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Heart size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Health Insurance</h3>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <IndianRupee size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Performance Bonuses</h3>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Free Meals or Snacks</h3>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Heart size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Wellness Programs</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </Section>

            {activeTab !== "jobs" && (
                <Section sclass="bg-gradient-to-b from-prime/5 to-white" className="py-8 lg:py-12">
                    <div>
                        <div className="flex items-end justify-between mb-6 gap-4 lg:gap-20">
                            <div className="max-w-3xl">
                                <Heading black="Job " blue="Openings" className="mb-2" />
                                <P>Gain the skills, support, and opportunities you need to build a stable, dignified career — all through Vedanta's employment and training initiatives.</P>
                            </div>
                            <StyleButton href="/jobs" text="View All" />
                        </div>
                        <JobCarousel jobs={jobOpenings} />
                    </div>
                </Section>
            )}
        </>
    );
}
