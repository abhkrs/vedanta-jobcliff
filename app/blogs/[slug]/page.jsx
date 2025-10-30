"use client";
import Section from "@/components/uielements/Section";
import { H1 } from "@/components/typography";
import { motion } from "framer-motion";
import { useAnimation } from "@/components/AnimationContext";
import Heading from "@/components/typography/Heading";
import PreloaderLink from "@/components/PreloaderLink";
import Image from "next/image";
import StyleButton from "@/components/StyleButton";
import OwlCarousel from "@/components/OwlCarousel";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BlogDetails() {
  const { isPageTransitionComplete } = useAnimation();
  const shouldAnimate = isPageTransitionComplete;

  const blog = {
    title: "How to Build a Career Without a Degree",
    image: "/blogdetails.webp",
    date: "Nov 6, 2024 4:36:46 PM",
    readTime: "5 min read",
    content: `In today's changing job market, having a college degree is no longer the only path to building a successful and meaningful career. What matters more now is your willingness to learn, adapt, and grow. Many people from underprivileged backgrounds or those who couldn't pursue higher education are proving that skills, dedication, and the right guidance can lead to stable jobs and brighter futures.

The first step is to understand your own strengths — whether it's communication, organizing tasks, working with your hands, or solving problems. Once you know what you're naturally good at, the next step is to build practical skills through short-term training. At Vedanta Foundation, we offer free and easy-to-access courses that teach you exactly what employers are looking for, from data entry and computer basics to retail sales and fieldwork. These programs are designed not just to educate, but to prepare you for real-world jobs.

Once trained, you can build a strong resume even without a degree by showcasing your skills, completed courses, and any volunteer work or small jobs you've done. This shows employers that you're serious, capable, and ready to work. Starting with an entry-level role might feel small, but it's the most important step toward long-term growth. Every job teaches you something valuable, and over time, your experience will become your biggest qualification.

Through the Vedanta Job Portal, you can explore opportunities that match your skill level, apply quickly, and track your progress. With the right attitude and consistent effort, your lack of a degree won't stop you — it will only make your journey more inspiring. Remember, real success doesn't come from a certificate; it comes from the courage to keep moving forward.

Not everyone has the chance to earn a college degree, but that should never be a barrier to building a successful and meaningful career. What truly matters is your willingness to learn, your dedication to improve, and your ability to make the most of the resources around you. Many people across India, especially from underserved communities, have proven that success doesn't come from a classroom alone — it comes from action.

With platforms like the Vedanta Foundation's job portal, you can access skill-building courses, hands-on training, and real job opportunities that are designed for individuals just like you. Employers today are looking for people who are dependable, eager to learn, and equipped with practical skills — not just degrees. Whether it's retail sales, field service, data entry, or basic technical roles, there are hundreds of career paths open to you. And you don't need to start big — even a small job is a step forward.

The key is to start, to show up, and to keep growing. Use your time wisely by enrolling in short-term courses, building a simple resume that reflects your strengths, and applying to entry-level jobs to gain experience. With each opportunity, you learn more, gain confidence, and become more employable. And with every step, you move closer to financial independence and a life of dignity.

At Vedanta Foundation, we believe that every person deserves a chance to grow — and we're here to support you on that journey. So don't wait for the perfect qualification. Start with what you have, take the first step, and let your efforts shape your future.`,
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

  return (
    <>
      <Section className="py-12">
        <article>
          <div className="w-full rounded-3xl overflow-hidden">
            <Image
              src={blog.image}
              width={1680}
              height={730}
              alt={blog.title}
              className="w-full object-cover"
            />
          </div>

          <div className="px-4 md:px-14 lg:px-24 xl:px-32 py-3 md:py-5 lg:py-8">
            <H1 className="!text-xl md:!text-2xl  text-black">{blog.title}</H1>
            <div className="flex items-center text-sm text-gray-600 my-4">
              <span>{blog.date}</span>
              <span className="mx-2 md:mx-4">|</span>
              <span>{blog.readTime}</span>
            </div>
            <motion.div
              className="text-black"
              initial={
                shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }
              }
              animate={
                shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {blog.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-md leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </article>
      </Section>
      <Section className="py-12" sclass="bg-gradient-to-b from-prime/5 to-white">
        <div className="mb-1">
          <span className="border rounded-full text-black py-1 px-6 uppercase text-sm">
            Related Blogs
          </span>
        </div>
        <div className="flex items-end justify-between mb-6 gap-4 lg:gap-20">
          <Heading black="Insights & " blue="Guidance" />
          <PreloaderLink href="/blogs">
            <StyleButton text="View All" />
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
                    <div className="bg-prime text-white rounded-full p-2.5 flex-shrink-0">
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
