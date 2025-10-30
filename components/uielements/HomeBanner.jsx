"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LogoSlider from "./LogoSlider";
import JobSearchBox from "./JobSearchBox";

const slides = [
  {
    id: 1,
    title: "Join Today and Unlock",
    highlight: "Exclusive Benefits!",
    description:
      "Register now and enjoy inaugural benefits, including early access to job postings, training sessions, and special resources that will help you start your career on the right foot.",
    badge:
      "Integrated Life Skills Training to nurture productive responsible citizens.",
    image: "/home/banner (1).webp",
  },
  {
    id: 2,
    title: "Enhance Skills with",
    highlight: "Expert-Led Courses",
    description:
      "Get ready for the job market with specialized training courses designed by industry experts. Gain in-demand skills to boost your career prospects and stay ahead in the competitive job market.",
    badge:
      "Integrated Life Skills Training to nurture productive responsible citizens.",
    image: "/home/banner (2).webp",
  },
  {
    id: 3,
    title: "Build Your Team with",
    highlight: "Diverse Talent",
    description:
      "Employers, tap into a pool of passionate and talented candidates from diverse backgrounds. Our platform offers you the opportunity to hire skilled individuals who are eager to make a positive impact.",
    badge:
      "Integrated Life Skills Training to nurture productive responsible citizens.",
    image: "/home/banner (3).webp",
  },
  {
    id: 4,
    title: "Exciting Opportunities",
    highlight: "Await Students!",
    description:
      "As a student, you can now unlock early access to exclusive job openings and career resources. Our introductory offer gives you a head start in securing meaningful employment with top employers.",
    badge:
      "Integrated Life Skills Training to nurture productive responsible citizens.",
    image: "/home/banner (4).webp",
  },
  {
    id: 5,
    title: "Empowering Lives Through",
    highlight: "Meaningful Work",
    description:
      "Built on a legacy of service, our job portal connects the underserved with dignified employment opportunities—paving the way for self-reliance, equality, and a brighter future.",
    badge:
      "Integrated Life Skills Training to nurture productive responsible citizens.",
    image: "/home/banner (5).webp",
  },
];

export default function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner_bg.webp"
          height={800}
          width={1800}
          alt=""
          className="object-cover"
          priority
        />
      </div>

      <div className="container relative z-10 py-8 md:py-12">
        {/* Main Content Area with Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Animated Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-semibold leading-tight !text-gray-900">
                  {slides[currentSlide].title}{" "}
                  <span className="text-prime">
                    {slides[currentSlide].highlight}
                  </span>
                </h2>

                <p className="text-gray-600 text-md mt-6">
                  {slides[currentSlide].description}
                </p>

                <div className="inline-block bg-prime text-white px-5 py-2 rounded-lg text-md mt-6">
                  {slides[currentSlide].badge}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Static CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-prime border-prime hover:border-sec border-2 hover:bg-sec text-white px-8 py-2 rounded-full font-semibold transition-colors">
                Register Now
              </button>
              <button className="bg-white hover:bg-sec hover:border-sec hover:text-white text-prime border-2 border-prime px-8 py-2 rounded-full font-semibold transition-colors">
                Explore Jobs
              </button>
            </div>

            {/* Logo Slider */}
            <div className="-mx-20 pe-20">
                <LogoSlider />
            </div>

            <div className="ralative mt-4">
              {/* Dots Navigation */}
              <div className="absolute left-1/2 flex justify-center gap-2 z-50">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`transition-all duration-300 w-2 h-2 rounded-full ${
                      currentSlide === index
                        ? "bg-black"
                        : "bg-gray-300 hover:bg-prime/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Image - Animated */}
          <div className="relative h-[calc(78vh+1rem)] w-full max-w-[calc(45vw+1rem)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute right-0 lg:-right-20 top-0 w-full lg:w-[120%] h-full"
              >
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  fill
                  className="object-contain object-right"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Search Box */}
        <JobSearchBox />
      </div>
    </div>
  );
}
