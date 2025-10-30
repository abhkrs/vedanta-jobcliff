'use client';
import AnimatedText from './AnimatedText';

const H3 = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <AnimatedText
      as="h3"
      className={`text-xl md:text-2xl font-semibold ${className}`}
      delay={delay}
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export default H3;