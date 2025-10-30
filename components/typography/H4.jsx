'use client';
import AnimatedText from './AnimatedText';

const H4 = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <AnimatedText
      as="h4"
      className={`text-lg md:text-xl font-medium ${className}`}
      delay={delay}
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export default H4;