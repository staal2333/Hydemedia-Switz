'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function CTA() {
  const t = useTranslations('home.cta');
  const locale = useLocale();

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-16 text-center shadow-xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
            {t('description')}
          </p>
          <div className="mt-10">
            <Link
              href={`/${locale}/contact`}
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
            >
              {t('button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
