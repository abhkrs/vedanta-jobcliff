"use client";
import Image from "next/image";

const logos = [
  "/home/logo (1).webp",
  "/home/logo (2).webp",
  "/home/logo (3).webp",
  "/home/logo (4).webp",
  "/home/logo (5).webp",
  "/home/logo (6).webp",
  "/home/logo (7).webp",
];

const animationDuration = logos.length * 2;

export default function LogoSlider() {
  return (
    <div className="relative overflow-hidden w-full mt-8 group">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll var(--scroll-duration) linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex">
        <div
          className="flex shrink-0 animate-scroll"
          style={{ "--scroll-duration": `${animationDuration}s` }}
        >
          {/* First set with right margin */}
          <div className="flex gap-3 mr-3">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-30 h-16 relative bg-white rounded-md overflow-hidden"
              >
                <Image src={logo} fill alt="logo" className="object-contain" />
              </div>
            ))}
          </div>
          {/* Second set with right margin */}
          <div className="flex gap-3 mr-3" aria-hidden="true">
            {logos.map((logo, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 w-30 h-16 relative bg-white rounded-md overflow-hidden"
              >
                <Image
                  src={logo}
                  fill
                  alt="logo"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/80 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
