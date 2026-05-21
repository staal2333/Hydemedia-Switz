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
      {
        source: '/de/geruestwerbung-basel',
        destination: '/de/services',
        permanent: true,
      },
      // Danish-only pages: redirect /de/ versions to /de/services
      {
        source: '/de/scaffolding',
        destination: '/de/services',
        permanent: true,
      },
      {
        source: '/de/tilladelse',
        destination: '/de/services',
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
      {
        source: '/de/pricing',
        destination: '/de/partners',
        permanent: true,
      },
      {
        source: '/de/brands',
        destination: '/de/partners',
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
