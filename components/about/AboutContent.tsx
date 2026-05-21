'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import CertificationsSection from './CertificationsSection';

export default function AboutContent() {
  const t = useTranslations('about');

  const values = [
    {
      key: 'quality',
      icon: '⭐',
    },
    {
      key: 'reliability',
      icon: '🤝',
    },
    {
      key: 'innovation',
      icon: '💡',
    },
  ];

  const team = [
    {
      key: 'mads',
      image: '/images/about/Mads Final.png',
    },
    {
      key: 'sebastian',
      image: '/images/about/Staal final.png',
    },
    {
      key: 'louis',
      image: '/images/about/Louis final.png',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="space-y-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mission */}
      <motion.section variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900">{t('mission.title')}</h2>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">{t('mission.description')}</p>
      </motion.section>

      {/* Vision */}
      <motion.section variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900">{t('vision.title')}</h2>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">{t('vision.description')}</p>
      </motion.section>

      {/* Values */}
      <motion.section variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900">{t('values.title')}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.key}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="mb-4 text-4xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 + 0.5, type: 'spring', stiffness: 200 }}
              >
                {value.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900">
                {t(`values.${value.key}.title`)}
              </h3>
              <p className="mt-2 text-gray-600">
                {t(`values.${value.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">{t('team.title')}</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t('team.subtitle')}
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.div
              key={member.key}
              className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50">
                <Image
                  src={member.image}
                  alt={t(`team.${member.key}.name`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {t(`team.${member.key}.name`)}
                </h3>
                <p className="text-sm font-medium text-blue-600 mb-3">
                  {t(`team.${member.key}.role`)}
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {t(`team.${member.key}.description`)}
                </p>
                <a
                  href={`mailto:${t(`team.${member.key}.email`)}`}
                  className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:underline">{t(`team.${member.key}.email`)}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certifications & Safety Section */}
      <CertificationsSection />
    </motion.div>
  );
}
