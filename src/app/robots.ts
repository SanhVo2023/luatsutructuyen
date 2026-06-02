import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  // AI bots explicitly allowed per CLAUDE.md SEO Requirements (LLM citation surface).
  const aiBots = ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-Web', 'ClaudeBot', 'Google-Extended', 'CCBot']
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
