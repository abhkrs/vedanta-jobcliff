'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useStagger } from './StaggerContainer';
import { useAnimation } from '../AnimationContext';

const Button = ({ 
  children, 
  className = '', 
  delay: customDelay, 
  variant = 'primary',
  ...props 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { delay: autoDelay } = useStagger();
  const { isPageTransitionComplete } = useAnimation();
  const delay = customDelay !== undefined ? customDelay : autoDelay;

  const shouldAnimate = isInView && isPageTransitionComplete;

  const variants = {
    primary: 'bg-prime text-white hover:bg-prime/90',
    secondary: 'border-t-2 border-r-2 border-b-0 border-l-0 border-prime text-prime hover:bg-prime hover:text-white',
    outline: 'border border-prime text-prime hover:bg-prime hover:text-white'
  };

  return (
    <motion.button
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, delay: shouldAnimate ? delay : 0, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;