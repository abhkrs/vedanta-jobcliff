import { Star } from "lucide-react";
import PreloaderLink from "./PreloaderLink";
import Image from "next/image";

export default function CourseCard({
  title,
  image,
  duration,
  salary,
  opportunities,
  rating = 4.5,
  href = "#",
}) {
  return (
    <PreloaderLink href={href} className="block">
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg transition-shadow duration-300 cursor-pointer my-5">
        {/* Image with Rating Badge */}
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={1088}
            height={592}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-gray-800/80 backdrop-blur-sm text-white px-4 py-1 rounded-full flex items-center gap-2 text-md">
            <Star className="w-4 h-4 fill-white text-white" />
            {rating}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 relative pb-12">
          <h3 className="font-bold text-lg text-black mb-3">{title}</h3>
          {/* Course Details */}
          <div className="space-y-2 pe-12 text-gray-900 text-sm">
            <div className="flex items-center justify-start gap-3">
              <Image
                src="/home/course_icon (1).svg"
                alt="Duration"
                width={24}
                height={24}
                className="w-5 h-5 object-contain"
              />
              <span>{duration}</span>
            </div>
            <div className="flex items-center justify-start gap-3">
              <Image
                src="/home/course_icon (2).svg"
                alt="Salary"
                width={24}
                height={24}
                className="w-5 h-5 object-contain"
              />
              <span>Get placed with {salary}</span>
            </div>
            <div className="flex items-center justify-start gap-3">
              <Image
                src="/home/course_icon (3).svg"
                alt="Opportunities"
                width={24}
                height={24}
                className="w-5 h-5 object-contain"
              />
              <span>{opportunities}</span>
            </div>
          </div>

          {/* Arrow Button */}
          <div className="absolute bottom-3 right-3">
            <Image
              src="/home/arrow.svg"
              alt="Arrow"
              width={60}
              height={60}
              className="w-12 h-12 object-contain max-w-full"
            />
          </div>
        </div>
      </div>
    </PreloaderLink>
  );
}
