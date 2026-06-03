import Link from 'next/link'
import { Phone, Mail, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react'
import { APOLO, parentBrandUrl } from '@/config/apolo'
import { HOTLINE_TEL, HOTLINE_PRETTY } from '@/lib/cta'
import { getCachedCategories } from '@/lib/queries'

export async function SiteFooter() {
  const categories = await getCachedCategories()
  const vn = APOLO.vn
  const currentYear = new Date().getFullYear()

  const explore = [
    { href: '/tinh-huong', label: 'Tất cả tình huống' },
    { href: '/goc-luat-su', label: 'Góc Luật Sư' },
    { href: '/vi-sao-luat-su', label: 'Vì sao cần luật sư' },
    { href: '/hoi-dap', label: 'Hỏi & Đáp' },
    { href: '/quy-trinh', label: 'Quy trình tư vấn' },
    { href: '/thuat-ngu', label: 'Thuật ngữ pháp lý' },
    { href: '/ve-chung-toi', label: 'Về chúng tôi' },
  ]

  return (
    <footer className="relative mt-24 overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-background)]">
      <span className="grain opacity-30" />

      {/* Big editorial sign-off */}
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 md:px-6 lg:px-8 lg:pt-20">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--color-secondary)]">
          Luật Sư Trực Tuyến
        </p>
        <p className="mt-4 max-w-3xl font-display text-3xl font-medium leading-[1.15] text-[color:var(--color-background)] md:text-4xl lg:text-5xl">
          Câu trả lời trên mạng không chịu trách nhiệm cho bạn. Một luật sư thật thì có.
        </p>
        <a
          href={HOTLINE_TEL}
          data-cta="footer"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-primary)] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[color:var(--color-alert)]"
        >
          <Phone className="h-4 w-4" />
          Gọi ngay {HOTLINE_PRETTY}
        </a>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="rule-gold opacity-50" />
      </div>

      {/* Columns */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-12 md:px-6 lg:px-8">
        <div className="space-y-4 md:col-span-5">
          <p className="text-sm leading-relaxed text-[color:var(--color-background)]/70">
            {vn.legalName}
          </p>
          <a
            href={parentBrandUrl('vi')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[color:var(--color-secondary)] hover:underline"
          >
            apolo.com.vn <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="space-y-3 md:col-span-3">
          <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--color-background)]/50">
            Khám phá
          </h4>
          <ul className="space-y-2 text-sm">
            {explore.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="text-[color:var(--color-background)]/80 transition-colors hover:text-[color:var(--color-secondary)]"
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 md:col-span-4">
          <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--color-background)]/50">
            Liên hệ
          </h4>
          <ul className="space-y-3 text-sm text-[color:var(--color-background)]/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-secondary)]" />
              <span>{vn.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 flex-shrink-0 text-[color:var(--color-secondary)]" />
              <a
                href={`tel:${vn.callCenter.replace(/[^\d+]/g, '')}`}
                className="transition-colors hover:text-[color:var(--color-secondary)]"
              >
                {vn.callCenter}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 flex-shrink-0 text-[color:var(--color-secondary)]" />
              <a
                href={`mailto:${vn.email}`}
                className="transition-colors hover:text-[color:var(--color-secondary)]"
              >
                {vn.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 flex-shrink-0 text-[color:var(--color-secondary)]" />
              <a
                href="https://zalo.me/apololawyers"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[color:var(--color-secondary)]"
              >
                Zalo OA
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Colophon bottom bar */}
      <div className="relative border-t border-[color:var(--color-background)]/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-xs text-[color:var(--color-background)]/55 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <p>
            © {currentYear} {vn.shortName}. Mọi quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/chinh-sach-bao-mat" className="hover:text-[color:var(--color-secondary)]">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-[color:var(--color-secondary)]">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
