'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getRegionConfig } from '@/lib/region';

export default function ContactInfo() {
  const t = useTranslations('contact.info');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const config = getRegionConfig(locale);
  const isSwiss = config.region === 'ch';

  const contactItems = [
    {
      icon: Mail,
      label: t('email'),
      value: config.email,
      href: `mailto:${config.email}`,
    },
    {
      icon: Phone,
      label: t('phone'),
      value: config.phone,
      href: `tel:${config.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: t('locations'),
      value: isSwiss ? 'Basel' : 'Copenhagen & Aarhus',
      href: null,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          {t('title')}
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
          {t('description')}
        </p>
      </motion.div>

      <div className="space-y-6">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          const content = (
            <motion.div
              key={item.label}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`flex items-start gap-4 p-6 rounded-xl border-2 border-slate-200 ${
                item.href ? 'hover:border-slate-900 transition-colors duration-300 cursor-pointer' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {item.label}
                </h3>
                <p className="text-xl font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
            </motion.div>
          );

          return item.href ? (
            <a key={item.label} href={item.href} className="block">
              {content}
            </a>
          ) : (
            content
          );
        })}
      </div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-slate-50 rounded-xl p-8 mt-8"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-3">
          {t('responseTime.title')}
        </h3>
        <p className="text-slate-600 leading-relaxed font-light">
          {t('responseTime.description')}
        </p>
      </motion.div>
    </div>
  );
}
