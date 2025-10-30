import { ChevronRight } from "lucide-react";

export default function StyleButtonBlack({ text, className = "",}) {

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full text-white transition-all duration-300 font-medium bg-white`}
    >
      <span
        className={`bg-black py-2 px-6  rounded-full text-center min-w-40`}
      >
        {text}
      </span>
      <ChevronRight size={20} className="mx-2 text-black" />
    </div>
  );
}
