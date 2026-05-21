'use client';

import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CloudyBackgroundProps {
  variant?: 'default' | 'light' | 'dark' | 'gradient';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export default function CloudyBackground({ 
  variant = 'default', 
  intensity = 'subtle' 
}: CloudyBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect mobile for performance
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const getBackgroundClass = () => {
    switch (variant) {
      case 'light':
        return 'bg-gradient-to-b from-sky-50 via-blue-50/30 to-white';
      case 'dark':
        return 'bg-gradient-to-b from-slate-50 via-sky-50/40 to-white';
      case 'gradient':
        return 'bg-gradient-to-b from-blue-100/50 via-sky-50/30 to-white';
      default:
        return 'bg-gradient-to-b from-sky-50/50 via-white to-slate-50/30';
    }
  };

  const getOrbOpacity = () => {
    switch (intensity) {
      case 'strong':
        return 'opacity-40';
      case 'medium':
        return 'opacity-25';
      default:
        return 'opacity-15';
    }
  };

  return (
    <>
      {/* Base gradient background */}
      <div className={`fixed inset-0 -z-10 ${getBackgroundClass()}`} />
      
      {/* Subtle grain texture - disabled on mobile for performance */}
      {!isMobile && (
        <div 
          className="fixed inset-0 -z-10 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Animated floating orbs/clouds - STATIC on mobile, animated on desktop */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {isMobile ? (
          // MOBILE: Static orbs (no animation)
          <>
            <div className={`absolute top-0 left-[10%] w-[400px] h-[400px] bg-gradient-to-br from-blue-200/20 to-sky-300/10 rounded-full blur-3xl ${getOrbOpacity()}`} />
            <div className={`absolute top-[60%] right-[10%] w-[350px] h-[350px] bg-gradient-to-br from-sky-200/15 to-blue-200/10 rounded-full blur-3xl ${getOrbOpacity()}`} />
          </>
        ) : (
          // DESKTOP: Animated orbs (reduced from 6 to 3)
          <>
            <motion.div
              className={`absolute top-0 left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-200/30 to-sky-300/20 rounded-full blur-3xl ${getOrbOpacity()}`}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className={`absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-gradient-to-br from-sky-200/25 to-blue-200/15 rounded-full blur-3xl ${getOrbOpacity()}`}
              animate={{
                y: [0, 40, 0],
                x: [0, -25, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />

            <motion.div
              className={`absolute bottom-[10%] right-[10%] w-[550px] h-[550px] bg-gradient-to-br from-sky-100/20 to-blue-50/15 rounded-full blur-3xl ${getOrbOpacity()}`}
              animate={{
                y: [0, 35, 0],
                x: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 6
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
