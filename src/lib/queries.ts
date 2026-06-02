/**
 * Typed wrappers over `getPayload().find()` for the queries the frontend needs.
 *
 * Server-side only — never import into a Client Component.
 * All queries cache via React's request memoization (each request gets a fresh
 * connection, repeat calls inside one request hit the in-process cache).
 */
import 'server-only'
import { unstable_cache } from 'next/cache'
import type { Where } from 'payload'
import { getPayload } from '@/lib/payload'

export type CategoryDoc = {
  id: number | string
  name: string
  slug: string
  description?: string | null
  icon?: string | null
  color?: 'terracotta' | 'clay' | 'olive' | 'rust' | null
  order?: number | null
  heroImage?: MediaDoc | number | null
}

export type MediaDoc = {
  id: number | string
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  sizes?: {
    thumbnail?: { url?: string | null; width?: number | null; height?: number | null }
    card?: { url?: string | null; width?: number | null; height?: number | null }
    hero?: { url?: string | null; width?: number | null; height?: number | null }
    og?: { url?: string | null; width?: number | null; height?: number | null }
  } | null
}

export type AuthorDoc = {
  id: number | string
  name: string
  slug: string
  role?: string | null
  bio?: string | null
  avatar?: MediaDoc | number | null
}

export type ScenarioDoc = {
  id: number | string
  title: string
  slug: string
  hookText: string
  content: string
  tocItems?: Array<{ level: number; label: string; anchor: string }> | null
  category: CategoryDoc | number
  author?: AuthorDoc | number | null
  heroImage?: MediaDoc | number | null
  urgencyLevel?: 'low' | 'medium' | 'high' | null
  outcomeType?: 'negotiation' | 'lawsuit' | 'mediation' | 'mixed' | null
  preparationChecklist?: Array<{ item: string; description?: string | null }> | null
  relatedScenarios?: Array<ScenarioDoc | number> | null
  readingTime?: number | null
  featured?: boolean | null
  publishedDate?: string | null
  status: 'draft' | 'published' | 'archived'
  meta?: { title?: string | null; description?: string | null } | null
}

export type PageDoc = {
  id: number | string
  title: string
  slug: string
  content?: string | null
  heroImage?: MediaDoc | number | null
  status: 'draft' | 'published'
  meta?: { title?: string | null; description?: string | null } | null
}

export type PostDoc = {
  id: number | string
  title: string
  slug: string
  excerpt: string
  content: string
  tocItems?: Array<{ level: number; label: string; anchor: string }> | null
  topic?: 'canh-bao' | 'ai-vs-luat-su' | 'kien-thuc' | 'cap-nhat-luat' | null
  author?: AuthorDoc | number | null
  heroImage?: MediaDoc | number | null
  readingTime?: number | null
  featured?: boolean | null
  publishedDate?: string | null
  status: 'draft' | 'published' | 'archived'
  meta?: { title?: string | null; description?: string | null } | null
}

export type SiteSettingsDoc = {
  siteName: string
  tagline?: string
  defaultSeo?: {
    title?: string | null
    description?: string | null
    ogImage?: MediaDoc | number | null
  }
  contact?: {
    phone?: string
    email?: string
    zaloUrl?: string
    primaryCtaText?: string
    primaryCtaUrl?: string
  }
  analyticsId?: string
  acceptingNewMatters?: boolean
}

export type FaqDoc = {
  id: number | string
  question: string
  answer: string
  category: 'dich-vu' | 'chi-phi' | 'quy-trinh' | 'bao-mat'
  order?: number | null
}

export type GlossaryTermDoc = {
  id: number | string
  term: string
  slug: string
  definition: string
  seeAlso?: string | null
  order?: number | null
}

export type ProcessDoc = {
  kicker?: string | null
  title?: string | null
  lead?: string | null
  steps?: Array<{
    title?: string | null
    body?: string | null
    icon?: 'BookOpen' | 'ClipboardCheck' | 'MessagesSquare' | 'Scale' | null
  }> | null
}

export type AuthorityManifestoDoc = {
  heroKicker?: string | null
  heroTitle?: string | null
  heroLead?: string | null
  reasons?: Array<{
    title?: string | null
    body?: string | null
    icon?: 'ShieldAlert' | 'Scale' | 'Target' | 'Lock' | 'FileWarning' | 'Gavel' | null
  }> | null
  onlineLabel?: string | null
  onlinePoints?: Array<{ text?: string | null }> | null
  lawyerLabel?: string | null
  lawyerPoints?: Array<{ text?: string | null }> | null
}

