'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight, Phone, Clock } from 'lucide-react';
import { getRegionConfig } from '@/lib/region';

interface UrgencyCTAProps {
  title: string;
  subtitle: string;
  primaryText: string;
  secondaryText?: string;
  showUrgency?: boolean;
}

export default function UrgencyCTA({ 
  title, 
  subtitle, 
  primaryText, 
  secondaryText,
  showUrgency = true 
}: UrgencyCTAProps) {
  const locale = useLocale();
  const config = getRegionConfig(locale);
  const isSwiss = config.region === 'ch';

  const defaultSecondaryText = locale === 'da' ? 'Ring Nu' : locale === 'de' ? 'Jetzt anrufen' : 'Call Now';

  const urgencyText = locale === 'da' 
    ? 'Få svar inden for 24 timer' 
    : locale === 'de'
    ? 'Antwort innerhalb von 24 Stunden'
    : 'Get response within 24 hours';

  const contactLine = isSwiss
    ? `📞 ${config.phone} • 📧 ${config.email}`
    : `📞 52 76 11 85 • 📧 ${config.email} • 🏢 CVR: 45377393`;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {showUrgency && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full mb-6">
              <Clock className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-blue-100">
                {urgencyText}
              </span>
            </div>
          )}
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {title}
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-2xl hover:scale-105"
            >
              {primaryText} <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <a
              href={`tel:${config.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              <Phone className="mr-2 w-5 h-5" /> {secondaryText || defaultSecondaryText}
            </a>
          </div>
          
          <p className="text-white/70 mt-8 text-sm">
            {contactLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
