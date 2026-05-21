import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  domains: [
    {
      domain: 'hydemedia.ch',
      defaultLocale: 'de',
      locales: ['de', 'en'],
    },
    {
      domain: 'www.hydemedia.ch',
      defaultLocale: 'de',
      locales: ['de', 'en'],
    },
    {
      domain: 'localhost:3000',
      defaultLocale: 'de',
    },
  ],
  localePrefix: 'always',
  alternateLinks: true,
  localeDetection: false,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
