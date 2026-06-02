import type { Metadata } from 'next'
import { Phone, Mail, MessageCircle, MapPin, Clock, ShieldCheck, BadgeCheck } from 'lucide-react'
import { APOLO } from '@/config/apolo'
import { HOTLINE_TEL, HOTLINE_PRETTY } from '@/lib/cta'
import { ContactForm } from '@/components/forms/ContactForm'
import { breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'
import { PageHero } from '@/components/ui/PageHero'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Gọi luật sư Apolo — Tư vấn buổi đầu miễn phí',
  description:
    'Gọi hotline Apolo Lawyers để được luật sư thật tư vấn cho đúng trường hợp của bạn. Buổi đầu miễn phí, bảo mật. Hoặc để lại số, chúng tôi gọi lại.',
  alternates: { canonical: '/lien-he' },
}

export default function LienHePage() {
  const vn = APOLO.vn
  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Liên hệ', href: '/lien-he' },
  ]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />

      <PageHero
        crumbs={crumbs}
        kicker="Nói chuyện với luật sư thật"
        title="Gọi luật sư Apolo"
        lead="Cách nhanh nhất là gọi trực tiếp — luật sư nghe đúng trường hợp của bạn và tư vấn có trách nhiệm. Buổi đầu miễn phí, bảo mật tuyệt đối. Không tiện gọi? Để lại số, chúng tôi gọi lại."
      />

      {/* Primary action — click-to-call */}
      <section className="mx-auto max-w-7xl px-4 pt-10 md:px-6 lg:px-8">
        <a
          href={HOTLINE_TEL}
          data-cta="lienhe-hero"
          className="group flex flex-col items-center justify-between gap-4 rounded-lg bg-[color:var(--color-ink)] p-6 text-[color:var(--color-background)] sm:flex-row md:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-sm bg-[color:var(--color-primary)] text-white">
              <Phone className="h-6 w-6" />
            </span>
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--color-secondary)]">
                Hotline tư vấn
              </p>
              <p className="font-display text-2xl font-semibold md:text-3xl">{HOTLINE_PRETTY}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-primary)] px-6 py-3 font-semibold text-white transition-colors group-hover:bg-[color:var(--color-alert)]">
            <Phone className="h-4 w-4" /> Gọi ngay
          </span>
        </a>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-6 md:p-8">
          <p className="kicker mb-2">Yêu cầu gọi lại</p>
          <h2 className="mb-5 font-display text-2xl font-semibold text-[color:var(--color-ink)]">
            Để lại số, luật sư gọi lại cho bạn
          </h2>
          <ContactForm />
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-6">
            <h2 className="font-display text-lg font-semibold text-[color:var(--color-ink)]">
              Liên hệ trực tiếp
            </h2>
            <ul className="mt-4 space-y-4 text-sm text-[color:var(--color-text-secondary)]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-primary)]" />
                <span>{vn.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-[color:var(--color-primary)]" />
                <a
                  href={`tel:${vn.callCenter.replace(/[^\d+]/g, '')}`}
                  className="hover:text-[color:var(--color-primary)]"
                >
                  {vn.callCenter}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-[color:var(--color-primary)]" />
                <a href={`mailto:${vn.email}`} className="hover:text-[color:var(--color-primary)]">
                  {vn.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 flex-shrink-0 text-[color:var(--color-primary)]" />
                <a
                  href="https://zalo.me/apololawyers"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-[color:var(--color-primary)]"
                >
                  Zalo OA
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-ink)] p-6 text-[color:var(--color-background)]">
            <h2 className="font-display text-lg font-semibold">Cam kết phản hồi</h2>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--color-background)]/80">
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-[color:var(--color-secondary)]" /> Trong vòng 30 phút
                giờ hành chính
              </li>
              <li className="flex items-center gap-2.5">
                <BadgeCheck className="h-4 w-4 text-[color:var(--color-secondary)]" /> Tư vấn ban đầu
                miễn phí
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[color:var(--color-secondary)]" /> Bảo mật tuyệt
                đối
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  )
}
