'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Wrench, Users, CheckCircle2, TrendingUp, Shield, Coins, ArrowRight, Sparkles } from 'lucide-react';

export default function SpecialistsAndAudience() {
  const t = useTranslations('home.specialistsAudience');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const specialistBenefits = [
    { icon: Wrench, key: 'consulting' },
    { icon: Users, key: 'experience' },
    { icon: CheckCircle2, key: 'fullSolution' },
  ];

  const brandBenefits = [
    { icon: TrendingUp, key: 'reach' },
    { icon: Shield, key: 'exposure' },
    { icon: CheckCircle2, key: 'creative' },
  ];

  const ownerBenefits = [
    { icon: Coins, key: 'income' },
    { icon: CheckCircle2, key: 'permits' },
    { icon: Shield, key: 'professional' },
  ];

  return (
    <section className="py-24 md:py-32 relative bg-paper-warm">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Specialists Section - Enhanced */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 md:mb-32"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100/90 to-sky-100/90 backdrop-blur-sm rounded-full text-blue-900 font-semibold text-sm mb-6 shadow-lg border border-blue-200/50"
            >
              <Sparkles className="w-4 h-4" />
              Premium Service
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              {t('specialists.title')}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              {t('specialists.description')}
            </p>
          </div>

          {/* Specialist Benefits - New Card Style */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {specialistBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.key}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-sky-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100/50 hover:border-blue-200/50 h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-slate-700 leading-relaxed text-base">
                        {t(`specialists.benefits.${benefit.key}`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Elegant Divider */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-24 md:mb-32"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
          </div>
        </motion.div>

        {/* For Brands & Property Owners - Bold New Design */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('sectionTitle')}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light">
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* For Brands - Premium Card */}
          <motion.div
            id="for-brands"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-sky-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            
            <div className="relative bg-gradient-to-br from-blue-600 to-sky-700 rounded-3xl p-10 md:p-12 shadow-2xl overflow-hidden h-full flex flex-col">
              <div 
                className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
              
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              
              <div className="relative flex-1 flex flex-col">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                  <TrendingUp className="w-10 h-10" />
                  {t('brands.title')}
                </h3>
                <div className="space-y-5 mb-8 flex-1">
                  {brandBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={benefit.key}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-white/90 leading-relaxed text-base font-light">
                          {t(`brands.benefits.${benefit.key}`)}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
                <Link
                  href={`/${locale}/brands`}
                  className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all hover:gap-3 shadow-lg hover:shadow-2xl group-hover:shadow-xl"
                >
                  {tCommon('learnMore')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* For Property Owners - Premium Card */}
          <motion.div
            id="for-property-owners"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-slate-600 to-slate-800 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 md:p-12 shadow-2xl overflow-hidden h-full flex flex-col">
              {/* Texture overlay */}
              <div 
                className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              
              <div className="relative flex-1 flex flex-col">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                  <Coins className="w-10 h-10" />
                  {t('owners.title')}
                </h3>
                <div className="space-y-5 mb-8 flex-1">
                  {ownerBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={benefit.key}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-white/90 leading-relaxed text-base font-light">
                          {t(`owners.benefits.${benefit.key}`)}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
                <Link
                  href={`/${locale}/partners`}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all hover:gap-3 shadow-lg hover:shadow-2xl group-hover:shadow-xl"
                >
                  {tCommon('learnMore')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
