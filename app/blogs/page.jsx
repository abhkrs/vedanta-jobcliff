'use client';
import Heading from "@/components/typography/Heading";
import Section from "@/components/uielements/Section";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function page() {
    const [selectedCategory, setSelectedCategory] = useState('All Blogs');
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9;

    const categories = [
        'All Blogs',
        'Marketing',
        'Design',
        'Business',
        'Finance',
        'Communication',
        'Human Resources',
        'Lifestyle',
        'Freshers',
        'Interview'
    ];

    const blogData = [
        {
            title: "How to Build a Career Without a Degree",
            slug: "how-to-build-career-without-degree",
            image: "/image (1).png",
            category: "Freshers",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "Top 10 Skills Employers Look for Today",
            slug: "top-10-skills-employers-look-for",
            image: "/image (2).png",
            category: "Business",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "Interview Tips for First-Time Job Seekers",
            slug: "interview-tips-first-time-job-seekers",
            image: "/image (3).png",
            category: "Interview",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "Creating a Resume That Gets You Noticed",
            slug: "creating-resume-gets-noticed",
            image: "/image (4).png",
            category: "Freshers",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "Why Soft Skills Matter More Than Ever",
            slug: "why-soft-skills-matter",
            image: "/image (5).png",
            category: "Communication",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "How to Stay Motivated During a Job Search",
            slug: "stay-motivated-job-search",
            image: "/image (6).png",
            category: "Lifestyle",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "From Training to Placement: Your Step-by-Step Guide",
            slug: "training-to-placement-guide",
            image: "/image (7).png",
            category: "Freshers",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "How to Communicate with Confidence at Work",
            slug: "communicate-confidence-work",
            image: "/image (8).png",
            category: "Communication",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "Success Stories: How Vedanta Helped Me Find a Job",
            slug: "success-stories-vedanta",
            image: "/image (9).png",
            category: "Lifestyle",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "Interview Tips for First-Time Job Seekers",
            slug: "interview-tips-first-time-job-seekers-2",
            image: "/image (3).png",
            category: "Interview",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "Creating a Resume That Gets You Noticed",
            slug: "creating-resume-gets-noticed-2",
            image: "/image (4).png",
            category: "Freshers",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "Why Soft Skills Matter More Than Ever",
            slug: "why-soft-skills-matter-2",
            image: "/image (5).png",
            category: "Communication",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "How to Stay Motivated During a Job Search",
            slug: "stay-motivated-job-search-2",
            image: "/image (6).png",
            category: "Lifestyle",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "From Training to Placement: Your Step-by-Step Guide",
            slug: "training-to-placement-guide-2",
            image: "/image (7).png",
            category: "Freshers",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "How to Communicate with Confidence at Work",
            slug: "communicate-confidence-work-2",
            image: "/image (8).png",
            category: "Communication",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            title: "Success Stories: How Vedanta Helped Me Find a Job",
            slug: "success-stories-vedanta-2",
            image: "/image (9).png",
            category: "Lifestyle",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        }
    ];

    const filteredBlogs = selectedCategory === 'All Blogs'
        ? blogData
        : blogData.filter(blog => blog.category === selectedCategory);

    // Pagination logic
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Reset to page 1 when category changes
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <>
            <Section className="py-12" sclass="bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <span className="inline-block px-6 py-1.5 border border-gray-900 rounded-full text-sm font-medium text-gray-900 mb-4">
                            LATEST BLOGS
                        </span>
                        <Heading
                            black="Insights & "
                            blue="Guidance"
                            className="text-center mb-6"
                        />
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-start gap-8 mb-10 border-b-2 border-gray-200 pb-0">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`pb-3 text-sm font-medium transition-all relative ${selectedCategory === category
                                    ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-prime'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentBlogs.map((blog, index) => (
                            <motion.div
                                key={blog.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link href={`/blogs/${blog.slug}`}>
                                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer h-full">
                                        <div className="relative h-48">
                                            <Image
                                                src={blog.image}
                                                alt={blog.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="py-4 px-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[56px]">
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
                            </motion.div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredBlogs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No blogs found in this category.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredBlogs.length > 0 && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12">
                            {/* Page Numbers */}
                            {getPageNumbers().map((page, index) => {
                                if (page === '...') {
                                    return (
                                        <span key={`ellipsis-${index}`} className="px-3 text-gray-400">
                                            ...
                                        </span>
                                    );
                                }
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 rounded-full font-medium transition-all ${currentPage === page
                                                ? 'bg-prime text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            {/* Next Button */}
                            {currentPage < totalPages && (
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all ml-2"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </Section>
        </>
    );
}
