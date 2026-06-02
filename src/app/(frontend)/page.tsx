import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Phone, ShieldCheck } from 'lucide-react'
import { listCategories, listScenarios, getHomepage } from '@/lib/queries'
import { LTT, getCategoryImagery } from '@/lib/imagery'
import { HOTLINE_TEL, HOTLINE_PRETTY } from '@/lib/cta'
import { ScenarioCard } from '@/components/ui/ScenarioCard'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { CtaBlock } from '@/components/ui/CtaBlock'
import { ProcessSteps } from '@/components/ui/ProcessSteps'
import { AuthorityBlock } from '@/components/ui/AuthorityBlock'
import { AuthorityGap } from '@/components/ui/AuthorityGap'
import CategoryIndex, { type IndexCategory } from '@/components/ui/CategoryIndex'
import Accordion from '@/components/ui/Accordion'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import ScrollHeading from '@/components/animations/ScrollHeading'
import StatCounter from '@/components/animations/StatCounter'
import Marquee from '@/components/animations/Marquee'
import DrawDivider from '@/components/animations/DrawDivider'
import { PROCESS_INTRO } from '@/content/process'
import { TESTIMONIALS } from '@/content/testimonials'
import { ALL_FAQS } from '@/content/faqs'

export const revalidate = 3600

const UTILITY_SLUGS = ['co-nen-kien-khong', 'can-chuan-bi-gi']

/** Editorial defaults — used when the CMS `homepage` global leaves a field blank. */
const HERO_FALLBACK = {
  kicker: 'Luật sư thật · Trách nhiệm thật',
  headline: 'Câu trả lời miễn phí không chịu trách nhiệm.',
  highlight: 'Luật sư thật thì có.',
  subhead:
    'Mỗi vụ việc một khác. Gọi luật sư Apolo để được tư vấn đúng trường hợp của bạn — buổi đầu miễn phí, bảo mật tuyệt đối.',
  ctaLabel: `Gọi ngay ${HOTLINE_PRETTY}`,
}
const TRUST_FALLBACK = ['Buổi đầu miễn phí', 'Trích dẫn điều luật', 'Bảo mật tuyệt đối']
const TICKER_FALLBACK = [
  'Hàng xóm lấn ranh đất',
  'Vợ/chồng giấu tài sản khi ly hôn',
  'Đối tác nợ tiền hàng kéo dài',
  'Cổ đông nhỏ bị gạt khỏi công ty',
  'Mua nhà giấy tay không sổ đỏ',
  'Giành quyền nuôi con',
  'Chủ đầu tư chậm bàn giao căn hộ',
]

function mediaUrl(m: unknown): string | null {
  if (!m) return null
  if (typeof m === 'string') return m
  if (typeof m === 'number') return null // unpopulated upload id — no URL available
  const doc = m as { url?: string | null; sizes?: { hero?: { url?: string | null } | null } | null }
  return doc.sizes?.hero?.url ?? doc.url ?? null
}

