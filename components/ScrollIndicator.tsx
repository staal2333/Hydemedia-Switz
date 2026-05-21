'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-1 bg-charcoal-100/20 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600"
        style={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
