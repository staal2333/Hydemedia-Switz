import { getRequestConfig } from 'next-intl/server';

export const locales = ['de', 'en'] as const;
export const defaultLocale = 'de' as const;

export const routing = {
  locales,
  defaultLocale
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    timeZone: 'Europe/Zurich',
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
