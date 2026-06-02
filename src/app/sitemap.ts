import type { MetadataRoute } from 'next'
import { listCategories, listScenarios, listPosts, type CategoryDoc } from '@/lib/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, scenarios, posts] = await Promise.all([
    listCategories(),
    listScenarios({ limit: 500, status: 'published' }),
    listPosts({ limit: 500, status: 'published' }).catch(() => []),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/tinh-huong`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/goc-luat-su`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/vi-sao-luat-su`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/hoi-dap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/quy-trinh`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/thuat-ngu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/ve-chung-toi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const scenarioEntries: MetadataRoute.Sitemap = scenarios
    .filter((s) => typeof s.category === 'object' && s.category && 'slug' in s.category)
    .map((s) => ({
      url: `${SITE_URL}/${(s.category as CategoryDoc).slug}/${s.slug}`,
      lastModified: s.publishedDate ? new Date(s.publishedDate) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/goc-luat-su/${p.slug}`,
    lastModified: p.publishedDate ? new Date(p.publishedDate) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...categoryEntries, ...scenarioEntries, ...postEntries]
}
