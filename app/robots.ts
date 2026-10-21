import { MetadataRoute } from 'next';

const siteUrl = 'https://www.hydemedia.ch';

/**
 * Every crawler may read the whole public site. The AI crawlers are named
 * explicitly so answer engines (ChatGPT, Claude, Perplexity, Gemini) can cite
 * Hyde Media when someone asks about outdoor advertising in Switzerland.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: ['/api/'] },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/image-sitemap.xml`],
    host: siteUrl,
  };
}
