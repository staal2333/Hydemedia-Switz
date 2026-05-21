'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import casesData from '@/public/data/cases.json';

export default function CaseStudies() {
  const t = useTranslations('cases');
  const locale = useLocale();

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {casesData.map((caseStudy, index) => (
        <motion.div
          key={caseStudy.id}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl hover:border-primary-300 cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
        >
          <Link href={`/${locale}/cases/${caseStudy.slug}`}>
            <div className="grid gap-0 lg:grid-cols-2">
              <motion.div
                className="relative aspect-video bg-slate-100 lg:aspect-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              >
                <Image
                  src={caseStudy.images[0]}
                  alt={`${caseStudy.brand} campaign`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>
              <div className="p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  <motion.span
                    className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-800"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, type: 'spring' }}
                  >
                    {caseStudy.location}
                  </motion.span>
                  <motion.span
                    className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.6, type: 'spring' }}
                  >
                    {caseStudy.type}
                  </motion.span>
                  <motion.span
                    className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.7, type: 'spring' }}
                  >
                    {caseStudy.size}
                  </motion.span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{caseStudy.title}</h2>
                <p className="mt-2 text-sm text-gray-600">Client: {caseStudy.brand}</p>

                <div className="mt-6 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.7 }}
                  >
                    <h3 className="text-sm font-semibold text-gray-900">{t('challenge')}</h3>
                    <p className="mt-1 text-gray-600 line-clamp-3">{caseStudy.challenge}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.8 }}
                  >
                    <h3 className="text-sm font-semibold text-gray-900">{t('solution')}</h3>
                    <p className="mt-1 text-gray-600 line-clamp-3">{caseStudy.solution}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.9 }}
                  >
                    <h3 className="text-sm font-semibold text-gray-900">{t('results')}</h3>
                    <p className="mt-1 text-gray-600 line-clamp-3">{caseStudy.results}</p>
                  </motion.div>
                </div>

                <div className="mt-6 text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center gap-2">
                  {t('readMore') || 'Read full case study'} →
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
