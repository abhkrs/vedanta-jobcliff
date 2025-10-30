'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SplashScreen({ isVisible }) {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      initial={{ y: '-100%' }}
      animate={{ y: isVisible ? 0 : '100%' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Image src="/logo-new.png" alt="Loading" width={300} height={120} />
      </motion.div>
    </motion.div>
  );
}
