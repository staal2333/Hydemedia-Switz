'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const t = useTranslations('cookies');
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookies-accepted');
    if (!hasAccepted) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookies-accepted', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-sky-200/50 shadow-2xl p-6 md:p-8">
              <button
                onClick={declineCookies}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <Cookie className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1 pr-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {t('title')}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t('description')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={acceptCookies}
                  className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  {t('accept')}
                </button>
                <button
                  onClick={declineCookies}
                  className="px-6 py-3 rounded-full border-2 border-slate-300 text-slate-700 font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors"
                >
                  {t('decline')}
                </button>
                <a
                  href="/privacy"
                  className="px-6 py-3 rounded-full text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-center justify-center"
                >
                  {t('learnMore')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
