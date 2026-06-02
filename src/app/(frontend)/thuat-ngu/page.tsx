import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { CtaBlock } from '@/components/ui/CtaBlock'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { getGlossaryTerms } from '@/lib/queries'
import { GLOSSARY } from '@/content/glossary'

// Render on demand (not at build) so static export doesn't exhaust the shared
// Supabase Session Pooler (15-conn cap). Data is memoized via unstable_cache.
export const dynamic = 'force-dynamic'

type GlossaryEntry = { term: string; slug: string; definition: string; seeAlso: string[] }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Thuật ngữ pháp lý',
  description:
    'Giải nghĩa các thuật ngữ pháp lý thường gặp bằng ngôn ngữ dễ hiểu: thời hiệu khởi kiện, hòa giải, hợp đồng vô hiệu, sổ đỏ, án phí và nhiều hơn nữa.',
  alternates: { canonical: '/thuat-ngu' },
}

export default async function GlossaryPage() {
  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Thuật ngữ pháp lý', href: '/thuat-ngu' },
  ]

  // CMS-first; fall back to static constants when the collection isn't seeded yet.
  const docs = await getGlossaryTerms()
  const terms: GlossaryEntry[] =
    docs.length > 0
      ? docs.map((d) => ({
          term: d.term,
          slug: d.slug,
          definition: d.definition,
          seeAlso: (d.seeAlso ?? '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        }))
      : GLOSSARY.map((t) => ({
          term: t.term,
          slug: t.slug,
          definition: t.definition,
          seeAlso: t.seeAlso ?? [],
        }))

  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term, 'vi'))
  const bySlug = new Map(terms.map((t) => [t.slug, t.term]))

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Thuật ngữ pháp lý — Luật Sư Trực Tuyến',
    url: `${SITE_URL}/thuat-ngu`,
    hasDefinedTerm: sorted.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      url: `${SITE_URL}/thuat-ngu#${t.slug}`,
    })),
  }

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs, SITE_URL), definedTermSet]} />
      <PageHero
        crumbs={crumbs}
        kicker="Từ điển pháp lý"
        title="Thuật ngữ pháp lý, nói cho dễ hiểu"
        lead="Những từ ngữ pháp lý hay gặp được giải thích bằng ngôn ngữ thường ngày — để bạn đọc tình huống và làm việc với luật sư tự tin hơn."
      />

      <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <ol className="space-y-px overflow-hidden rounded-lg border border-[color:var(--color-hairline)]">
          {sorted.map((t, i) => (
            <li
              key={t.slug}
              id={t.slug}
              className="scroll-mt-28 border-b border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-6 last:border-b-0 md:p-7"
            >
              <ScrollReveal y={20}>
                <div className="flex items-baseline gap-3">
                  <span className="index-num text-sm text-[color:var(--color-secondary)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-xl font-semibold text-[color:var(--color-ink)] md:text-2xl">
                    {t.term}
                  </h2>
                </div>
                <p className="mt-3 leading-relaxed text-[color:var(--color-text-secondary)]">
                  {t.definition}
                </p>
                {t.seeAlso && t.seeAlso.length > 0 && (
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-mono text-[0.66rem] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
                      Xem thêm
                    </span>
                    {t.seeAlso
                      .filter((s) => bySlug.has(s))
                      .map((s) => (
                        <a
                          key={s}
                          href={`#${s}`}
                          className="rounded-sm bg-[color:var(--color-surface)] px-2 py-0.5 text-[color:var(--color-primary)] hover:underline"
                        >
                          {bySlug.get(s)}
                        </a>
                      ))}
                  </p>
                )}
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-[color:var(--color-text-secondary)]">
          Thuật ngữ chỉ mang tính giải thích chung. Với trường hợp cụ thể, hãy{' '}
          <Link href="/lien-he" className="font-medium text-[color:var(--color-primary)] hover:underline">
            hỏi luật sư
          </Link>
          .
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28 lg:px-8">
        <CtaBlock placement="page" />
      </section>
    </>
  )
}
