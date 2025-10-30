"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OwlCarouselWrapper({ children, options = {}, id }) {
  const [mounted, setMounted] = useState(false);
  const carouselId = useRef(
    id || `owl-carousel-${Math.random().toString(36).substr(2, 9)}`
  );

  useEffect(() => {
    // Load jQuery and Owl Carousel
    if (typeof window !== "undefined") {
      window.$ = window.jQuery = require("jquery");
      require("owl.carousel");
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined" && window.$) {
      const $ = window.$;
      const $carousel = $(`#${carouselId.current}`);
      const mergedNav = options.mergedNav === true;

      if ($carousel.length && !$carousel.hasClass("owl-loaded")) {
        $carousel.owlCarousel({
          loop: true,
          margin: 20,
          nav: mergedNav ? true : false,
          dots: true,
          autoplay: false,
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
          ...options,
        });

        // If mergedNav is enabled, create custom navigation
        if (mergedNav) {
          const $wrapper = $carousel.closest(".owl-carousel-wrapper");
          const $nav = $carousel.find(".owl-nav");
          const $dots = $carousel.find(".owl-dots");

          // Hide default nav and dots
          $nav.hide();
          $dots.hide();

          // Create merged nav container with Tailwind classes
          const $mergedContainer = $(
            '<div class="flex justify-center items-center gap-3 mt-6 bg-white rounded-full p-2 shadow-lg max-w-fit mx-auto"></div>'
          );
          const $prevBtn = $(
            '<button class="flex items-center justify-center text-gray-800 hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>'
          );
          const $dotsContainer = $(
            '<div class="flex items-center gap-0 h-1 bg-gray-200 rounded-full overflow-hidden w-32"></div>'
          );
          const $nextBtn = $(
            '<button class="flex items-center justify-center text-gray-800 hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>'
          );

          // Clone dots into merged container with Tailwind classes
          $dots.children().each(function () {
            const $dot = $(
              '<button class="flex-1 h-1 bg-prime opacity-20 hover:opacity-40 transition-opacity border-none p-0 m-0 cursor-pointer rounded-none"></button>'
            );
            $dotsContainer.append($dot);
          });

          // Assemble merged nav
          $mergedContainer.append($prevBtn, $dotsContainer, $nextBtn);
          $wrapper.append($mergedContainer);

          // Set initial active state with opacity
          $dotsContainer
            .find("button")
            .first()
            .removeClass("opacity-20")
            .addClass("opacity-100");

          // Wire up click handlers
          $prevBtn.on("click", () => $carousel.trigger("prev.owl.carousel"));
          $nextBtn.on("click", () => $carousel.trigger("next.owl.carousel"));

          $dotsContainer.find("button").each(function (index) {
            $(this).on("click", () => {
              $carousel.trigger("to.owl.carousel", [index, 300]);
            });
          });

          // Update active state on carousel change
          $carousel.on("changed.owl.carousel", (event) => {
            $dotsContainer
              .find("button")
              .removeClass("opacity-100")
              .addClass("opacity-20");
            const activeIndex = event.item.index % event.item.count;
            $dotsContainer
              .find("button")
              .eq(activeIndex)
              .removeClass("opacity-20")
              .addClass("opacity-100");
          });

          // Also handle initialized event
          $carousel.on("initialized.owl.carousel", () => {
            $dotsContainer
              .find("button")
              .removeClass("opacity-100")
              .addClass("opacity-20");
            $dotsContainer
              .find("button")
              .first()
              .removeClass("opacity-20")
              .addClass("opacity-100");
          });
        }
      }

      return () => {
        if ($carousel.length && $carousel.hasClass("owl-loaded")) {
          $carousel.trigger("destroy.owl.carousel");
          $carousel.removeClass("owl-loaded");
        }
      };
    }
  }, [mounted, children, options]);

  if (!mounted) {
    return null;
  }

  const showNav = options.nav !== false;
  const whiteDots = options.whiteDots === true;
  const mergedNav = options.mergedNav === true;

  return (
    <div
      className={`owl-carousel-wrapper ${showNav ? "show-nav" : ""} ${
        whiteDots ? "white-dots" : ""
      } ${mergedNav ? "merged-nav" : ""}`}
    >
      <style jsx global>{`
        /* Base Owl Carousel Styles */
        .owl-carousel-wrapper .owl-carousel {
          position: relative;
          display: block;
          width: 100%;
          -webkit-tap-highlight-color: transparent;
        }
        .owl-carousel-wrapper .owl-stage {
          position: relative;
          touch-action: manipulation;
          display: flex;
        }
        .owl-carousel-wrapper .owl-stage-outer {
          position: relative;
          overflow: hidden;
        }
        .owl-carousel-wrapper .owl-item {
          position: relative;
          min-height: 1px;
          backface-visibility: hidden;
          tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .owl-carousel-wrapper .owl-item > img {
          display: block;
          width: 100%;
        }

        /* Navigation */
        .owl-carousel-wrapper .owl-nav {
          display: none !important;
        }
        .owl-carousel-wrapper.show-nav .owl-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex !important;
          justify-content: space-between;
          pointer-events: none;
          z-index: 10;
          margin-top: 0;
        }
        .owl-carousel-wrapper.show-nav .owl-nav button {
          pointer-events: all;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--prime) !important;
          color: white !important;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: all 0.3s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: none;
          cursor: pointer;
        }
        .owl-carousel-wrapper.show-nav .owl-nav button:hover {
          background: var(--prime) !important;
          opacity: 0.9;
        }
        .owl-carousel-wrapper.show-nav .owl-nav button.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .owl-carousel-wrapper.show-nav .owl-nav .owl-prev {
          margin-left: -24px;
        }
        .owl-carousel-wrapper.show-nav .owl-nav .owl-next {
          margin-right: -24px;
        }

        /* Dots */
        .owl-carousel-wrapper .owl-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .owl-carousel-wrapper .owl-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .owl-carousel-wrapper .owl-dot span {
          display: none;
        }
        .owl-carousel-wrapper .owl-dot.active {
          border-radius: 9999px;
          background: var(--prime);
        }
        .owl-carousel-wrapper .owl-dot:hover {
          background: #9ca3af;
        }
        .owl-carousel-wrapper .owl-dot.active:hover {
          background: var(--prime);
        }

        /* Merged Nav - Hide default nav and dots */
        .owl-carousel-wrapper.merged-nav .owl-nav {
          display: none !important;
        }
        .owl-carousel-wrapper.merged-nav .owl-dots {
          display: none !important;
        }

        /* White Dots Variant */
        .owl-carousel-wrapper.white-dots .owl-dot {
          background: rgba(255, 255, 255, 0.4);
        }
        .owl-carousel-wrapper.white-dots .owl-dot.active {
          background: white;
        }
        .owl-carousel-wrapper.white-dots .owl-dot:hover {
          background: rgba(255, 255, 255, 0.6);
        }
        .owl-carousel-wrapper.white-dots .owl-dot.active:hover {
          background: white;
        }
      `}</style>
      <div id={carouselId.current} className="owl-carousel owl-theme">
        {children}
      </div>
    </div>
  );
}
