'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { getRegionConfig } from '@/lib/region';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const config = getRegionConfig(locale);

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const availableLocales = config.locales;
  const localeLabels: Record<string, string> = {
    da: 'DA',
    en: 'EN',
    de: 'DE',
  };

  return (
    <div className="flex items-center space-x-1">
      {availableLocales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            locale === loc
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {localeLabels[loc] || loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
