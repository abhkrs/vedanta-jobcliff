'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import { MapPin, Clock, IndianRupee, Bookmark, Heart } from "lucide-react";
import PreloaderLink from './PreloaderLink';

export default function JobCarousel({ jobs }) {
    const [isClient, setIsClient] = useState(false);
    const [AliceCarousel, setAliceCarousel] = useState(null);

    useEffect(() => {
        setIsClient(true);
        import('react-alice-carousel').then((mod) => {
            setAliceCarousel(() => mod.default);
        });
        import('react-alice-carousel/lib/alice-carousel.css');
    }, []);
    const responsive = {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
    };

    const items = jobs.map((job) => (
        <div key={job.id} className="px-3">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full my-3">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
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
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                        <MapPin size={14} />
                        {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                        <Clock size={14} />
                        {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                        <IndianRupee size={14} />
                        {job.salary}
                    </span>
                </div>

                <p className="text-xs text-gray-400 mb-3">{job.postedDate}</p>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{job.description}</p>

                <div className="flex gap-3">
                    <PreloaderLink href="/jobs/job-details" className="block w-full">
                        <div className="flex-1 text-center block bg-sec text-white py-3.5 rounded-full hover:bg-sec/90 transition-colors font-medium">
                        Apply Now
                    </div>
                    </PreloaderLink>
                    <button className="w-12 h-12 border border-sec rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors flex-shrink-0">
                        <Heart  size={20} className="text-sec" />
                    </button>
                </div>
            </div>
        </div>
    ));

    if (!isClient || !AliceCarousel) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="px-3">
                        <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
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
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                                    <MapPin size={14} />
                                    {job.location}
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                                    <Clock size={14} />
                                    {job.type}
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-sec/10 text-sec rounded-full text-xs">
                                    <IndianRupee size={14} />
                                    {job.salary}
                                </span>
                            </div>

                            <p className="text-xs text-gray-400 mb-3">{job.postedDate}</p>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{job.description}</p>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-sec text-white py-2.5 rounded-full hover:bg-sec/90 transition-colors font-medium">
                                    Apply Now
                                </button>
                                <button className="w-12 h-12 border border-sec rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors flex-shrink-0">
                                    <Bookmark size={20} className="text-sec" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="job-carousel">
            <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                controlsStrategy="alternate"
                disableButtonsControls
                autoPlay={false}
                infinite={false}
                paddingLeft={0}
                paddingRight={0}
                renderDotsItem={(e) => {
                    return (
                        <button
                            className={`w-2 h-2 rounded-full mx-1 transition-all ${
                                e.isActive ? 'bg-prime w-4' : 'bg-gray-300'
                            }`}
                        />
                    );
                }}
            />
            <style jsx global>{`
                .job-carousel .alice-carousel__dots {
                    margin-top: 12px;
                }
                .job-carousel .alice-carousel__dots-item {
                    width: auto;
                    height: auto;
                    background: transparent;
                }
                .job-carousel .alice-carousel__dots-item:hover {
                    background: transparent;
                }
            `}</style>
        </div>
    );
}