export default async function HomePage() {
  const [categories, allScenarios, homepage] = await Promise.all([
    listCategories(),
    listScenarios({ limit: 100 }),
    getHomepage().catch(() => null),
  ])

  const hp = homepage ?? {}
  const hero = {
    kicker: hp.heroKicker || HERO_FALLBACK.kicker,
    headline: hp.heroHeadline || HERO_FALLBACK.headline,
    highlight: hp.heroHighlight || HERO_FALLBACK.highlight,
    subhead: hp.heroSubhead || HERO_FALLBACK.subhead,
    ctaLabel: hp.heroCtaLabel || HERO_FALLBACK.ctaLabel,
    image: mediaUrl(hp.heroImage) || LTT.heroPrimary,
  }
  const pickText = (arr: unknown): string[] =>
    Array.isArray(arr)
      ? (arr.map((x) => (x as { text?: string | null })?.text).filter(Boolean) as string[])
      : []
  const trustBadges: string[] = pickText(hp.trustBadges).length
    ? pickText(hp.trustBadges)
    : TRUST_FALLBACK
  const ticker: string[] = pickText(hp.ticker).length ? pickText(hp.ticker) : TICKER_FALLBACK

  const featured = allScenarios.filter((s) => s.featured)
  const pool = featured.length > 0 ? featured : allScenarios
  const spotlight = pool[0]
  const moreFeatured = pool.slice(1, 7)
  const latest = allScenarios.slice(0, 6)
  const urgent = allScenarios.filter((s) => s.urgencyLevel === 'high').slice(0, 3)

  const scenarioCategories = categories.filter((c) => !UTILITY_SLUGS.includes(c.slug))
  const utilityCategories = categories.filter((c) => UTILITY_SLUGS.includes(c.slug))

  const indexCategories: IndexCategory[] = scenarioCategories.map((c) => {
    const img = getCategoryImagery(c.slug)
    return {
      slug: c.slug,
      name: c.name,
      description: c.description,
      icon: c.icon,
      color: c.color,
      imageSrc: img?.src,
      imageAlt: img?.alt,
    }
  })

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative isolate overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-background)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-primary), transparent 70%)' }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent 70%)' }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-24">
          {/* Image — shown on every breakpoint (mobile-first), order-first on small screens */}
          <ScrollReveal className="relative order-1 lg:order-2" y={20}>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-xl shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:aspect-[16/10] lg:aspect-[4/5] lg:max-w-none">
              <Image
                src={hero.image}
                alt="Luật sư Apolo giàu kinh nghiệm tư vấn pháp lý trong văn phòng luật chuyên nghiệp"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-top"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/70 via-transparent to-transparent" />
              {/* Hotline chip replaces the old magazine gimmick */}
              <a
                href={HOTLINE_TEL}
                data-cta="hero-chip"
                className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-lg bg-[color:var(--color-surface-strong)]/95 px-4 py-3 backdrop-blur-sm transition-transform hover:-translate-y-0.5 sm:left-4 sm:right-auto"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[color:var(--color-text-secondary)]">
                    Tổng đài tư vấn
                  </span>
                  <span className="block font-display text-lg font-semibold text-[color:var(--color-ink)]">
                    {HOTLINE_PRETTY}
                  </span>
                </span>
              </a>
            </div>
          </ScrollReveal>

          {/* Copy */}
          <div className="order-2 lg:order-1">
            <p className="kicker !text-[color:var(--color-secondary)]">{hero.kicker}</p>
            <h1 className="mt-5 font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[2.9rem] lg:text-[3.6rem]">
              {hero.headline}{' '}
              <span className="text-[color:var(--color-secondary)]">{hero.highlight}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--color-background)]/75 md:text-lg">
              {hero.subhead}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={HOTLINE_TEL}
                data-cta="hero"
                className="inline-flex items-center justify-center gap-2.5 rounded-md bg-[color:var(--color-primary)] px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-[color:var(--color-alert)]"
              >
                <Phone className="h-5 w-5" /> {hero.ctaLabel}
              </a>
              <Link
                href="/tinh-huong"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[color:var(--color-background)]/25 px-6 py-4 font-medium text-[color:var(--color-background)] transition-colors hover:border-[color:var(--color-secondary)] hover:text-[color:var(--color-secondary)]"
              >
                Đọc tình huống thực tế <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-wider text-[color:var(--color-background)]/65">
              {trustBadges.map((b) => (
                <span key={b} className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--color-accent)]" /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="relative border-t border-[color:var(--color-background)]/10 py-3">
          <Marquee className="text-[color:var(--color-background)]/60">
            {ticker.map((t) => (
              <span key={t} className="flex items-center">
                <span className="px-6 font-mono text-xs uppercase tracking-[0.14em]">{t}</span>
                <span className="text-[color:var(--color-secondary)]">◆</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ============================ STAT BAND ============================ */}
      <section className="border-b border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[color:var(--color-hairline)] px-0 md:grid-cols-4 md:divide-y-0">
          <Stat value={20} suffix="+" label="Năm kinh nghiệm" />
          <Stat value={Math.max(scenarioCategories.length, 4)} label="Chủ đề pháp lý" />
          <Stat value={Math.max(allScenarios.length, 30)} suffix="+" label="Tình huống có thật" />
          <Stat value={30} suffix=" phút" label="Phản hồi tư vấn" />
        </div>
      </section>

      {/* ============================ AUTHORITY GAP ============================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <ScrollReveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="kicker">Vì sao cần luật sư thật</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] md:text-[2.5rem]">
                Câu trả lời miễn phí có thể khiến bạn trả giá đắt
              </h2>
              <p className="mt-3 text-[color:var(--color-text-secondary)]">
                Internet và AI cho bạn câu chữ nghe giống luật. Nhưng câu chữ không phải lời tư vấn —
                và không ai chịu trách nhiệm nếu sai.
              </p>
            </div>
            <Link
              href="/vi-sao-luat-su"
              className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-primary)]"
            >
              Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
        <AuthorityGap />
      </section>

      {/* ============================ FEATURED ============================ */}
      <section id="stories" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <ScrollReveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Câu chuyện trong tuần</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--color-ink)] md:text-[2.5rem]">
                Tình huống được tìm đọc nhiều nhất
              </h2>
            </div>
            <Link
              href="/tinh-huong"
              className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-primary)]"
            >
              Tất cả tình huống <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        {spotlight ? (
          <ScrollReveal delay={0.05}>
            <FeatureCard scenario={spotlight} />
          </ScrollReveal>
        ) : (
          <EmptyScenariosNotice />
        )}

        {moreFeatured.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StaggerReveal staggerDelay={0.08} className="contents">
              {moreFeatured.map((s, i) => (
                <ScenarioCard key={String(s.id)} scenario={s} index={i + 1} />
              ))}
            </StaggerReveal>
          </div>
        )}
      </section>

      {/* ============================ CATEGORY INDEX ============================ */}
      <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]/50">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <ScrollReveal>
            <div className="mb-10 max-w-2xl">
              <p className="kicker">Chủ đề pháp lý</p>
              <ScrollHeading
                as="h2"
                text="Tình huống của bạn thuộc nhóm nào?"
                className="mt-3 font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] md:text-[2.5rem]"
              />
              <p className="mt-3 text-[color:var(--color-text-secondary)]">
                Bốn nhóm chính bao trùm hầu hết vấn đề pháp lý người Việt thường gặp — cùng hai công
                cụ giúp bạn quyết định.
              </p>
            </div>
          </ScrollReveal>

          <CategoryIndex categories={indexCategories} />

          {utilityCategories.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {utilityCategories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-6 transition-all hover:border-[color:var(--color-primary)]/40 hover:shadow-lg"
                  >
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[color:var(--color-ink)] group-hover:text-[color:var(--color-primary)]">
                        {c.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-[color:var(--color-text-secondary)]">
                        {c.description}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-[color:var(--color-primary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ============================ HOW IT WORKS ============================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <ScrollReveal>
          <div className="mb-4 max-w-2xl">
            <p className="kicker">{PROCESS_INTRO.kicker}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] md:text-[2.5rem]">
              {PROCESS_INTRO.title}
            </h2>
            <p className="mt-3 text-[color:var(--color-text-secondary)]">{PROCESS_INTRO.lead}</p>
          </div>
        </ScrollReveal>
        <DrawDivider className="mb-10" />
        <ProcessSteps />
      </section>

      {/* ============================ URGENT STRIP ============================ */}
      {urgent.length > 0 && (
        <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]/50">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
            <ScrollReveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-alert)]" />
                <p className="kicker !text-[color:var(--color-alert)]">Tình huống cần hành động</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <StaggerReveal staggerDelay={0.08} className="contents">
                {urgent.map((s) => (
                  <ScenarioCard key={String(s.id)} scenario={s} />
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>
      )}

      {/* ============================ AUTHORITY ============================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <ScrollReveal>
          <AuthorityBlock />
        </ScrollReveal>
      </section>

      {/* ============================ TESTIMONIALS ============================ */}
      <section className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]/50">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <ScrollReveal>
            <p className="kicker mb-3">Phản hồi tiêu biểu</p>
            <h2 className="mb-10 max-w-3xl font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] md:text-[2.5rem]">
              Người đọc thường bắt đầu giống bạn
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StaggerReveal staggerDelay={0.1} className="contents">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.author}
                  className="flex flex-col rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-7"
                >
                  <span className="font-display text-5xl leading-none text-[color:var(--color-secondary)]">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-[color:var(--color-text-primary)]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-[color:var(--color-hairline)] pt-4">
                    <p className="font-display font-semibold text-[color:var(--color-ink)]">
                      {t.author}
                    </p>
                    <p className="font-mono text-[0.68rem] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
                      {t.context}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ============================ FAQ TEASER ============================ */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <ScrollReveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="kicker">Hỏi & Đáp</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--color-ink)] md:text-4xl">
                Câu hỏi thường gặp
              </h2>
            </div>
            <Link
              href="/hoi-dap"
              className="link-underline hidden whitespace-nowrap text-sm font-medium text-[color:var(--color-primary)] sm:inline"
            >
              Tất cả câu hỏi →
            </Link>
          </div>
        </ScrollReveal>
        <Accordion items={ALL_FAQS.slice(0, 5)} />
      </section>

      {/* ============================ END CTA ============================ */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28 lg:px-8">
        <ScrollReveal>
          <CtaBlock placement="homepage" />
        </ScrollReveal>
      </section>
    </>
  )
}

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="px-3 py-9 text-center md:py-11">
      <p className="font-display text-4xl font-semibold text-[color:var(--color-primary)] md:text-5xl">
        <StatCounter value={value} suffix={suffix} />
      </p>
      <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[color:var(--color-text-secondary)]">
        {label}
      </p>
    </div>
  )
}

function EmptyScenariosNotice() {
  return (
    <div className="rounded-lg border border-dashed border-[color:var(--color-secondary)] bg-[color:var(--color-surface-strong)] p-12 text-center">
      <p className="text-[color:var(--color-text-secondary)]">
        Các tình huống đầu tiên đang được biên soạn. Quay lại sớm — hoặc{' '}
        <Link
          href="/lien-he"
          className="font-medium text-[color:var(--color-primary)] underline-offset-4 hover:underline"
        >
          gửi câu hỏi trực tiếp cho luật sư
        </Link>
        .
      </p>
    </div>
  )
}
