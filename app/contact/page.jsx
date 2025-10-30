'use client'
import { P } from "@/components/typography";
import Heading from "@/components/typography/Heading";
import Section from "@/components/uielements/Section";
import { MessagesSquare, Smile, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from 'react';
import Accordion from "@/components/Accordion";

export default function page() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleAccordion = useCallback((index) => {
        setOpenIndex(prev => prev === index ? null : index);
    }, []);
    const contactDetails = [
        {
            icon: Smile,
            heading: "Chat to sales",
            description: "Speak to our expert team",
            linkText: "sales@company.com",
            link: "mailto:sales@company.com"
        },
        {
            icon: MessagesSquare,
            heading: "Chat to support",
            description: "Speak to our expert team",
            linkText: "sales@company.com",
            link: "mailto:sales@company.com"
        },
        {
            icon: Phone,
            heading: "Call Us",
            description: "Speak to our expert team",
            linkText: "+1 (222) 000-000",
            link: "tel:+12223000000"
        },
        {
            icon: MapPin,
            heading: "Visit Us",
            description: "Visit our office HQ",
            linkText: "View on Google Maps",
            link: "https://maps.google.com"
        }
    ];

    const faqData = [
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
    ];

    return (
        <>
            <Section className="grid lg:grid-cols-11 gap-6 lg:gap-20 xl:gap-32 py-12" sclass="bg-gradient-to-tr from-blue-200 to-blue-50">
                <div className="col-span-5">
                    <span className="border rounded-full text-black py-1 px-6 mb-4 block w-fit">CONTACT US</span>
                    <Heading
                        black="Get"
                        blue="In Touch"
                    />
                    <P>Have a question, need career guidance, or want to know more about our training programs and job opportunities? Reach out to us and let’s build your future together.</P>
                </div>

                <div className="col-span-6">
                    <div className="bg-white shadow rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7">
                        <form className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <input type="text" id="name" className="bg-[#f5f9fb] py-2.5 px-4 outline-none focus:ring-2 ring-prime rounded-md" placeholder="Enter Full Name" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <input type="phone" id="phone" className="bg-[#f5f9fb] py-2.5 px-4 outline-none focus:ring-2 ring-prime rounded-md" placeholder="Enter Phone Number" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <input type="email" id="email" className="bg-[#f5f9fb] py-2.5 px-4 outline-none focus:ring-2 ring-prime rounded-md" placeholder="Enter Email ID" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <input type="text" id="related" className="bg-[#f5f9fb] py-2.5 px-4 outline-none focus:ring-2 ring-prime rounded-md" placeholder="Entre Related To" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">

                                <textarea id="message" className="bg-[#f5f9fb] py-2.5 px-4 outline-none focus:ring-2 ring-prime rounded-md" rows="4" placeholder="Enter Message..."></textarea>
                            </div>
                            <button type="submit" className="bg-prime text-white py-2 px-8 md:px-14 lg:px-20 rounded-full w-fit ">Send Message</button>
                        </form>
                    </div>
                </div>
            </Section>
            <Section className="py-6 lg:py-12" sclass="bg-white">
                <Heading
                    black="Connect with Our "
                    blue="Expert Team"
                    className="text-center mb-4"
                />

                <P className="max-w-4xl mx-auto text-center">Need help finding the right job? Our expert team is here to guide you with resume tips, job matching, and interview preparation—so you can move forward with confidence.</P>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4 xl:gap-5 mt-8">
                    {contactDetails.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg">
                                <div className="border-gray-300 rounded-md border w-fit p-2 mb-4">
                                    <Icon className="w-6 h-6 text-black" />
                                </div>
                                <h3 className="font-semibold text-lg text-black">{item.heading}</h3>
                                <p className="text-sm text-black mb-3">{item.description}</p>
                                <Link href={item.link} className="text-black font-medium text-md underline hover:text-prime hover:translate-x-1 block w-fit transition-all duration-300">{item.linkText}</Link>
                            </div>
                        );
                    })}
                </div>
            </Section>
            <Section className=" py-6 md:py-10 lg:py-18 xl:py-20" sclass="bg-gradient-to-b from-sec/10 to-white pb-8">
                <Heading
                    black=" Frequently"
                    green="Asked Questions"
                    className="text-center mb-4"
                />

                <P className="max-w-3xl mx-auto text-center">Got questions? We’ve answered the most common queries about jobs, training, registration, and support—so you can get started without confusion.</P>

                <div className="mt-8">
                    <Accordion
                        data={faqData}
                        openIndex={openIndex}
                        onToggle={toggleAccordion}
                        arrowColor="green"
                    />
                </div>
            </Section>

        </>
    )
}