'use client';
import AnimatedText from './AnimatedText';

const P = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <AnimatedText
      as="p"
      className={`text-base leading-relaxed ${className}`}
      delay={delay}
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export default P;