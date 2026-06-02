import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Scale, Clock, ShieldCheck, Users, Lock, FileText, Gavel, Home, Briefcase,
  Banknote, HeartHandshake, ClipboardCheck, AlertTriangle, Search, Phone,
  ArrowRight, Check, type LucideIcon,
} from 'lucide-react'
import { getCategoryBySlug, listCategories, listScenarios } from '@/lib/queries'
import { getCategoryImagery } from '@/lib/imagery'
import { getCategoryLanding, type LandingIcon } from '@/content/category-landing'
import { HOTLINE_TEL, HOTLINE_PRETTY } from '@/lib/cta'
import { ScenarioCard } from '@/components/ui/ScenarioCard'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { CategoryPill } from '@/components/ui/CategoryPill'
import { CtaBlock } from '@/components/ui/CtaBlock'
import Accordion from '@/components/ui/Accordion'
import { Breadcrumb, breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import { toneVar } from '@/lib/scenario-meta'

// Render on-demand (not build-time SSG) to avoid Supabase pooler exhaustion.
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const ICONS: Record<LandingIcon, LucideIcon> = {
  Scale, Clock, ShieldCheck, Users, Lock, FileText, Gavel, Home, Briefcase,
  Banknote, HeartHandshake, ClipboardCheck, AlertTriangle, Search,
}

type Params = Promise<{ categorySlug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categorySlug } = await params
  const cat = await getCategoryBySlug(categorySlug)
  if (!cat) return {}
  const landing = getCategoryLanding(cat.slug)
  const title = `${cat.name} — Tình huống pháp lý có thật`
  const description = cat.description ?? landing.heroSub
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
  const landing = getCategoryLanding(cat.slug)
  const imagery = getCategoryImagery(cat.slug)
  const otherCategories = allCategories.filter((c) => c.slug !== cat.slug).slice(0, 4)

  const spotlight = scenarios.find((s) => s.featured) ?? scenarios[0]
  const rest = scenarios.filter((s) => s.id !== spotlight?.id)

  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: cat.name, href: `/${cat.slug}` },
  ]
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: landing.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
      <JsonLd data={faqJsonLd} />

      {/* ============================ HERO ============================ */}
      <section className="relative isolate overflow-hidden bg-[color:var(--color-ink)]">
        {imagery && (
          <>
            <Image
              src={imagery.src}
              alt={imagery.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 mix-blend-multiply opacity-70"
              style={{ background: `linear-gradient(120deg, ${toneVar(imagery.tint)}, transparent 72%)` }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/55 to-[color:var(--color-ink)]/25"
            />
          </>
        )}
        <span className="grain opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 text-[color:var(--color-background)] md:px-6 md:py-20 lg:px-8 lg:py-24">
          <Breadcrumb items={crumbs} tone="light" />
          <div className="mt-7 max-w-3xl">
            <p className="kicker !text-[color:var(--color-secondary)]">
              {cat.name} · {scenarios.length > 0 ? `${scenarios.length} tình huống` : 'Sắp cập nhật'}
            </p>
            <h1 className="mt-4 font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.01em] sm:text-4xl lg:text-[3.4rem]">
              {landing.heroHook}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-background)]/80 md:text-lg">
              {landing.heroSub}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={HOTLINE_TEL}
                data-cta="category-hero"
                className="inline-flex items-center justify-center gap-2.5 rounded-md bg-[color:var(--color-primary)] px-7 py-3.5 font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-[color:var(--color-alert)]"
              >
                <Phone className="h-5 w-5" /> Gọi luật sư: {HOTLINE_PRETTY}
              </a>
              <Link
                href="#tinh-huong"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[color:var(--color-background)]/25 px-6 py-3.5 font-medium text-[color:var(--color-background)] transition-colors hover:border-[color:var(--color-secondary)] hover:text-[color:var(--color-secondary)]"
              >
                Xem các tình huống <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ VALUE PROPS ============================ */}
      <section className="border-b border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px md:grid-cols-3">
          <StaggerReveal staggerDelay={0.08} className="contents">
            {landing.valueProps.map((vp) => {
              const Icon = ICONS[vp.icon] ?? Scale
              return (
                <div key={vp.title} className="flex gap-4 px-4 py-8 md:px-8 md:py-10">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[color:var(--color-ink)]">{vp.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">{vp.body}</p>
                  </div>
                </div>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ============================ WORRIES + CTA ============================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ScrollReveal>
            <p className="kicker">Tình huống của bạn</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] md:text-4xl">
              {landing.worriesTitle}
            </h2>
            <ul className="mt-8 space-y-px overflow-hidden rounded-xl border border-[color:var(--color-hairline)]">
              {landing.worries.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-3 bg-[color:var(--color-surface-strong)] px-5 py-4 text-[color:var(--color-text-primary)]"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-secondary)]" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-2xl bg-[color:var(--color-ink)] p-8 text-[color:var(--color-background)] md:p-10">
              <span className="grain opacity-25" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
                style={{ background: 'radial-gradient(circle, var(--color-primary), transparent 70%)' }}
              />
              <div className="relative">
                <p className="kicker !text-[color:var(--color-secondary)]">Đừng tự đoán</p>
                <p className="mt-4 font-display text-2xl font-semibold leading-snug md:text-[1.7rem]">
                  Mỗi vụ việc có chi tiết riêng quyết định kết quả. Gọi luật sư thật để được tư vấn
                  đúng trường hợp của bạn.
                </p>
                <a
                  href={HOTLINE_TEL}
                  data-cta="category-worries"
                  className="mt-7 inline-flex items-center gap-2.5 rounded-md bg-[color:var(--color-primary)] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[color:var(--color-alert)]"
                >
                  <Phone className="h-5 w-5" /> Gọi ngay {HOTLINE_PRETTY}
                </a>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.66rem] uppercase tracking-wider text-[color:var(--color-background)]/65">
                  <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[color:var(--color-accent)]" /> Buổi đầu miễn phí</span>
                  <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[color:var(--color-accent)]" /> Bảo mật tuyệt đối</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================ SCENARIOS ============================ */}
      <section id="tinh-huong" className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]/50 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <ScrollReveal>
            <p className="kicker">Tình huống thực tế</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] md:text-4xl">
              Câu chuyện {cat.name.toLowerCase()} có thật
            </h2>
          </ScrollReveal>

          {scenarios.length > 0 ? (
            <div className="mt-10 space-y-8">
              {spotlight && (
                <ScrollReveal delay={0.05}>
                  <FeatureCard scenario={spotlight} />
                </ScrollReveal>
              )}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <StaggerReveal staggerDelay={0.06} className="contents">
                    {rest.map((s, i) => (
                      <ScenarioCard key={String(s.id)} scenario={s} index={i + 1} />
                    ))}
                  </StaggerReveal>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-[color:var(--color-secondary)] bg-[color:var(--color-surface-strong)] p-12 text-center">
              <p className="text-[color:var(--color-text-secondary)]">
                Tình huống đang được biên soạn. Bạn có vấn đề cụ thể?{' '}
                <a href={HOTLINE_TEL} className="font-semibold text-[color:var(--color-primary)] underline-offset-4 hover:underline">
                  Gọi luật sư: {HOTLINE_PRETTY}
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <ScrollReveal>
          <p className="kicker">Hỏi & Đáp</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--color-ink)] md:text-4xl">
            {landing.faqTitle}
          </h2>
        </ScrollReveal>
        <div className="mt-8">
          <Accordion items={landing.faqs} />
        </div>
      </section>

      {/* ============================ RELATED ============================ */}
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

      {/* ============================ CTA ============================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <CtaBlock
          placement="category"
          scenarioSlug={cat.slug}
          headline={`Tình huống ${cat.name.toLowerCase()} của bạn không có ở đây?`}
          subtext="Mô tả chi tiết tình huống của bạn — luật sư sẽ lắng nghe và tư vấn đúng trường hợp. Buổi đầu miễn phí, bảo mật tuyệt đối."
        />
      </section>
    </>
  )
}
