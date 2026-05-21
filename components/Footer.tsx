'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, MapPin, ArrowRight, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRegionConfig } from '@/lib/region';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const config = getRegionConfig(locale);

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 md:py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold text-xl mb-4 text-white">Hyde Media</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('about')}
            </p>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">{t('solutions')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${locale}/scaffolding`} className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('scaffoldingAds')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('locations')}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">{t('company')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${locale}/about`} className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cases`} className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('cases')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partners`} className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('partnerProgram')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">{t('contactInfo')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                <a href="mailto:ma@hydemedia.dk" className="text-slate-300 hover:text-white transition-colors">
                  ma@hydemedia.dk
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                <a href="tel:+4552761185" className="text-slate-300 hover:text-white transition-colors">
                  +45 52 76 11 85
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                <span className="text-slate-300">{config.address}</span>
              </li>
              <li className="flex gap-3 items-start">
                <Instagram className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                <a 
                  href="https://www.instagram.com/hyde.med" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  @hyde.med
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-slate-200">
            <p className="text-slate-200">&copy; {currentYear} Hyde Media. Alle rettigheder forbeholdes.</p>
            <span className="hidden md:inline text-slate-600">|</span>
            <p className="text-slate-300">CVR: 45377393</p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0 text-slate-200">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t('privacy')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t('terms')}</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
