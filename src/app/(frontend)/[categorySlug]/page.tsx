import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, listCategories, listScenarios } from '@/lib/queries'
import { getCategoryImagery } from '@/lib/imagery'
import { ScenarioCard } from '@/components/ui/ScenarioCard'
import { CategoryPill } from '@/components/ui/CategoryPill'
import { CtaBlock } from '@/components/ui/CtaBlock'
import { Breadcrumb, breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import { toneVar } from '@/lib/scenario-meta'

// Render on-demand (not build-time SSG) to avoid Supabase pooler exhaustion.
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

type Params = Promise<{ categorySlug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categorySlug } = await params
  const cat = await getCategoryBySlug(categorySlug)
  if (!cat) return {}
  const title = `${cat.name} — Tình huống pháp lý có thật`
  const description =
    cat.description ??
    `Các tình huống pháp lý thường gặp trong nhóm ${cat.name}, kèm phân tích và hướng giải quyết.`
  return {
    title,
    description,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/${cat.slug}` },
  }
}

export default async function CategoryHubPage({ params }: { params: Params }) {
  const { categorySlug } = await params
  const cat = await getCategoryBySlug(categorySlug)
  if (!cat) notFound()

  const [scenarios, allCategories] = await Promise.all([
    listScenarios({ categoryId: cat.id, limit: 60 }),
    listCategories(),
  ])
  const imagery = getCategoryImagery(cat.slug)
  const otherCategories = allCategories.filter((c) => c.slug !== cat.slug).slice(0, 4)

  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: cat.name, href: `/${cat.slug}` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />

      {/* Editorial masthead banner */}
      <section className="relative isolate overflow-hidden border-b border-[color:var(--color-hairline)] bg-[color:var(--color-ink)]">
        {imagery && (
          <>
            <Image
              src={imagery.src}
              alt={imagery.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 mix-blend-multiply opacity-60"
              style={{ background: `linear-gradient(120deg, ${toneVar(imagery.tint)}, transparent 70%)` }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/40 to-[color:var(--color-ink)]/20"
            />
          </>
        )}
        <span className="grain opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 text-[color:var(--color-background)] md:px-6 md:py-20 lg:px-8 lg:py-28">
          <Breadcrumb items={crumbs} tone="light" />
          <ScrollReveal>
            <p className="kicker mt-7 !text-[color:var(--color-secondary)]">Chủ đề pháp lý</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-6xl">
              {cat.name}
            </h1>
            {cat.description && (
              <p className="pull-quote mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-background)]/90 md:text-xl">
                {cat.description}
              </p>
            )}
            <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-background)]/70">
              {scenarios.length > 0 ? `${scenarios.length} tình huống` : 'Sắp cập nhật'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Scenario grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
        {scenarios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StaggerReveal staggerDelay={0.06} className="contents">
              {scenarios.map((s, i) => (
                <ScenarioCard key={String(s.id)} scenario={s} index={i + 1} />
              ))}
            </StaggerReveal>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[color:var(--color-secondary)] bg-[color:var(--color-surface-strong)] p-12 text-center">
            <p className="text-[color:var(--color-text-secondary)]">
              Tình huống đang được biên soạn. Bạn có vấn đề cụ thể? Gửi câu hỏi cho luật sư.
            </p>
          </div>
        )}
      </section>

      {/* Related categories */}
      {otherCategories.length > 0 && (
        <section className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]/50">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16 lg:px-8">
            <ScrollReveal>
              <p className="kicker mb-6">Chủ đề khác</p>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
              <StaggerReveal staggerDelay={0.06} className="contents">
                {otherCategories.map((c) => (
                  <CategoryPill key={c.slug} category={c} variant="card" />
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <CtaBlock
          placement="category"
          scenarioSlug={cat.slug}
          headline={`Tình huống ${cat.name.toLowerCase()} của bạn không có ở đây?`}
          subtext="Mô tả chi tiết tình huống của bạn — luật sư sẽ phân tích và phản hồi trong 30 phút."
        />
      </section>
    </>
  )
}
