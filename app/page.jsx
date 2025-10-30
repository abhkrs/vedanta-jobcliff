"use client";

import { P } from "@/components/typography";
import Heading from "@/components/typography/Heading";
import Section from "@/components/uielements/Section";
import Slider from "@/components/Slider";
import OwlCarousel from "@/components/OwlCarousel";
import CourseCard from "@/components/CourseCard";
import React, { useState } from "react";
import StyleButton from "@/components/StyleButton";
import PreloaderLink from "@/components/PreloaderLink";
import Image from "next/image";
import { Clock, DollarSign, Heart, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import StyleButtonBlack from "@/components/StyleButtonBlack";
import TestimonialCard from "@/components/uielements/TestimonialCard";
import CompanyCard from "@/components/uielements/CompanyCard";
import SpotlightCard from "@/components/SpotlightCard";
import HomeBanner from "@/components/uielements/HomeBanner";

export default function page() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeCourseFilter, setActiveCourseFilter] = useState("Development");

  const whatsNew = [
    {
      image: "/home/card_banner (1).webp",
      link: "https://trainings.jobcliff.com/",
    },
    {
      image: "/home/card_banner (2).webp",
      link: "https://trainings.jobcliff.com/",
    },
    {
      image: "/home/card_banner (3).webp",
      link: "https://trainings.jobcliff.com/",
    },
    {
      image: "/home/card_banner (2).webp",
      link: "https://trainings.jobcliff.com/",
    },
    {
      image: "/home/card_banner (3).webp",
      link: "https://trainings.jobcliff.com/",
    },
  ];

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
      filters: ["Big Brands", "Remote Jobs", "Part-Time"],
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
      filters: ["Big Brands", "Remote Jobs", "Part-Time", "Design"],
    },
    {
      id: 3,
      title: "Backend Manager",
      company: "Uber",
      logo: "/Company Logo (2).png",
      location: "Remote",
      type: "Full-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
      filters: ["Big Brands", "Remote Jobs", "Full-Time"],
    },
    {
      id: 4,
      title: "Software Developer",
      company: "Apple",
      logo: "/Company Logo (1).png",
      location: "Remote",
      type: "Full-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
      filters: ["Big Brands", "Remote Jobs", "Full-Time"],
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
      filters: ["Big Brands", "Remote Jobs", "Part-Time"],
    },
    {
      id: 6,
      title: "Delivery Agent",
      company: "Zomato",
      logo: "/Logo Image.png",
      location: "Remote",
      type: "Freelance",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
      filters: ["Remote Jobs", "Freelance"],
    },
    {
      id: 7,
      title: "MBA Intern",
      company: "Uber",
      logo: "/Company Logo (2).png",
      location: "Remote",
      type: "Part-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
      filters: ["Big Brands", "Remote Jobs", "Part-Time", "MBA"],
    },
    {
      id: 8,
      title: "UI/UX Designer",
      company: "Apple",
      logo: "/Company Logo (1).png",
      location: "Remote",
      type: "Full-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
      filters: ["Big Brands", "Remote Jobs", "Full-Time", "Design"],
    },
    {
      id: 9,
      title: "Content Writer",
      company: "Uber",
      logo: "/Company Logo (2).png",
      location: "Remote",
      type: "Freelance",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
      filters: ["Remote Jobs", "Freelance", "Media"],
    },
    {
      id: 10,
      title: "Fresher Trainee",
      company: "Apple",
      logo: "/Company Logo (1).png",
      location: "Remote",
      type: "Full-Time",
      salary: "20k - 30k",
      postedDate: "Posted 3 days ago",
      description:
        "Build client relationships, meet sales targets, and promote products across assigned areas. Ideal for self-motivated individuals with strong skills.",
      filters: ["Big Brands", "Remote Jobs", "Full-Time", "Freshers"],
    },
  ];

  const filterButtons = [
    "Big Brands",
    "Remote Jobs",
    "Part-Time",
    "Freelance",
    "Full-Time",
    "Freshers",
    "MBA",
    "Design",
    "Media",
  ];

  const companies = [
    {
      slug: "sound-society",
      name: "Sound Society India",
      location: "Mumbai, India",
      logo: "/Logo Image (1).png",
    },
    {
      slug: "zomato",
      name: "Zomato",
      location: "Mumbai, India",
      logo: "/Logo Image.png",
    },
    {
      slug: "lenskart",
      name: "Lenskart",
      location: "Mumbai, India",
      logo: "/Logo Image (2).png",
    },
    {
      slug: "lenskart",
      name: "Lenskart",
      location: "Mumbai, India",
      logo: "/Logo Image (2).png",
    },
  ];

  const filteredJobs =
    activeFilter === "All"
      ? jobListings
      : jobListings.filter((job) => job.filters.includes(activeFilter));

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = filteredJobs.length > visibleCount;
  const canShowLess = visibleCount > 6;

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredJobs.length));
  };

  const handleViewLess = () => {
    setVisibleCount((prev) => Math.max(prev - 3, 6));
  };

  const blogData = [
    {
      title: "How to Build a Career Without a Degree",
      slug: "how-to-build-career-without-degree",
      image: "/image (1).png",
      category: "Freshers",
      date: "Nov 6, 2024 4:36:46 PM",
      readTime: "1 min read",
    },
    {
      title: "Top 10 Skills Employers Look for Today",
      slug: "top-10-skills-employers-look-for",
      image: "/image (2).png",
      category: "Business",
      date: "Nov 6, 2024 4:36:46 PM",
      readTime: "1 min read",
    },
    {
      title: "Interview Tips for First-Time Job Seekers",
      slug: "interview-tips-first-time-job-seekers",
      image: "/image (3).png",
      category: "Interview",
      date: "Nov 6, 2024 4:36:46 PM",
      readTime: "1 min read",
    },
    {
      title: "Creating a Resume That Gets You Noticed",
      slug: "creating-resume-gets-noticed",
      image: "/image (4).png",
      category: "Freshers",
      date: "Nov 6, 2024 4:36:46 PM",
      readTime: "1 min read",
    },
  ];

  const coursesData = [
    {
      id: 1,
      title: "Data Science Course",
      image: "/home/course_img (1).webp",
      duration: "6 months course",
      salary: "₹3-10 LPA salary",
      opportunities: "1.08 Lac+ opportunities",
      rating: 4.5,
      filters: ["Development", "MBA", "Design", "Media"],
    },
    {
      id: 2,
      title: "Human Resource Management Course",
      image: "/home/course_img (2).webp",
      duration: "6 months course",
      salary: "₹3-10 LPA salary",
      opportunities: "1.08 Lac+ opportunities",
      rating: 4.5,
      filters: ["Development", "MBA", "Design", "Media"],
    },
    {
      id: 3,
      title: "Full Stack Development Course",
      image: "/home/course_img (3).webp",
      duration: "6 months course",
      salary: "₹3-10 LPA salary",
      opportunities: "1.08 Lac+ opportunities",
      rating: 4.5,
      filters: ["Development", "MBA", "Design", "Media"],
    },
  ];

  const courseFilters = ["Development", "MBA", "Design", "Media"];

  const filteredCourses = coursesData.filter((course) =>
    course.filters.includes(activeCourseFilter)
  );

  return (
    <>
      <HomeBanner />
      <Section
        sclass="bg-gradient-to-b from-white to-prime/15"
        className="py-12"
      >
        <Heading black="What's" blue="New" className="text-center" />
        <P className="mx-auto max-w-3xl text-center mt-3 mb-6">
          Unlock your potential with practical courses, job-ready skills, and
          real opportunities. Learn at your pace and take the first step toward
          a brighter future.
        </P>

        <OwlCarousel
          id="whats-new-carousel"
          options={{
            nav: true,
            dots: true,
            mergedNav: true,
            center: false,
            loop: true,
            responsive: {
              0: {
                items: 1,
              },
              640: {
                items: 2,
              },
              1024: {
                items: 3,
              },
            },
          }}
        >
          {whatsNew.map((card, i) => (
            <Link
              key={i}
              href={card.link}
              target="_blank"
              className="block overflow-hidden rounded-2xl shadow-lg shadow-gray-100"
            >
              <Image src={card.image} alt="" height={760} width={1088} />
            </Link>
          ))}
        </OwlCarousel>
      </Section>
      <Section
        sclass="bg-gradient-to-b from-prime/5 to-white"
        className="py-8 lg:py-12"
      >
        <div>
          <div className="flex items-end justify-between mb-6 gap-4 lg:gap-20">
            <div className="max-w-3xl">
              <Heading
                black="Ready to "
                green="Transform Your Future?"
                className="mb-2"
              />
              <P>
                Gain the skills, support, and opportunities you need to build a
                stable, dignified career — all through Vedanta's employment and
                training initiatives.
              </P>
            </div>
            <PreloaderLink href="/jobs">
              <StyleButton text="View All" green={true} />
            </PreloaderLink>
          </div>

          <div className="flex flex-wrap gap-3 mt-6 mb-6">
            <button
              onClick={() => {
                setActiveFilter("All");
                setVisibleCount(6);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === "All"
                  ? "bg-sec text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-sec hover:text-sec"
              }`}
            >
              All
            </button>
            {filterButtons.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(6);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-sec text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-sec hover:text-sec"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 shadow-lg shadow-gray-100 hover:shadow-gray-300 transition-shadow"
              >
                {/* Company Logo & Title */}
                <div className="flex items-start gap-4 mb-6 pb-4 border-b border-gray-200">
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
                <div className="flex flex-wrap gap-2 mb-5">
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
                    href="https://trainings.jobcliff.com/"
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
          </div>

          {filteredJobs.length > 6 && (
            <div className="flex justify-center gap-4 mt-8">
              {hasMore && (
                <button
                  onClick={handleViewMore}
                  className="py-3 px-24 border border-sec text-sec rounded-full hover:bg-sec hover:text-white transition-all duration-300 font-medium"
                >
                  View More
                </button>
              )}
              {canShowLess && (
                <button
                  onClick={handleViewLess}
                  className="py-3 px-24 border border-sec text-sec rounded-full hover:bg-sec hover:text-white transition-all duration-300 font-medium"
                >
                  View Less
                </button>
              )}
            </div>
          )}
        </div>
      </Section>

      <div className="bg-gradient-to-b from-prime/10 to-white py-12">
        <Section>
          <Heading
            black="Trending & Placement "
            blue="Guarantee Courses"
            className="mb-2 text-center"
          />
          <P className="text-center max-w-2xl mx-auto mb-8">
            Gain the skills, support, and opportunities you need to build a
            stable, dignified career — all through Vedanta's employment and
            training initiatives.
          </P>

          {/* Course Filter Buttons */}
          <div className="flex justify-center gap-3 mb-4">
            {courseFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCourseFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCourseFilter === filter
                    ? "bg-prime text-white border border-prime"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-prime hover:text-prime"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </Section>
        {/* Course Slider */}
        <OwlCarousel
          id="course-carousel"
          key={activeCourseFilter}
          options={{
            nav: false,
            dots: true,
            center: true,
            responsive: {
              0: {
                items: 1.2,
              },
              640: {
                items: 1.5,
              },
              768: {
                items: 2.2,
              },
              1024: {
                items: 3.4,
              },
            },
          }}
        >
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              image={course.image}
              duration={course.duration}
              salary={course.salary}
              opportunities={course.opportunities}
              rating={course.rating}
              href="/courses"
            />
          ))}
        </OwlCarousel>
      </div>
      {/* testimonaila section */}
      <Section className="py-12" sclass="relative">
        <Image
          src="/home/bg_testimonials.webp"
          fill
          alt="bg"
          className="inset-0 object-cover"
        />
        <div className="flex flex-wrap justify-between items-start relative z-20">
          <div className="max-w-2xl">
            <Heading
              black="Success Stories That Inspire"
              className="brightness-0 invert"
            />
            <P className="text-gray-200 font-light mt-3">
              Discover how meaningful work and support from JobSkool Foundation
              have helped individuals achieve stability, dignity, and a brighter
              future.
            </P>
          </div>
          <PreloaderLink href="">
            <StyleButtonBlack text="View All" />
          </PreloaderLink>
        </div>

        <div className="relative z-20 testimonialslider pt-4">
          <OwlCarousel
            id="testimonial-carousel"
            options={{
              nav: false,
              dots: true,
              whiteDots: true,
              responsive: {
                0: {
                  items: 1,
                },
                640: {
                  items: 1.5,
                },
                768: {
                  items: 2,
                },
                1024: {
                  items: 3,
                },
              },
            }}
          >
            {[
              {
                id: 1,
                title: "Commitment to Excellence",
                content:
                  "Before joining JobSkool's program, I struggled to find stable work. Today, I have a full-time job and the confidence to grow. This platform changed my life",
                name: "Vikram Rao",
                avatar: "/home/testimonial.png",
                daysAgo: "5 Days Ago",
                rating: 5,
              },
              {
                id: 2,
                title: "Commitment to Excellence",
                content:
                  "Before joining JobSkool's program, I struggled to find stable work. Today, I have a full-time job and the confidence to grow. This platform changed my life",
                name: "Vikram Rao",
                avatar: "/home/testimonial.png",
                daysAgo: "5 Days Ago",
                rating: 5,
              },
              {
                id: 3,
                title: "Commitment to Excellence",
                content:
                  "Before joining JobSkool's program, I struggled to find stable work. Today, I have a full-time job and the confidence to grow. This platform changed my life",
                name: "Vikram Rao",
                avatar: "/home/testimonial.png",
                daysAgo: "5 Days Ago",
                rating: 5,
              },
              {
                id: 4,
                title: "Commitment to Excellence",
                content:
                  "Before joining JobSkool's program, I struggled to find stable work. Today, I have a full-time job and the confidence to grow. This platform changed my life",
                name: "Vikram Rao",
                avatar: "/home/testimonial.png",
                daysAgo: "5 Days Ago",
                rating: 5,
              },
            ].map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                title={testimonial.title}
                content={testimonial.content}
                name={testimonial.name}
                avatar={testimonial.avatar}
                daysAgo={testimonial.daysAgo}
                rating={testimonial.rating}
              />
            ))}
          </OwlCarousel>
        </div>
      </Section>
      <div
        className="py-12"
        style={{
          background:
            "linear-gradient(0deg, rgba(7, 100, 167, 0.04) 0%, rgba(7, 100, 167, 0) 100%)",
        }}
      >
        <Section>
          <div className="flex items-end justify-between mb-6 gap-4 lg:gap-20">
            <div className="max-w-2xl">
              <Heading
                black="Companies "
                blue="That Are Hiring"
                className="mb-2"
              />
              <P className="text-gray-900">
                Discover opportunities with top employers who are actively
                building their teams and shaping the future.
              </P>
            </div>
            <PreloaderLink href="/companies">
              <StyleButton text="View All" />
            </PreloaderLink>
          </div>
        </Section>

        <div className="pb-5 bg-transparent">
          <OwlCarousel
            id="company-carousel"
            options={{
              nav: true,
              dots: true,
              mergedNav: true,
              center: true,
              responsive: {
                0: {
                  items: 1.2,
                },
                640: {
                  items: 2,
                },
                768: {
                  items: 3,
                },
                1024: {
                  items: 3.5,
                },
              },
            }}
          >
            {companies.map((company, i) => (
              <SpotlightCard
                key={i}
                className="!bg-white rounded-xl p-3 shadow-lg shadow-gray-200 my-4"
              >
                <div className="flex items-start gap-2">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 px-3 py-1 rounded bg-white/50 text-black">
                    <h3 className="font-semibold mb-1">{company.name}</h3>
                    <p className="text-sm flex items-top gap-1">
                      <MapPin size={18} />
                      {company.location}
                    </p>
                  </div>
                </div>
                <hr className="mb-3 mt-5 border-gray-200" />
                <PreloaderLink
                  href={`/companies/${company.slug}`}
                  className="text-prime border border-prime rounded-full block text-center py-2 px-5 backdrop-blur-md bg-white/50 hover:bg-prime hover:text-white transition-all duration-100"
                >
                  View Details
                </PreloaderLink>
              </SpotlightCard>
            ))}
          </OwlCarousel>
        </div>
      </div>

      <Section className="py-12">
        <div className="mb-1">
          <span className="border rounded-full text-black py-1 px-6 uppercase text-sm">
            Latest Blogs
          </span>
        </div>
        <div className="flex items-end justify-between mb-6 gap-4 lg:gap-20">
          <Heading black="Insights & " green="Guidance" />
          <PreloaderLink href="/blogs">
            <StyleButton text="View All" green={true} />
          </PreloaderLink>
        </div>

        <OwlCarousel
          id="blog-carousel"
          options={{
            nav: false,
            dots: true,
            center: false,
            loop: true,
            margin: 20,
            responsive: {
              0: {
                items: 1,
              },
              640: {
                items: 2,
              },
              1024: {
                items: 3,
              },
            },
          }}
        >
          {blogData.slice(0, 6).map((blog) => (
            <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200 cursor-pointer my-4 mx-1">
                <div className="relative h-48">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="py-4 px-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {blog.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      <span>{blog.date}</span>
                      <span className="mx-2">|</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <div className="bg-sec text-white rounded-full p-2.5 flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </OwlCarousel>
      </Section>
    </>
  );
}
