'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AliceCarousel = dynamic(() => import('react-alice-carousel'), {
  ssr: false
});

export default function Slider({ slides, slidesPerView = { mobile: 1, tablet: 2, desktop: 3 } }) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const responsive = {
    0: { items: slidesPerView.mobile },
    768: { items: slidesPerView.tablet },
    1024: { items: slidesPerView.desktop },
  };

  // Calculate total number of slide groups
  const totalSlides = Math.ceil(slides.length / slidesPerView.desktop);

  const handleSlideChanged = (e) => {
    setActiveIndex(e.item);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="custom-slider relative w-full">
      <AliceCarousel
        ref={carouselRef}
        items={slides}
        responsive={responsive}
        controlsStrategy="responsive"
        disableDotsControls
        disableButtonsControls
        infinite
        autoPlay={false}
        mouseTracking
        touchTracking
        onSlideChanged={handleSlideChanged}
      />

      {/* Custom Navigation Wrapper */}
      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center gap-4 bg-white rounded-full p-2 shadow-md">
          {/* Previous Button */}
          <button
            onClick={() => carouselRef.current?.slidePrev()}
            className="text-gray-800 hover:text-prime transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
          </button>

          {/* Dots Container */}
          <div className="flex items-center">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 transition-all duration-300 ${
                  Math.floor(activeIndex / slidesPerView.desktop) === index
                    ? 'w-12 bg-prime'
                    : 'w-12 bg-prime/20'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => carouselRef.current?.slideNext()}
            className="text-gray-800 hover:text-prime transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
