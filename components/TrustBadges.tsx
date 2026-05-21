'use client';

import { Shield, Clock, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function TrustBadges() {
  const t = useTranslations('trustBadges');
  
  const badges = [
    {
      icon: Shield,
      textKey: 'cvr.text',
      subtextKey: 'cvr.subtext',
    },
    {
      icon: Clock,
      textKey: 'response.text',
      subtextKey: 'response.subtext',
    },
    {
      icon: Award,
      textKey: 'quality.text',
      subtextKey: 'quality.subtext',
    },
    {
      icon: CheckCircle,
      textKey: 'allInclusive.text',
      subtextKey: 'allInclusive.subtext',
    },
  ];

  return (
    <section className="py-12 bg-white/50 border-y border-sky-200/50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <badge.icon className="w-8 h-8 md:w-10 md:w-10 text-blue-600 mb-3" />
              <div className="font-semibold text-slate-900 text-sm md:text-base mb-1">
                {t(badge.textKey)}
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                {t(badge.subtextKey)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
