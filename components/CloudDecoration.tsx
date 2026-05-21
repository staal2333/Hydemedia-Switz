'use client';

import { motion } from 'framer-motion';

interface CloudDecorationProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
}

export default function CloudDecoration({
  position = 'top-right',
  size = 'md',
  opacity = 0.3,
}: CloudDecorationProps) {
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <motion.div
      className={`absolute ${positions[position]} ${sizes[size]} pointer-events-none`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [opacity * 0.5, opacity, opacity * 0.7, opacity],
        scale: [0.95, 1, 1.05, 0.95],
        x: [0, 10, -5, 0],
        y: [0, -5, 5, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(147, 197, 253, 0.2) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  );
}
