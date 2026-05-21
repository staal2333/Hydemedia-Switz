'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import FAQContent from '@/components/faq/FAQContent';

export default function FAQPageClient({ locale }: { locale: string }) {
  const t = useTranslations('faq');

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {t('title')}
          </h1>
          <motion.p
            className="mt-4 text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>
        <FAQContent />
      </div>
    </div>
  );
}
