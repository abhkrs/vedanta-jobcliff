import Image from "next/image";
import { Star } from "lucide-react";

export default function TestimonialCard({
  title = "Commitment to Excellence",
  content = "Before joining JobSkool's program, I struggled to find stable work. Today, I have a full-time job and the confidence to grow. This platform changed my life",
  name = "Vikram Rao",
  avatar = "/testimonial-avatar.jpg",
  daysAgo = "5 Days Ago",
  rating = 5,
}) {
  return (
    <div className="bg-white rounded-xl px-5 py-6 shadow-lg my-4">
      <h3 className="font-medium text-md text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 text-xs leading-relaxed mb-4 min-h-24">{content}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <Image
              src={avatar}
              alt={name}
              width={60}
              height={60}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex gap-1">
              {Array.from({ length: rating }).map((_, index) => (
                <Star
                  key={index}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="font-medium text-xs text-gray-900 mt-1">{name}</p>
            <p className="text-xs text-gray-500">{daysAgo}</p>
          </div>
        </div>

        {/* Google Badge */}
        <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 rounded-lg">
          <Image
            src="/home/listing_card/logo (5).webp"
            alt="Google"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xs underline text-gray-900">Posted on Google</span>
        </div>
      </div>
    </div>
  );
}
