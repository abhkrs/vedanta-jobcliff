'use client';
import AnimatedText from './AnimatedText';

const H5 = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <AnimatedText
      as="h5"
      className={`text-base md:text-lg font-medium ${className}`}
      delay={delay}
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export default H5;