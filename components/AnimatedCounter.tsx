'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

        // Easing function (easeOutExpo)
        const easeOutExpo = (x: number): number => {
          return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };

        const currentCount = Math.floor(easeOutExpo(progress) * end);
        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, end, duration]);

  const displayValue = decimals > 0 
    ? (count / Math.pow(10, decimals)).toFixed(decimals)
    : count;

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="inline-block"
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}
