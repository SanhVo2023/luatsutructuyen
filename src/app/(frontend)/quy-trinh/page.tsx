import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, BookOpenCheck, MessageSquareQuote, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { CtaBlock } from '@/components/ui/CtaBlock'
import { ProcessSteps } from '@/components/ui/ProcessSteps'
import { AuthorityBlock } from '@/components/ui/AuthorityBlock'
import ScrollReveal from '@/components/animations/ScrollReveal'
import DrawDivider from '@/components/animations/DrawDivider'
import { getProcess } from '@/lib/queries'
import { PROCESS_INTRO } from '@/content/process'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Quy trình tư vấn — Cách hoạt động',
  description:
    'Từ một câu chuyện pháp lý đến hướng giải quyết rõ ràng: đọc tình huống, chuẩn bị giấy tờ, rồi hỏi luật sư Apolo Lawyers — phản hồi trong 30 phút.',
  alternates: { canonical: '/quy-trinh' },
}

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Biên soạn bởi luật sư',
    body: 'Mọi tình huống do Đội ngũ biên tập Apolo Lawyers thực hiện, đối chiếu pháp luật Việt Nam hiện hành.',
  },
  {
    icon: BookOpenCheck,
    title: 'Trích dẫn điều luật',
    body: 'Mỗi phân tích đi kèm trích dẫn cụ thể từ các bộ luật — bạn biết căn cứ pháp lý, không chỉ ý kiến chung chung.',
  },
  {
    icon: MessageSquareQuote,
    title: 'Tư vấn ban đầu miễn phí',
    body: 'Câu hỏi cụ thể của bạn được luật sư phản hồi trong 30 phút. Bảo mật tuyệt đối.',
  },
]

export default async function ProcessPage() {
  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Quy trình tư vấn', href: '/quy-trinh' },
  ]

  // CMS-first; fall back to static constants when the global isn't seeded yet.
  const proc = await getProcess()
  const kicker = proc?.kicker || PROCESS_INTRO.kicker
  const title = proc?.title || PROCESS_INTRO.title
  const lead = proc?.lead || PROCESS_INTRO.lead

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
      <PageHero crumbs={crumbs} kicker={kicker} title={title} lead={lead} />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <ProcessSteps />
      </section>

      {/* Pillars */}
      <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]/50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
          <ScrollReveal>
            <p className="kicker mb-3">Vì sao tin tưởng</p>
            <h2 className="mb-10 max-w-2xl font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] md:text-4xl">
              Nội dung có căn cứ, tư vấn có trách nhiệm
            </h2>
          </ScrollReveal>
          <DrawDivider className="mb-10" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-sm bg-[color:var(--color-surface)] text-[color:var(--color-primary)]">
                  <p.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-[color:var(--color-ink)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                  {p.body}
                </p>
              </div>
            ))}
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
        <p className="mt-6 text-center text-sm text-[color:var(--color-text-secondary)]">
          Hoặc{' '}
          <Link href="/tinh-huong" className="font-medium text-[color:var(--color-primary)] hover:underline">
            đọc các tình huống <ArrowRight className="inline h-3.5 w-3.5" />
          </Link>{' '}
          để bắt đầu.
        </p>
      </section>
    </>
  )
}
