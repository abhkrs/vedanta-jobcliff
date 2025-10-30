'use client';
import AnimatedText from './AnimatedText';

const H1 = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <AnimatedText
      as="h1"
      className={`text-3xl md:text-4xl font-bold ${className}`}
      delay={delay}
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export default H1;