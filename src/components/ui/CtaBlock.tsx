import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'
import { HOTLINE_PRETTY, HOTLINE_TEL, ZALO_URL } from '@/lib/cta'

/**
 * Conversion CTA — drives a phone call to the Apolo hotline (the site's single
 * funnel). Primary action is click-to-call; secondary is "request a callback"
 * (the /lien-he form) and Zalo chat.
 *
 * `placement`/`scenarioSlug` are accepted for call-site compatibility + future
 * analytics tagging (data attributes) but no longer build an external URL.
 */
type Placement = 'article-end' | 'homepage' | 'category' | 'inline' | 'page'

export function CtaBlock({
  scenarioSlug,
  placement = 'article-end',
  variant = 'panel',
  headline,
  subtext,
}: {
  scenarioSlug?: string
  placement?: Placement
  variant?: 'panel' | 'inline'
  headline?: string
  subtext?: string
}) {
  const tag = scenarioSlug ? `${placement}-${scenarioSlug}` : placement

  if (variant === 'inline') {
    return (
      <aside className="my-8 rounded-lg border-l-[3px] border-[color:var(--color-secondary)] bg-[color:var(--color-surface)] p-5">
        <p className="text-sm text-[color:var(--color-text-primary)]">
          Tình huống của bạn có chi tiết riêng mà một bài viết không thể thấy hết.{' '}
          <a
            href={HOTLINE_TEL}
            data-cta={tag}
            className="font-semibold text-[color:var(--color-primary)] underline-offset-4 hover:underline"
          >
            Gọi luật sư Apolo: {HOTLINE_PRETTY}
          </a>{' '}
          để được tư vấn đúng trường hợp của mình.
        </p>
      </aside>
    )
  }

  return (
    <section className="relative overflow-hidden rounded-lg bg-[color:var(--color-ink)] p-8 text-[color:var(--color-background)] md:p-14">
      <span className="grain opacity-30" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-primary), transparent 70%)' }}
      />
      <div className="relative max-w-2xl">
        <p className="kicker text-[color:var(--color-secondary)]">Tư vấn cùng luật sư thật</p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
          {headline ?? 'Đừng để một câu trả lời miễn phí quyết định cả vụ việc của bạn'}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[color:var(--color-background)]/75 md:text-lg">
          {subtext ??
            'Luật sư Apolo Lawyers nghe trường hợp cụ thể của bạn và tư vấn có trách nhiệm — phản hồi nhanh, buổi đầu miễn phí, bảo mật tuyệt đối.'}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={HOTLINE_TEL}
            data-cta={tag}
            className="group inline-flex items-center justify-center gap-3 rounded-sm bg-[color:var(--color-primary)] px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-[color:var(--color-alert)]"
          >
            <Phone className="h-5 w-5" strokeWidth={2} />
            Gọi ngay {HOTLINE_PRETTY}
          </a>
          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/lien-he"
              className="font-medium text-[color:var(--color-background)]/85 underline-offset-4 hover:text-[color:var(--color-secondary)] hover:underline"
            >
              Yêu cầu gọi lại
            </Link>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-[color:var(--color-background)]/85 hover:text-[color:var(--color-secondary)]"
            >
              <MessageCircle className="h-4 w-4" /> Zalo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
