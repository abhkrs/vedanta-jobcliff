import { ArrowRight } from 'lucide-react';
import PreloaderLink from './PreloaderLink';

export default function CertificationCard({ title, subtitle, bgColor, bgImage, href = '#' }) {
  return (
    <div
      className={`relative rounded-2xl p-8 h-64 flex flex-col justify-between overflow-hidden ${bgColor}`}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 text-sm">{subtitle}</p>
      </div>

      {/* Button */}
      <PreloaderLink
        href={href}
        className="relative z-10 inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-300 w-fit"
      >
        Explore Now
        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-black" />
        </span>
      </PreloaderLink>
    </div>
  );
}
