'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

export default function WhyHydeBlowup() {
  const t = useTranslations('home.whyHyde');
  const tTeam = useTranslations('teamSection');
  const locale = useLocale();

  const benefits = [
    'strategicPlacement',
    'professionalInstall',
    'transparentPricing',
    'dedicatedSupport',
    'denmarkCoverage',
  ];

  return (
    <section className="py-24 md:py-40 relative bg-paper">
      
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Team Image - 60% - Clickable */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 relative group"
          >
            <Link href={`/${locale}/about`} className="block">
              {/* Glass morphism frame */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/30 to-sky-400/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 shadow-2xl ring-1 ring-white/50 cursor-pointer">
                {/* Team Photo with blur effect */}
                <Image
                  src="/images/about/Team.png"
                  alt={tTeam('title')}
                  fill
                  loading="lazy"
                  quality={85}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                
                {/* Blur overlay for text prominence */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                
                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    {tTeam('title')}
                  </h3>
                </div>
                
                {/* Hover indicator */}
                <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {locale === 'da' ? 'Klik for at læse mere' : locale === 'de' ? 'Klicken Sie, um mehr zu erfahren' : 'Click to learn more'} →
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Text - 40% */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 uppercase tracking-tight">
              {t('title')}
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              {t('description')}
            </p>

            <ul className="space-y-5 mb-10">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  className="flex items-center text-slate-900 font-semibold text-base md:text-lg"
                >
                  <Check className="w-6 h-6 mr-4 text-slate-900 flex-shrink-0" strokeWidth={2.5} />
                  {t(`benefits.${benefit}`)}
                </motion.li>
              ))}
            </ul>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white font-semibold hover:from-blue-700 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl group"
              >
                {t('cta')}
                <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
