'use client';
import AnimatedText from './AnimatedText';

const H6 = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <AnimatedText
      as="h6"
      className={`text-sm md:text-base font-medium ${className}`}
      delay={delay}
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export default H6;