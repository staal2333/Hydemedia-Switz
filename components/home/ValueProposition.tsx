'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function ValueProposition() {
  const t = useTranslations('home.valueProposition');
  const prefersReducedMotion = useReducedMotion();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  // Lazy load video only when section is visible
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before visible
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    { key: 'flexible' },
    { key: 'smart' },
    { key: 'customizable' },
    { key: 'personalization' },
  ];

  return (
    <section className="py-20 md:py-32 lg:py-40 relative overflow-hidden bg-transparent">

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-[1fr,1.3fr] gap-12 lg:gap-16 xl:gap-24">
          
          {/* LEFT: Video - Lazy Loaded */}
          <motion.div
            ref={videoRef}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 shadow-xl sticky top-24">
              {shouldLoadVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/images/about/building-campaign.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-slate-400" />
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Headline + Feature Grid */}
          <div className="space-y-8 lg:space-y-12">
            
            {/* Headline */}
            <motion.h2
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight text-black"
              style={{
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
              }}
            >
              {t('headline')}
            </motion.h2>

            {/* 2x2 Grid of Features */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l border-slate-200"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: prefersReducedMotion ? 0 : 0.3 + (index * 0.08),
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="relative p-6 lg:p-8 xl:p-10 border-r border-b border-slate-200 bg-white hover:bg-slate-50/50 transition-colors duration-300"
                >
                  {/* Title */}
                  <h3 
                    className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mb-3"
                    style={{
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t(`features.${feature.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed"
                    style={{
                      letterSpacing: '0',
                    }}
                  >
                    {t(`features.${feature.key}.description`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
