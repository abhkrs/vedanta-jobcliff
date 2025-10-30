import { ChevronRight } from "lucide-react";

export default function StyleButton({ text, className = "", green = false }) {
  const bgColor = green ? "bg-sec" : "bg-prime";
  const textColor = green ? "text-sec" : "text-prime";

  return (
    <div
      className={`inline-flex items-center p-1 ${bgColor} rounded-full text-white transition-all duration-300 font-medium ${className}`}
    >
      <span
        className={`bg-white py-2 px-6 ${textColor} rounded-full text-center min-w-40`}
      >
        {text}
      </span>
      <ChevronRight size={20} className="mx-2" />
    </div>
  );
}
