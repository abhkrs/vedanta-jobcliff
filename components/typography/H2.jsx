'use client';
import AnimatedText from './AnimatedText';

const H2 = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <AnimatedText
      as="h2"
      className={`text-2xl md:text-3xl font-semibold ${className}`}
      delay={delay}
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export default H2;