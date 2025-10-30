'use client';
import { useRef, useEffect, useState } from 'react';
import './SpotlightCard.css';

const SpotlightCard = ({ children, className = '', spotlightColor = '#0764A720' }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    div.addEventListener('mousemove', handleMouseMove);
    div.addEventListener('focus', handleFocus);
    div.addEventListener('blur', handleBlur);
    div.addEventListener('mouseenter', handleMouseEnter);
    div.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      div.removeEventListener('mousemove', handleMouseMove);
      div.removeEventListener('focus', handleFocus);
      div.removeEventListener('blur', handleBlur);
      div.removeEventListener('mouseenter', handleMouseEnter);
      div.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isFocused]);

  return (
    <div
      ref={divRef}
      className={`spotlight-card ${className}`}
      style={{
        '--spotlight-color': spotlightColor,
        '--spotlight-x': `${position.x}px`,
        '--spotlight-y': `${position.y}px`,
        '--spotlight-opacity': opacity,
      }}
    >
      <div className="spotlight-overlay" />
      <div className="spotlight-content">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
