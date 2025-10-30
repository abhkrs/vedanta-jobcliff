"use client"
import Link from "next/link";
import FuzzyText from "@/components/ui/fuzzy-text";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-t from-prime/20 to-white flex items-center justify-center px-4 py-12">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FuzzyText 
            text="404" 
            className="text-[calc(6vw+2rem)] leading-none font-bold text-red-500 mb-4 block"
          />
          <FuzzyText 
            text="Page Not Found!" 
            className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4"
          />
        </motion.div>
        
        <motion.p 
          className="text-gray-600 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved to another location.
        </motion.p>
        
        <motion.div 
          className="space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="border border-prime bg-prime text-white px-6 py-2 rounded-full hover:bg-prime/90 transition-colors font-medium inline-block"
          >
            Go Home
          </Link>
          <Link 
            href="/jobs" 
            className="border border-prime text-prime px-6 py-2 rounded-full hover:bg-prime hover:text-white transition-colors font-medium inline-block"
          >
            Browse Jobs
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}