export type HomepageDoc = {
  heroKicker?: string | null
  heroHeadline?: string | null
  heroHighlight?: string | null
  heroSubhead?: string | null
  heroCtaLabel?: string | null
  heroCtaTel?: string | null
  heroImage?: MediaDoc | number | null
  heroImageCaption?: string | null
  trustBadges?: Array<{ text?: string | null }> | null
  ticker?: Array<{ text?: string | null }> | null
  featuredKicker?: string | null
  featuredHeading?: string | null
  categoriesKicker?: string | null
  categoriesHeading?: string | null
  ctaHeading?: string | null
  ctaSubhead?: string | null
}

export async function listCategories(): Promise<CategoryDoc[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 50,
    depth: 1,
  })
  return res.docs as unknown as CategoryDoc[]
}

export async function getCategoryBySlug(slug: string): Promise<CategoryDoc | null> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return (res.docs[0] as unknown as CategoryDoc) ?? null
}

export async function listScenarios(opts: {
  categoryId?: string | number
  featured?: boolean
  limit?: number
  status?: 'published' | 'draft' | 'archived'
}): Promise<ScenarioDoc[]> {
  const payload = await getPayload()
  const where: Where = {
    status: { equals: opts.status ?? 'published' },
  }
  if (opts.categoryId) where.category = { equals: opts.categoryId }
  if (typeof opts.featured === 'boolean') where.featured = { equals: opts.featured }
  const res = await payload.find({
    collection: 'scenarios',
    where,
    limit: opts.limit ?? 20,
    sort: '-publishedDate',
    depth: 2,
  })
  return res.docs as unknown as ScenarioDoc[]
}

export async function getScenarioBySlug(slug: string): Promise<ScenarioDoc | null> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'scenarios',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (res.docs[0] as unknown as ScenarioDoc) ?? null
}

export async function listPosts(opts: {
  limit?: number
  status?: 'published' | 'draft' | 'archived'
  topic?: string
}): Promise<PostDoc[]> {
  const payload = await getPayload()
  const where: Where = { status: { equals: opts.status ?? 'published' } }
  if (opts.topic) where.topic = { equals: opts.topic }
  const res = await payload.find({
    collection: 'posts',
    where,
    limit: opts.limit ?? 50,
    sort: '-publishedDate',
    depth: 2,
  })
  return res.docs as unknown as PostDoc[]
}

export async function getPostBySlug(slug: string): Promise<PostDoc | null> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (res.docs[0] as unknown as PostDoc) ?? null
}

export async function getPageBySlug(slug: string): Promise<PageDoc | null> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return (res.docs[0] as unknown as PageDoc) ?? null
}

export async function getSiteSettings(): Promise<SiteSettingsDoc | null> {
  const payload = await getPayload()
  const res = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
  return (res as unknown as SiteSettingsDoc) ?? null
}

export async function getFaqs(): Promise<FaqDoc[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'faqs',
    sort: 'order',
    limit: 200,
    depth: 0,
  })
  return res.docs as unknown as FaqDoc[]
}

export async function getGlossaryTerms(): Promise<GlossaryTermDoc[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'glossary-terms',
    sort: 'term',
    limit: 500,
    depth: 0,
  })
  return res.docs as unknown as GlossaryTermDoc[]
}

export async function getProcess(): Promise<ProcessDoc | null> {
  const payload = await getPayload()
  const res = await payload.findGlobal({ slug: 'process', depth: 0 })
  return (res as unknown as ProcessDoc) ?? null
}

export async function getAuthorityManifesto(): Promise<AuthorityManifestoDoc | null> {
  const payload = await getPayload()
  const res = await payload.findGlobal({ slug: 'authority-manifesto', depth: 0 })
  return (res as unknown as AuthorityManifestoDoc) ?? null
}

export async function getHomepage(): Promise<HomepageDoc | null> {
  const payload = await getPayload()
  const res = await payload.findGlobal({ slug: 'homepage', depth: 1 })
  return (res as unknown as HomepageDoc) ?? null
}

export const getCachedCategories = unstable_cache(listCategories, ['categories-list'], {
  revalidate: 3600,
  tags: ['categories'],
})

export const getCachedFaqs = unstable_cache(getFaqs, ['faqs-list'], {
  revalidate: 3600,
  tags: ['faqs'],
})

export const getCachedGlossaryTerms = unstable_cache(getGlossaryTerms, ['glossary-terms-list'], {
  revalidate: 3600,
  tags: ['glossary-terms'],
})

export const getCachedProcess = unstable_cache(getProcess, ['process-global'], {
  revalidate: 3600,
  tags: ['process'],
})

export const getCachedAuthorityManifesto = unstable_cache(
  getAuthorityManifesto,
  ['authority-manifesto-global'],
  { revalidate: 3600, tags: ['authority-manifesto'] },
)

export const getCachedHomepage = unstable_cache(getHomepage, ['homepage-global'], {
  revalidate: 3600,
  tags: ['homepage'],
})
