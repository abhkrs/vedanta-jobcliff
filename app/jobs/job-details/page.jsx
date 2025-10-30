'use client'
import { P } from "@/components/typography";
import Heading from "@/components/typography/Heading";
import Section from "@/components/uielements/Section";
import { MapPin, Calendar, IndianRupee, Briefcase, Clock, Share2, Bookmark, CheckCircle2, Info } from "lucide-react";
import Image from "next/image";
import StyleButton from "@/components/StyleButton";
import JobCarousel from "@/components/JobCarousel";
import PreloaderLink from "@/components/PreloaderLink";

export default function page() {
    const jobData = {
        title: "Relationship Manager - Affordable Housing Fresher Job",
        company: "Godrej Capital",
        locations: ["Ahmedabad", "Aurangabad", "Jalgaon", "Mehsana", "Pune"],
        startDate: "Immediately",
        ctc: "₹ 4,00,000",
        experience: "1 year(s)",
        applyBy: "10 Aug' 25",
        postedTime: "Posted just now",
        jobType: "Fresher Job",
        activelyHiring: true,
        logo: "/Company Logo (3).png"
    };

    const keyResponsibilities = [
        "Assist customers in sale of a range of financial products on phone",
        "Work only in the day shift",
        "Meet and exceed targets as assigned periodically",
        "Achieve productivity that meets job standards with speed and accuracy",
        "Adapt to changing demands and shift priorities as needed",
        "Ensure no losses or errors occur while assisting customers",
        "Prevent mis-selling and fraud in all processes",
        "Respond to all internal communication in a timely and effective manner",
        "Adhere to and support company policies and practices"
    ];

    const additionalInfo = [
        "11th July to 14th July 2025",
        "Location: Plot No. 129, Sector 44, Gurugram (Near Millennium City Center Metro Station)",
        "Time: 10:00 AM to 4:00 PM"
    ];

    const notes = [
        "Please apply only if you are available for a face-to-face interview conducted at our office in Gurgaon",
        "The salary mentioned is non-negotiable and would depend upon the interview"
    ];

    const skills = [
        "Effective Communication",
        "English Proficiency (Spoken)",
        "MS-Office",
        "Negotiation"
    ];

    const eligibility = [
        "are available for the work from home job/internship",
        "can start the work from home job/internship between 5th Sep'25 and 10th Oct'25",
        "are available for duration of 3 months",
        "have relevant skills and interests",
        "* Women wanting to start/restart their career can also apply."
    ];

    const perks = [
        "Informal dress code",
        "Health Insurance",
        "Life Insurance"
    ];

    const similarJobs = [
        {
            id: 1,
            title: "Sales Executive",
            company: "Google",
            logo: "/Company Logo (3).png",
            location: "Remote",
            type: "Part-Time",
            salary: "20k - 30k",
            postedDate: "Posted 3 days ago",
            description: "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills."
        },
        {
            id: 2,
            title: "Client Acquisition Executive",
            company: "WWF India",
            logo: "/Company Logo.png",
            location: "Remote",
            type: "Part-Time",
            salary: "20k - 30k",
            postedDate: "Posted 3 days ago",
            description: "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills."
        },
        {
            id: 3,
            title: "Business Analyst",
            company: "Lenskart",
            logo: "/Logo Image (2).png",
            location: "Remote",
            type: "Part-Time",
            salary: "20k - 30k",
            postedDate: "Posted 3 days ago",
            description: "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills."
        },
        {
            id: 2,
            title: "Client Acquisition Executive",
            company: "WWF India",
            logo: "/Company Logo.png",
            location: "Remote",
            type: "Part-Time",
            salary: "20k - 30k",
            postedDate: "Posted 3 days ago",
            description: "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills."
        },
        {
            id: 3,
            title: "Business Analyst",
            company: "Lenskart",
            logo: "/Logo Image (2).png",
            location: "Remote",
            type: "Part-Time",
            salary: "20k - 30k",
            postedDate: "Posted 3 days ago",
            description: "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills."
        }
    ];

    return (
        <>
            <Section className="py-8 md:py-10 lg:py-12" sclass="bg-gradient-to-b from-[#f5f9fc] to-white">
                <div className="max-w-6xl mx-auto">
                    {/* Single White Card Container */}
                    <div className="bg-white rounded-2xl p-8 shadow">
                        {/* Job Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h1 className="text-xl font-bold text-gray-900 mb-2">{jobData.title}</h1>
                                <p className="text-sm text-gray-600 mb-3">{jobData.company}</p>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin size={16} className="text-gray-500" />
                                    <span className="text-sm">{jobData.locations.join(", ")}</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <Image
                                    src="/godrej.png"
                                    alt="Godrej Capital"
                                    width={110}
                                    height={50}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <hr className="my-5 border-gray-200" />

                        {/* Job Quick Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
                            <div className="flex items-start gap-2">
                                <Clock size={18} className="text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500 mb-0.5">Start Date</p>
                                    <p className="text-sm font-medium text-gray-900">{jobData.startDate}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IndianRupee size={18} className="text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500 mb-0.5">CTC (Annual)</p>
                                    <p className="text-sm font-medium text-gray-900">{jobData.ctc}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Briefcase size={18} className="text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500 mb-0.5">Experience</p>
                                    <p className="text-sm font-medium text-gray-900">{jobData.experience}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Calendar size={18} className="text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500 mb-0.5">Apply By</p>
                                    <p className="text-sm font-medium text-gray-900">{jobData.applyBy}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tags and Actions */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs">{jobData.postedTime}</span>
                                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs">{jobData.jobType}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={12} className="text-white" />
                                    </div>
                                    <span className="text-xs text-gray-700">Actively Hiring</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Info size={12} className="text-white" />
                                    </div>
                                    <span className="text-xs text-gray-700">Be An Early Applicant</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                                    <Share2 size={16} className="text-gray-600" />
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2 border-2 border-prime text-prime rounded-full hover:bg-prime/5 transition-colors text-sm font-medium">
                                    <span>Save Job</span>
                                </button>
                                <button className="px-6 py-2 bg-prime text-white rounded-full hover:bg-prime/90 transition-colors text-sm font-medium">
                                    Apply Now
                                </button>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* About the Job */}
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">About the job</h2>

                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Key responsibilities:</h3>
                            <ol className="space-y-1.5 mb-4">
                                {keyResponsibilities.map((item, index) => (
                                    <li key={index} className="text-gray-700 text-sm flex gap-2">
                                        <span>{index + 1}.</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>

                            <p className="text-sm text-gray-700 mb-4">
                                <span className="font-semibold">Requirements:</span> Good communication skills required (English and Hindi mix can also work)
                            </p>

                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Additional information:</h3>
                            <ol className="space-y-1.5 mb-4">
                                {additionalInfo.map((item, index) => (
                                    <li key={index} className="text-gray-700 text-sm flex gap-2">
                                        <span>{index + 1}.</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>

                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Note:</h3>
                            <ol className="space-y-1.5">
                                {notes.map((item, index) => (
                                    <li key={index} className="text-gray-700 text-sm flex gap-2">
                                        <span>{index + 1}.</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Skills Required */}
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Skill(s) required</h2>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-prime text-white rounded-full hover:bg-prime/90 transition-colors text-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                                </svg>
                                <span>Earn Certifications</span>
                            </button>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Who Can Apply */}
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Who Can Apply</h2>
                            <ol className="space-y-1.5">
                                {eligibility.map((item, index) => (
                                    <li key={index} className="text-gray-700 text-sm flex gap-2">
                                        <span>{index + 1}.</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Salary */}
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Salary</h2>
                            <p className="text-gray-700 text-sm mb-2">Annual CTC: ₹ 3,02,000 - 3,25,000 /year</p>
                            <p className="text-gray-700 font-semibold text-sm mb-2">Annual CTC breakup:</p>
                            <ol className="space-y-1">
                                <li className="text-gray-700 text-sm">1. Fixed pay: ₹ 3,00,000 - 3,10,000 /year</li>
                                <li className="text-gray-700 text-sm">2. Variable pay: ₹ 2,000 - 15,000 /year</li>
                            </ol>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Perks */}
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Perks</h2>
                            <div className="flex flex-wrap gap-2">
                                {perks.map((perk, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm">
                                        {perk}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* About Company */}
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">About Godrej capital</h2>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Godrej Capital is the financial services arm of the Godrej Group, serving as the holding company for Godrej Housing Finance and Godrej Finance. It focuses on building a long-term, sustainable retail financial services business in India, leveraging the Godrej Group's 125+ year legacy of trust. Godrej Capital offers a range of financial products, including home loans, loan against property, and business loans, with a digital-first approach and a commitment to customer-centric product innovation.
                            </p>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Bottom Action Buttons */}
                        <div className="flex gap-3">
                            <button className="p-2.5 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                                <Share2 size={18} className="text-gray-600" />
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-prime text-prime rounded-full hover:bg-prime/5 transition-colors text-sm font-medium">
                                <Bookmark size={18} />
                                <span>Save Job</span>
                            </button>
                            <button className="flex-1 bg-prime text-white py-2.5 rounded-full hover:bg-prime/90 transition-colors text-sm font-medium">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Similar Job Openings Section */}
            <Section className="py-12" sclass="bg-gray-50">
                <div>
                    <Heading
                        black='Similar '
                        blue="Job Openings"
                        className="text-center mb-3"
                    />
                    <P className="text-center mx-auto max-w-3xl">Gain the skills, support, and opportunities you need to build a stable, dignified career — all through Vedanta’s employment and training initiatives.</P>

                    <JobCarousel jobs={similarJobs} />

                    {/* Sign Up CTA */}
                    <div className="bg-prime/10 border border-prime/20 rounded-2xl p-8 md:p-12 text-center mt-12">
                        <Heading
                            black="Looking For More Such"
                            blue="Similar Opportunities?"
                            className="text-center lg:!text-2xl mb-7"
                        />
                        <PreloaderLink href="/join">
                            <StyleButton text="Sign Up" />
                        </PreloaderLink>
                    </div>
                </div>
            </Section>
        </>
    )
}
