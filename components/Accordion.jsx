'use client'
import { memo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@/components/AnimationContext';

const AccordionItem = memo(({ item, originalIndex, isOpen, onToggle, delay, arrowColor = 'blue' }) => {
    const { isPageTransitionComplete } = useAnimation();
    
    const arrowColorClass = arrowColor === 'green' ? 'bg-sec' : 'bg-prime';
    
    return (
        <motion.div
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={isPageTransitionComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: isPageTransitionComplete ? delay : 0, duration: 0.6 }}
        >
            <motion.button
                onClick={() => onToggle(originalIndex)}
                className="w-full flex items-center justify-between p-4 text-left sm:pl-6"
            >
                <span className="text-sm md:text-base font-medium text-gray-900 pr-4">
                    {item.question}
                </span>
                <motion.div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${arrowColorClass} text-white`}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronDown size={18} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            className="px-4 pb-4 text-sm sm:px-6"
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {item.answer}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

AccordionItem.displayName = 'AccordionItem';

export default function Accordion({ data, openIndex, onToggle, arrowColor = 'blue' }) {
    const leftColumn = data.filter((_, index) => index % 2 === 0);
    const rightColumn = data.filter((_, index) => index % 2 === 1);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
                {leftColumn.map((item, index) => {
                    const originalIndex = data.indexOf(item);
                    return (
                        <AccordionItem
                            key={originalIndex}
                            item={item}
                            originalIndex={originalIndex}
                            isOpen={openIndex === originalIndex}
                            onToggle={onToggle}
                            delay={index * 0.1}
                            arrowColor={arrowColor}
                        />
                    );
                })}
            </div>

            <div className="space-y-6">
                {rightColumn.map((item, index) => {
                    const originalIndex = data.indexOf(item);
                    return (
                        <AccordionItem
                            key={originalIndex}
                            item={item}
                            originalIndex={originalIndex}
                            isOpen={openIndex === originalIndex}
                            onToggle={onToggle}
                            delay={(index + leftColumn.length) * 0.1}
                            arrowColor={arrowColor}
                        />
                    );
                })}
            </div>
        </div>
    );
}
