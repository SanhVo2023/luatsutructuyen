import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { CtaBlock } from '@/components/ui/CtaBlock'
import Accordion from '@/components/ui/Accordion'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { getFaqs } from '@/lib/queries'
import { FAQ_GROUPS } from '@/content/faqs'

// Render on demand (not at build) so static export doesn't exhaust the shared
// Supabase Session Pooler (15-conn cap). Data is memoized via unstable_cache.
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/** Fixed group order + titles for /hoi-dap (matches Faqs collection categories). */
const FAQ_CATEGORY_ORDER: { id: string; title: string }[] = [
  { id: 'dich-vu', title: 'Về dịch vụ' },
  { id: 'chi-phi', title: 'Về chi phí' },
  { id: 'quy-trinh', title: 'Về quy trình' },
  { id: 'bao-mat', title: 'Về bảo mật' },
]

export const metadata: Metadata = {
  title: 'Hỏi & Đáp — Câu hỏi thường gặp',
  description:
    'Giải đáp các thắc mắc thường gặp về tư vấn pháp lý: chi phí, quy trình, thời gian phản hồi và bảo mật thông tin tại Luật Sư Trực Tuyến.',
  alternates: { canonical: '/hoi-dap' },
}

export default async function FaqPage() {
  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Hỏi & Đáp', href: '/hoi-dap' },
  ]

  // CMS-first; fall back to static constants when the collection isn't seeded yet.
  const docs = await getFaqs()
  const groups =
    docs.length > 0
      ? FAQ_CATEGORY_ORDER.map((cat) => ({
          id: cat.id,
          title: cat.title,
          items: docs
            .filter((d) => d.category === cat.id)
            .map((d) => ({ q: d.question, a: d.answer })),
        })).filter((g) => g.items.length > 0)
      : FAQ_GROUPS.map((g) => ({ id: g.id, title: g.title, items: g.items }))

  const allFaqs = groups.flatMap((g) => g.items)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs, SITE_URL), faqJsonLd]} />
      <PageHero
        crumbs={crumbs}
        kicker="Hỏi & Đáp"
        title="Câu hỏi thường gặp"
        lead="Những điều người đọc thường băn khoăn trước khi hỏi luật sư — về chi phí, quy trình, thời gian và bảo mật."
      />

      <div className="mx-auto max-w-3xl space-y-14 px-4 py-14 md:px-6 md:py-20 lg:px-8">
        {groups.map((group) => (
          <section key={group.id}>
            <ScrollReveal>
              <h2 className="mb-2 font-display text-2xl font-semibold text-[color:var(--color-ink)] md:text-3xl">
                {group.title}
              </h2>
            </ScrollReveal>
            <Accordion items={group.items} />
          </section>
        ))}
      </div>

      <section className="mx-auto max-w-3xl px-4 pb-20 md:px-6 md:pb-28 lg:px-8">
        <CtaBlock
          placement="page"
          headline="Không tìm thấy câu trả lời?"
          subtext="Gửi câu hỏi cụ thể của bạn — luật sư Apolo Lawyers phản hồi trong 30 phút, miễn phí buổi đầu."
        />
      </section>
    </>
  )
}
