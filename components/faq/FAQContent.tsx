'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const faqKeys = [
  'booking', 
  'duration', 
  'pricing', 
  'priceIncludes', 
  'design', 
  'timeline', 
  'permits', 
  'locations', 
  'difference', 
  'measurement', 
  'weather', 
  'targeting', 
  'cancellation', 
  'installation', 
  'brandApproval',
  'reach',
  'materials',
  'support'
];

export default function FAQContent() {
  const t = useTranslations('faq.items');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {faqKeys.map((key, index) => (
        <motion.div
          key={key}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-primary-300"
          variants={itemVariants}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
          >
            <span className="text-lg font-semibold text-gray-900 pr-4">
              {t(`${key}.question`)}
            </span>
            <motion.svg
              className="h-5 w-5 text-gray-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="border-t border-gray-200 p-6">
                  <motion.p
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {t(`${key}.answer`)}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}
