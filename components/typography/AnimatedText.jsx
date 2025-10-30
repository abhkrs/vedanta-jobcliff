'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useStagger } from './StaggerContainer';
import { useAnimation } from '../AnimationContext';

const AnimatedText = ({ children, className = '', delay: customDelay, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { delay: autoDelay } = useStagger();
  const { isPageTransitionComplete } = useAnimation();
  const delay = customDelay !== undefined ? customDelay : autoDelay;

  const shouldAnimate = isInView && isPageTransitionComplete;

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, delay: shouldAnimate ? delay : 0, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedText;