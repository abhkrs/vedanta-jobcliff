import React from "react";

export default function HeaderScroll({text}) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 py-2">
      <div className="container">
        <div className="overflow-hidden">
          <p className="text-white font-medium scroll-text whitespace-nowrap">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
