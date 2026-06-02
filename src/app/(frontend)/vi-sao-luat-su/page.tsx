import type { Metadata } from 'next'
import { Check, X } from 'lucide-react'
import { breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'
import { PageHero } from '@/components/ui/PageHero'
import { AuthorityGap } from '@/components/ui/AuthorityGap'
import { AuthorityBlock } from '@/components/ui/AuthorityBlock'
import { CtaBlock } from '@/components/ui/CtaBlock'
import ScrollReveal from '@/components/animations/ScrollReveal'
import DrawDivider from '@/components/animations/DrawDivider'
import { getAuthorityManifesto } from '@/lib/queries'
import { WHY_LAWYER_HERO, ONLINE_VS_LAWYER } from '@/content/why-lawyer'

// Render on demand (not at build) so static export doesn't exhaust the shared
// Supabase Session Pooler (15-conn cap). Data is memoized via unstable_cache.
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Vì sao cần luật sư thật, không chỉ là câu trả lời trên mạng',
  description:
    'Google và AI cho bạn câu chữ nghe giống luật — nhưng không chịu trách nhiệm, có thể lỗi thời hoặc bịa đặt, và không hiểu trường hợp riêng của bạn. Vì sao chỉ luật sư có chứng chỉ mới giúp được bạn.',
  alternates: { canonical: '/vi-sao-luat-su' },
}

export default async function WhyLawyerPage() {
  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Vì sao cần luật sư', href: '/vi-sao-luat-su' },
  ]

  // CMS-first; fall back to static constants when the global isn't seeded yet.
  const manifesto = await getAuthorityManifesto()
  const hero = {
    kicker: manifesto?.heroKicker || WHY_LAWYER_HERO.kicker,
    title: manifesto?.heroTitle || WHY_LAWYER_HERO.title,
    lead: manifesto?.heroLead || WHY_LAWYER_HERO.lead,
  }
  const onlinePoints =
    manifesto?.onlinePoints && manifesto.onlinePoints.length > 0
      ? manifesto.onlinePoints.map((p) => p.text ?? '').filter(Boolean)
      : ONLINE_VS_LAWYER.online.points
  const lawyerPoints =
    manifesto?.lawyerPoints && manifesto.lawyerPoints.length > 0
      ? manifesto.lawyerPoints.map((p) => p.text ?? '').filter(Boolean)
      : ONLINE_VS_LAWYER.lawyer.points
  const onlineLabel = manifesto?.onlineLabel || ONLINE_VS_LAWYER.online.label
  const lawyerLabel = manifesto?.lawyerLabel || ONLINE_VS_LAWYER.lawyer.label

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
      <PageHero crumbs={crumbs} kicker={hero.kicker} title={hero.title} lead={hero.lead} />

      {/* The 6 reasons */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <ScrollReveal>
          <p className="kicker mb-3">Khoảng cách quyền uy</p>
          <h2 className="mb-10 max-w-3xl font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] md:text-4xl">
            Sáu điều một câu trả lời miễn phí không thể cho bạn
          </h2>
        </ScrollReveal>
        <DrawDivider className="mb-10" />
        <AuthorityGap />
      </section>

      {/* Online vs lawyer contrast */}
      <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]/50">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
          <ScrollReveal>
            <p className="kicker mb-8">{ONLINE_VS_LAWYER.kicker}</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-7">
              <h3 className="font-display text-xl font-semibold text-[color:var(--color-text-secondary)]">
                {onlineLabel}
              </h3>
              <ul className="mt-5 space-y-3">
                {onlinePoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-[color:var(--color-text-secondary)]">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-alert)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border-2 border-[color:var(--color-primary)]/30 bg-[color:var(--color-surface-strong)] p-7 shadow-[0_18px_50px_rgba(27,23,20,0.08)]">
              <h3 className="font-display text-xl font-semibold text-[color:var(--color-ink)]">
                {lawyerLabel}
              </h3>
              <ul className="mt-5 space-y-3">
                {lawyerPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-[color:var(--color-text-primary)]">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Authority */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <ScrollReveal>
          <AuthorityBlock />
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28 lg:px-8">
        <CtaBlock placement="page" />
      </section>
    </>
  )
}
