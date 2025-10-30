'use client'
import Section from "@/components/uielements/Section";
import { useState, useCallback } from 'react';
import { H1, P } from "@/components/typography";
import Accordion from "@/components/Accordion";

export default function page() {
    const [activeTab, setActiveTab] = useState('employee');
    const [openIndex, setOpenIndex] = useState(0);

    const faqData = {
        employee: [
            {
                question: "How do I create an account on the job portal?",
                answer: "To create an account on the job portal, simply click on the 'Register' or 'Sign Up' button on the homepage, select whether you are a job seeker or an employer, fill in your basic details such as name, email, phone number, and password, verify your account through the link sent to your email or the code sent to your mobile, and then complete your profile by uploading your resume and adding details like skills, education, and experience."
            },
            {
                question: "How do I search and apply for jobs?",
                answer: "You can search for jobs using the search bar on the homepage or browse through job categories. Use filters to narrow down results by location, salary, experience level, and company. Click on any job listing to view details and click 'Apply Now' to submit your application."
            },
            {
                question: "Can I apply for multiple jobs at the same time?",
                answer: "Yes, you can apply for multiple jobs simultaneously. There's no limit to the number of applications you can submit. However, make sure to tailor your application for each position to increase your chances of success."
            },
            {
                question: "What should I do if I forget my password?",
                answer: "If you forget your password, click on the 'Forgot Password' link on the login page. Enter your registered email address or phone number, and you'll receive a password reset link or OTP to create a new password."
            },
            {
                question: "How do employers contact me after I apply?",
                answer: "Employers will contact you through the email address or phone number provided in your profile. Make sure your contact information is up-to-date. You may also receive notifications through the job portal's messaging system."
            },
            {
                question: "How do I track the status of my job applications?",
                answer: "You can track your application status by logging into your account and visiting the 'My Applications' section. Here you'll see all your submitted applications with their current status: Applied, Under Review, Shortlisted, or Rejected."
            }
        ],
        employer: [
            {
                question: "How do I post a job on the portal?",
                answer: "To post a job, log into your employer account, click on 'Post a Job' button, fill in the job details including title, description, requirements, salary range, and location. Review your posting and click 'Publish' to make it live."
            },
            {
                question: "How can I search for candidates?",
                answer: "Use the candidate search feature to find potential employees. You can filter by skills, experience, location, education, and other criteria. Browse through profiles and contact suitable candidates directly."
            },
            {
                question: "What is the cost of posting jobs?",
                answer: "We offer various pricing plans for employers. Basic job postings may be free for a limited time, while premium features like featured listings, extended visibility, and advanced candidate search tools are available through paid plans."
            },
            {
                question: "How do I manage job applications?",
                answer: "Access your employer dashboard to view all applications for your posted jobs. You can sort, filter, and review applications, shortlist candidates, schedule interviews, and update application statuses."
            }
        ],
        courseLearners: [
            {
                question: "Are the courses free?",
                answer: "Yes, all courses offered through the Vedanta Foundation's Learning Management System (LMS) are completely free of cost. These courses are designed to make skill-building accessible to everyone — especially individuals who may not have had the opportunity for formal education or job training. Whether you are just starting your career, looking to switch fields, or returning to work after a gap, you can access our courses without any fees. The goal is to remove financial barriers and provide equal opportunities for learning and employment. All you need is the willingness to learn and a device with internet access."
            },
            {
                question: "In what languages are the courses available?",
                answer: "Our courses are available in multiple languages to ensure accessibility for learners from diverse backgrounds. Currently, we offer courses in English, Hindi, and several regional languages. We are continuously working to expand our language offerings to reach more learners across different regions."
            },
            {
                question: "Can I access the courses on my mobile phone?",
                answer: "Absolutely! Our Learning Management System is fully mobile-responsive, allowing you to access all course materials, videos, and assessments on your smartphone or tablet. You can learn on the go, at your own pace, from anywhere with an internet connection."
            },
            {
                question: "How long do the courses take to complete?",
                answer: "Course duration varies depending on the subject and skill level. Most courses range from 2 to 8 weeks, with flexible learning schedules. You can learn at your own pace and complete the course according to your availability. Each course clearly mentions the estimated time commitment required."
            },
            {
                question: "Do I need any prior experience to start a course?",
                answer: "No prior experience is required for most of our beginner-level courses. We offer courses for all skill levels — from complete beginners to advanced learners. Each course description clearly mentions the prerequisites, if any, so you can choose the right course based on your current knowledge and experience."
            },
            {
                question: "Are the courses linked to real job opportunities?",
                answer: "Yes! Upon successful completion of our courses, you gain access to our job portal where employers actively seek candidates with the skills you've learned. We partner with various companies and organizations to connect trained individuals with relevant job opportunities, helping you transition from learning to earning."
            },
            {
                question: "Will I get a certificate after completing a course?",
                answer: "Yes, you will receive a certificate of completion after successfully finishing a course and passing the assessments. This certificate can be downloaded and shared with potential employers, added to your resume, or showcased on professional networking platforms to demonstrate your newly acquired skills."
            }
        ]
    };

    const accordionData = faqData[activeTab];

    const toggleAccordion = useCallback((index) => {
        setOpenIndex(prev => prev === index ? null : index);
    }, []);

    return (
        <>
            <Section className="py-12">
                <div className="text-center mb-6">
                    <span className="border rounded-full text-black py-1 px-10">FAQs</span>
                </div>
                <H1 className="text-center text-black">Frequently Asked Questions</H1>
                <P className="text-center max-w-3xl mx-auto my-4">We understand you may have questions before getting started. To make things easier, we’ve gathered a list of the most frequently asked questions along with clear, straightforward answers.</P>

                <div className="relative border-b-4 border-prime/20 mb-8">
                    <div className="flex justify-center gap-8 -mb-1">
                        <button
                            onClick={() => { setActiveTab('employee'); setOpenIndex(0); }}
                            className={`py-3 font-medium transition-all duration-300 relative ${
                                activeTab === 'employee'
                                    ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-prime after:transition-all after:duration-300'
                                    : 'text-gray-600 hover:text-prime after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-prime after:transition-all after:duration-300 hover:after:w-full'
                            }`}
                        >
                            Employee
                        </button>
                        <button
                            onClick={() => { setActiveTab('employer'); setOpenIndex(0); }}
                            className={`py-3 font-medium transition-all duration-300 relative ${
                                activeTab === 'employer'
                                    ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-prime after:transition-all after:duration-300'
                                    : 'text-gray-600 hover:text-prime after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-prime after:transition-all after:duration-300 hover:after:w-full'
                            }`}
                        >
                            Employer
                        </button>
                        <button
                            onClick={() => { setActiveTab('courseLearners'); setOpenIndex(0); }}
                            className={`py-3 font-medium transition-all duration-300 relative ${
                                activeTab === 'courseLearners'
                                    ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-prime after:transition-all after:duration-300'
                                    : 'text-gray-600 hover:text-prime after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-prime after:transition-all after:duration-300 hover:after:w-full'
                            }`}
                        >
                            Course Learners
                        </button>
                    </div>
           
                </div>

                <div className="mt-12">
                    <Accordion 
                        data={accordionData} 
                        openIndex={openIndex} 
                        onToggle={toggleAccordion} 
                    />
                </div>
            </Section>
        </>
    )
}
