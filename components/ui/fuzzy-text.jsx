"use client";

import { useEffect, useRef } from "react";

export default function FuzzyText({ 
  text, 
  className = "", 
  duration = 2000,
  animateOnInView = true 
}) {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const originalText = text;
    let iteration = 0;

    const animate = () => {
      element.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= originalText.length) {
        return;
      }

      iteration += 1 / 3;
      setTimeout(animate, 30);
    };

    const startAnimation = () => {
      iteration = 0;
      animate();
    };

    if (animateOnInView) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(element);

      return () => observer.disconnect();
    } else {
      setTimeout(startAnimation, 100);
    }
  }, [text, animateOnInView]);

  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
}