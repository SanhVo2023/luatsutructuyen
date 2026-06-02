import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ClipboardCheck, Clock, CalendarDays, Compass } from 'lucide-react'
import {
  getScenarioBySlug,
  listScenarios,
  type CategoryDoc,
  type MediaDoc,
  type AuthorDoc,
} from '@/lib/queries'
import { getCategoryImagery } from '@/lib/imagery'
import { ArticleBanner } from '@/components/ui/ArticleBanner'
import { Markdown } from '@/components/Markdown'
import { Breadcrumb, breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'
import { CtaBlock } from '@/components/ui/CtaBlock'
import { ScenarioCard } from '@/components/ui/ScenarioCard'
import { EDITORIAL_AUTHOR } from '@/config/apolo'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ReadingProgress from '@/components/article/ReadingProgress'
import ScrollSpyToc from '@/components/article/ScrollSpyToc'
import ShareRow from '@/components/article/ShareRow'
import { urgencyMeta, outcomeMeta, toneVar } from '@/lib/scenario-meta'

// Render on-demand instead of pre-rendering every scenario at build time.
// Build-time SSG had 12+ workers each open a Payload pg pool, exhausting the
// Supabase Session Pooler. force-dynamic renders at request time.
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

type Params = Promise<{ categorySlug: string; scenarioSlug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categorySlug, scenarioSlug } = await params
  const scenario = await getScenarioBySlug(scenarioSlug)
  if (!scenario) return {}
  const cat = scenario.category as CategoryDoc
  if (cat?.slug !== categorySlug) return {}
  const title = scenario.meta?.title ?? scenario.title
  const description = scenario.meta?.description ?? scenario.hookText
  const hero = scenario.heroImage as MediaDoc | null
  const ogUrl = hero?.sizes?.og?.url ?? hero?.url ?? undefined
  return {
    title,
    description,
    alternates: { canonical: `/${cat.slug}/${scenario.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/${cat.slug}/${scenario.slug}`,
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function ScenarioDetailPage({ params }: { params: Params }) {
  const { categorySlug, scenarioSlug } = await params
  const scenario = await getScenarioBySlug(scenarioSlug)
  if (!scenario || scenario.status !== 'published') notFound()

  const cat = scenario.category as CategoryDoc
  if (!cat?.slug) notFound()
  if (cat.slug !== categorySlug) {
    redirect(`/${cat.slug}/${scenario.slug}`)
  }

  const hero = scenario.heroImage as MediaDoc | null
  const fallback = getCategoryImagery(cat.slug)
  // Real image (if any) feeds the OG/social card + JSON-LD; the on-page hero is a
  // unique gradient banner so scenarios never share the same visual.
  const heroUrl = hero?.sizes?.og?.url ?? hero?.url ?? fallback?.src ?? null
  const heroTint = fallback?.tint ?? 'terracotta'
  const author = (scenario.author as AuthorDoc | null) ?? null
  const authorName = author?.name ?? EDITORIAL_AUTHOR.name
  const authorRole = author?.role ?? 'Đội ngũ biên tập pháp lý Apolo Lawyers'
  const urgency = urgencyMeta(scenario.urgencyLevel)
  const outcome = outcomeMeta(scenario.outcomeType)
  const pageUrl = `${SITE_URL}/${cat.slug}/${scenario.slug}`
  const related = (scenario.relatedScenarios ?? []).filter(
    (s): s is NonNullable<typeof s> & { id: number | string; title: string } =>
      typeof s === 'object' && s !== null,
  )

  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: cat.name, href: `/${cat.slug}` },
    { label: scenario.title, href: `/${cat.slug}/${scenario.slug}` },
  ]

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: scenario.title,
    description: scenario.hookText,
    image: heroUrl ? [heroUrl] : undefined,
    datePublished: scenario.publishedDate ?? undefined,
    author: { '@type': 'Organization', name: authorName, url: `${SITE_URL}/ve-chung-toi` },
    publisher: { '@type': 'Organization', name: 'Apolo Lawyers', url: 'https://www.apolo.com.vn' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  }

  return (
    <>
      <ReadingProgress />
      <JsonLd data={[breadcrumbJsonLd(crumbs, SITE_URL), articleJsonLd]} />

      {/* Header */}
      <section className="border-b border-[color:var(--color-hairline)]">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14 lg:px-8">
          <Breadcrumb items={crumbs} />
          <ScrollReveal>
            <Link href={`/${cat.slug}`} className="kicker mt-7" style={{ color: toneVar(heroTint) }}>
              {cat.name}
            </Link>
            <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-[color:var(--color-ink)] md:text-4xl lg:text-[3.1rem]">
              {scenario.title}
            </h1>
            <p className="pull-quote mt-5 text-lg leading-relaxed md:text-xl">
              “{scenario.hookText}”
            </p>

            {/* Byline rail */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[color:var(--color-hairline)] pt-5 font-mono text-[0.72rem] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              <span className="text-[color:var(--color-ink)]">{authorName}</span>
              {scenario.publishedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(scenario.publishedDate).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {scenario.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {scenario.readingTime} phút đọc
                </span>
              )}
              {urgency && (
                <span style={{ color: toneVar(urgency.tone) }}>● {urgency.label}</span>
              )}
              {outcome && (
                <span className="inline-flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5" /> {outcome.label}
                </span>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Hero banner — unique abstract gradient per scenario */}
      <figure className="mx-auto mt-8 max-w-5xl px-4 md:px-6 lg:px-8">
        <ArticleBanner
          seed={scenario.slug}
          label={cat.name}
          showTitle={false}
          className="aspect-[16/9] w-full rounded-xl shadow-[0_20px_60px_rgba(27,23,20,0.12)]"
        />
      </figure>

      {/* Body + TOC */}
      <article className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_240px] lg:px-8">
        <div className="min-w-0">
          <Markdown className="article-body prose prose-lg max-w-none">
            {scenario.content}
          </Markdown>

          <CtaBlock placement="inline" variant="inline" scenarioSlug={scenario.slug} />

          {scenario.preparationChecklist && scenario.preparationChecklist.length > 0 && (
            <aside className="mt-10 rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] p-6 md:p-8">
              <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-[color:var(--color-ink)]">
                <ClipboardCheck className="h-5 w-5 text-[color:var(--color-primary)]" /> Cần chuẩn bị gì
              </h2>
              <ol className="mt-5 space-y-4">
                {scenario.preparationChecklist.map((it, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="index-num grid h-7 w-7 flex-shrink-0 place-items-center rounded-sm bg-[color:var(--color-primary)] text-sm font-medium text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-[color:var(--color-ink)]">{it.item}</p>
                      {it.description && (
                        <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                          {it.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          )}

          {/* Author + share */}
          <div className="mt-10 flex flex-col gap-5 rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-sm bg-[color:var(--color-ink)] font-display text-lg font-semibold text-[color:var(--color-secondary)]">
                {authorName.slice(0, 1)}
              </span>
              <div>
                <p className="font-display font-semibold text-[color:var(--color-ink)]">{authorName}</p>
                <p className="text-sm text-[color:var(--color-text-secondary)]">{authorRole}</p>
              </div>
            </div>
            <ShareRow url={pageUrl} title={scenario.title} />
          </div>

          <div className="mt-10">
            <CtaBlock placement="article-end" scenarioSlug={scenario.slug} />
          </div>
        </div>

        {scenario.tocItems && scenario.tocItems.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <ScrollSpyToc items={scenario.tocItems} />
            </div>
          </aside>
        )}
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]/50">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
            <p className="kicker mb-3">Đọc tiếp</p>
            <h2 className="mb-8 font-display text-2xl font-semibold text-[color:var(--color-ink)] md:text-3xl">
              Tình huống liên quan
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((s) => (
                <ScenarioCard
                  key={String(s.id)}
                  scenario={s as unknown as Parameters<typeof ScenarioCard>[0]['scenario']}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export async function generateStaticParams() {
  const scenarios = await listScenarios({ status: 'published', limit: 200 })
  return scenarios
    .filter((s) => typeof s.category === 'object' && s.category && 'slug' in s.category)
    .map((s) => ({
      categorySlug: (s.category as CategoryDoc).slug,
      scenarioSlug: s.slug,
    }))
}
