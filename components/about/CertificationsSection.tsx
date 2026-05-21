'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Award, CheckCircle2 } from 'lucide-react';

export default function CertificationsSection() {
  const t = useTranslations('about.certifications');

  const certifications = [
    {
      key: 'safety',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      key: 'permits',
      icon: FileCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      key: 'quality',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      key: 'compliance',
      icon: CheckCircle2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const standards = [
    'GDPR Compliant Data Processing',
    'Professional Installation Partners',
    'Quality Materials & Printing',
    'Dedicated Customer Support',
    'Transparent Pricing',
    'Fast Turnaround Times',
  ];

  return (
    <motion.section
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Certification Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.key}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className={`${cert.bgColor} ${cert.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
              <cert.icon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t(`${cert.key}.title`)}
            </h3>
            <p className="text-sm text-gray-600">
              {t(`${cert.key}.description`)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Standards & Compliance */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-8 border border-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          {t('standards.title')}
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {standards.map((standard, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 font-medium">{standard}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-200 text-center">
          <p className="text-sm text-gray-600">
            {t('standards.footer')}
          </p>
        </div>
      </motion.div>

      {/* Safety Info */}
      <motion.div
        className="mt-8 bg-white rounded-xl border border-gray-200 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t('safety.title')}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t('safety.description')}
            </p>
            <ul className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{t(`safety.point${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
