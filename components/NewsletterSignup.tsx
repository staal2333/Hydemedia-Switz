'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'default' | 'minimal' | 'card';
  showIcon?: boolean;
}

export default function NewsletterSignup({ 
  variant = 'default',
  showIcon = true 
}: NewsletterSignupProps) {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(t('invalidEmail'));
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(t('success'));
        setEmail('');
        
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || t('error'));
      }
    } catch (error) {
      setStatus('error');
      setMessage(t('error'));
    }
  };

  // Minimal variant (inline form)
  if (variant === 'minimal') {
    return (
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-4 py-3 rounded-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === 'success' && <CheckCircle2 className="w-4 h-4" />}
            {status !== 'loading' && status !== 'success' && t('button')}
          </button>
        </form>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-2 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
          >
            {message}
          </motion.p>
        )}
      </div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-sky-600 rounded-3xl opacity-20 blur-xl" />
        <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-blue-100">
          <div className="text-center mb-6">
            {showIcon && (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-600 mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
            )}
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {t('title')}
            </h3>
            <p className="text-slate-600">
              {t('description')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-6 py-4 rounded-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
            >
              {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              {status === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {status === 'loading' ? t('loading') : status === 'success' ? t('subscribed') : t('button')}
            </button>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-4 rounded-xl ${
                  status === 'success' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm">{message}</p>
              </motion.div>
            )}
          </form>

          <p className="text-xs text-slate-500 text-center mt-4">
            {t('privacy')}
          </p>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-6">
        {showIcon && (
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          {t('title')}
        </h3>
        <p className="text-slate-600">
          {t('description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-6 py-3 rounded-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === 'success' && <CheckCircle2 className="w-4 h-4" />}
            {status === 'loading' ? t('loading') : status === 'success' ? t('subscribed') : t('button')}
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 p-3 rounded-xl ${
              status === 'success' 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            }`}
          >
            {status === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm">{message}</p>
          </motion.div>
        )}
      </form>

      <p className="text-xs text-slate-500 text-center mt-4">
        {t('privacy')}
      </p>
    </div>
  );
}
