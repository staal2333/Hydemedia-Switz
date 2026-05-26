import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

// Hyde Media — Funnel Display (loaded via <link> in head — too new for next/font in Next 14.2)
//                + Inter (next/font) + JetBrains Mono (next/font)

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hydemedia.ch'),
  title: {
    default: 'Gerüstwerbung & Fassadenwerbung | Aussenwerbung Schweiz | Hyde Media',
    template: '%s | Hyde Media',
  },
  description: 'Hyde Media – Spezialist für Gerüstwerbung und Fassadenwerbung in Basel, Zürich und der ganzen Schweiz. Professionelle Grossformat-Aussenwerbung von der Gestaltung bis zur Montage.',
  keywords: [
    'Gerüstwerbung',
    'Fassadenwerbung',
    'Aussenwerbung Schweiz',
    'Aussenwerbung Basel',
    'OOH',
    'Grossformat Werbung',
    'Bannerwerbung',
    'Fassadenbanner',
    'Gerüstbanner',
    'Basel',
    'Zürich',
    'Schweiz',
  ],
  authors: [{ name: 'Hyde Media', url: 'https://www.hydemedia.ch' }],
  creator: 'Hyde Media',
  publisher: 'Hyde Media',
  category: 'Outdoor Advertising',
  classification: 'Business',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    alternateLocale: ['en_US'],
    siteName: 'Hyde Media',
    title: 'Gerüstwerbung & Fassadenwerbung | Aussenwerbung Schweiz',
    description: 'Hyde Media – Spezialist für Gerüstwerbung und Fassadenwerbung in Grossformat in der ganzen Schweiz.',
    url: 'https://www.hydemedia.ch',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hyde Media - Aussenwerbung Schweiz',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aussenwerbung Schweiz',
    description: 'Gerüstwerbung und Fassadenwerbung mit maximaler Sichtbarkeit für Marken.',
    images: ['/og-image.jpg'],
    creator: '@HydeMedia',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.hydemedia.ch',
    languages: {
      'de-CH': 'https://www.hydemedia.ch/de',
      'en-US': 'https://www.hydemedia.ch/en',
      'x-default': 'https://www.hydemedia.ch/de',
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  other: {
    'msapplication-TileColor': '#0EA5E9',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Theme and mobile optimization */}
        <meta name="theme-color" content="#0EA5E9" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0369A1" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Hyde Media" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
