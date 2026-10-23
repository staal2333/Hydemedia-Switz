const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Experimental features for better performance
  // Workaround for framer-motion + Next 14.2 React Client Manifest bug
  transpilePackages: ['framer-motion'],

  experimental: {
    missingSuspenseWithCSRBailout: false,
    optimizePackageImports: ['lucide-react'],
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Permanent redirects (301)
  async redirects() {
    return [
      // Withdrawn case studies go back to the cases index.
      {
        source: '/:locale(en|de)/cases/olc-brand-awareness',
        destination: '/:locale/cases',
        permanent: true,
      },
      // Consolidated cases route — case-studies & portfolio retired in favor of /cases
      {
        source: '/case-studies',
        destination: '/cases',
        permanent: true,
      },
      {
        source: '/case-studies/:slug*',
        destination: '/cases/:slug*',
        permanent: true,
      },
      {
        source: '/:locale(da|en|de)/case-studies',
        destination: '/:locale/cases',
        permanent: true,
      },
      {
        source: '/:locale(da|en|de)/case-studies/:slug*',
        destination: '/:locale/cases/:slug*',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/cases',
        permanent: true,
      },
      {
        source: '/:locale(da|en|de)/portfolio',
        destination: '/:locale/cases',
        permanent: true,
      },
      // Old homepage URLs
      {
        source: '/home',
        destination: '/de',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/de',
        permanent: true,
      },
      // Fix for audit: /solutions should redirect to /services
      {
        source: '/da/solutions',
        destination: '/da/services',
        permanent: true,
      },
      {
        source: '/en/solutions',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: '/de/services',
        permanent: true,
      },
      // Danish URL slugs → English slugs (for SEO auditors testing Danish URLs)
      {
        source: '/da/kontakt',
        destination: '/da/contact',
        permanent: true,
      },
      {
        source: '/da/om-os',
        destination: '/da/about',
        permanent: true,
      },
      {
        source: '/da/ydelser',
        destination: '/da/services',
        permanent: true,
      },
      {
        source: '/da/loesninger',
        destination: '/da/services',
        permanent: true,
      },
      {
        source: '/da/privatlivspolitik',
        destination: '/da/privacy',
        permanent: true,
      },
      {
        source: '/da/servicevilkaar',
        destination: '/da/terms',
        permanent: true,
      },
      // German URL slugs → English slugs (for Swiss domain)
      {
        source: '/de/kontakt',
        destination: '/de/contact',
        permanent: true,
      },
      {
        source: '/de/ueber-uns',
        destination: '/de/about',
        permanent: true,
      },
      {
        source: '/de/dienstleistungen',
        destination: '/de/services',
        permanent: true,
      },
      {
        source: '/de/loesungen',
        destination: '/de/services',
        permanent: true,
      },
      {
        source: '/de/datenschutz',
        destination: '/de/privacy',
        permanent: true,
      },
      {
        source: '/de/nutzungsbedingungen',
        destination: '/de/terms',
        permanent: true,
      },
      {
        source: '/de/referenzen',
        destination: '/de/cases',
        permanent: true,
      },
      {
        source: '/de/solutions',
        destination: '/de/services',
        permanent: true,
      },
      // Swiss pages moved to hydemedia.ch — redirect remnants to services
      {
        source: '/de/geruestwerbung-zurich',
        destination: '/de/services',
        permanent: true,
      },
      {
        source: '/de/geruestwerbung-zuerich',
        destination: '/de/services',
        permanent: true,
      },
      // Retired Danish-slug pages: redirect /de/ versions to /de/services.
      // NOTE: /de/scaffolding is a real Swiss product page — do NOT redirect it.
      {
        source: '/:locale(de|en)/tilladelse',
        destination: '/:locale/services',
        permanent: true,
      },
      {
        source: '/de/stilladsreklamer-koebenhavn',
        destination: '/de/services',
        permanent: true,
      },
      {
        source: '/de/stilladsreklamer-aarhus',
        destination: '/de/services',
        permanent: true,
      },
      {
        source: '/de/facadereklame-koebenhavn',
        destination: '/de/services',
        permanent: true,
      },
      {
        source: '/de/facadereklame-aarhus',
        destination: '/de/services',
        permanent: true,
      },
      // No public price list: prices are quoted per campaign.
      { source: '/:locale(de|en)/pricing', destination: '/:locale/property-owners', permanent: true },
      // /partners duplicated /property-owners and competed with it in search.
      { source: '/:locale(de|en)/partners', destination: '/:locale/property-owners', permanent: true },
      // English posts now share the German slugs, so the language switch lands on the same article.
      { source: '/en/blog/effective-ooh-advertising-strategies-2026', destination: '/en/blog/effektive-ooh-werbestrategien-2026', permanent: true },
      { source: '/en/blog/scaffolding-vs-facade-which-is-right', destination: '/en/blog/geruest-vs-fassade-richtige-wahl', permanent: true },
      { source: '/en/blog/measuring-ooh-campaign-success', destination: '/en/blog/ooh-kampagnenerfolg-messen', permanent: true },
      { source: '/en/blog/creative-best-practices-ooh', destination: '/en/blog/kreative-best-practices-aussenwerbung', permanent: true },
      { source: '/en/blog/zurich-high-traffic-locations-guide', destination: '/en/blog/zuerich-standorte-aussenwerbung', permanent: true },
      { source: '/en/blog/basel-vs-zurich-advertising', destination: '/en/blog/basel-vs-zuerich-aussenwerbung', permanent: true },
      // Danish-locale remnants from before the Swiss site had its own repo.
      { source: '/da', destination: '/de', permanent: true },
      { source: '/da/:path*', destination: '/de/:path*', permanent: true },
      // One address per page. The i18n middleware sends "/" and paths without a
      // locale on with a 307, which Google treats as temporary and so keeps
      // "/", "/about" and "/contact" indexed beside "/de/...". These run before
      // the middleware and make the move permanent. Files (anything with a dot),
      // framework paths and the generated share image are left alone. Last in
      // the list, so the specific redirects above win.
      { source: '/', destination: '/de', permanent: true },
      {
        source: '/:path((?!de$|de/|en$|en/|da$|da/|api/|_next/|_vercel/|images/|docs/|draco/|video/|data/|opengraph-image)[^.]*)',
        destination: '/de/:path',
        permanent: true,
      },
    ];
  },
  
  // Headers for better caching and security
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    const longCache = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ];
    return [
      // Asset caching — PRODUCTION ONLY.
      // In dev, `next dev` serves chunks at stable URLs (no content hash), so an
      // "immutable" 1-year cache freezes old JS/images in the browser and hides
      // every code change. Only apply long-lived caching for production builds.
      ...(isProd
        ? [
            // Image caching
            {
              source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
              locale: false,
              headers: longCache,
            },
            // Static assets caching
            {
              source: '/_next/static/:path*',
              headers: longCache,
            },
            // Font caching
            {
              source: '/:all*(woff|woff2|ttf|otf|eot)',
              locale: false,
              headers: longCache,
            },
          ]
        : []),
      // Security headers
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
