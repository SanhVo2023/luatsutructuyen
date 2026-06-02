'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Scale, Phone } from 'lucide-react'
import { APOLO } from '@/config/apolo'
import { HOTLINE_TEL, HOTLINE_PRETTY } from '@/lib/cta'
import { getCategoryImagery } from '@/lib/imagery'
import { MobileNavDrawer } from './MobileNavDrawer'

type Cat = { slug: string; name: string }

const NAV_LINKS = [
  { href: '/goc-luat-su', label: 'Góc Luật Sư' },
  { href: '/vi-sao-luat-su', label: 'Vì sao cần luật sư' },
  { href: '/hoi-dap', label: 'Hỏi & Đáp' },
  { href: '/ve-chung-toi', label: 'Về chúng tôi' },
]

export function HeaderClient({
  scenarioCategories,
  utilityCategories,
  dateLabel,
}: {
  scenarioCategories: Cat[]
  utilityCategories: Cat[]
  dateLabel: string
}) {
  const [scrolled, setScrolled] = useState(false)
  const vn = APOLO.vn

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40">
      {/* Top strip — masthead colophon */}
      <div
        className={`hidden bg-[color:var(--color-ink)] text-[color:var(--color-background)]/80 transition-all duration-300 md:block ${
          scrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 lg:px-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em]">
            Tạp chí tình huống pháp lý · {dateLabel}
          </p>
          <div className="flex items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
            <a
              href={`tel:${vn.callCenter.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[color:var(--color-secondary)]"
            >
              <Phone className="h-3 w-3" /> {vn.callCenter}
            </a>
            <a
              href="https://zalo.me/apololawyers"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[color:var(--color-secondary)]"
            >
              Zalo OA
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b backdrop-blur transition-all duration-300 ${
          scrolled
            ? 'border-[color:var(--color-hairline)] bg-[color:var(--color-background)]/90 shadow-[0_1px_20px_rgba(27,23,20,0.06)]'
            : 'border-transparent bg-[color:var(--color-background)]/80'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 md:px-6 lg:px-8 ${
            scrolled ? 'h-14' : 'h-[4.5rem]'
          }`}
        >
          {/* Wordmark */}
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="inline-grid h-9 w-9 place-items-center rounded-sm bg-[color:var(--color-primary)] text-white">
              <Scale className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="font-display text-lg font-semibold leading-none tracking-tight text-[color:var(--color-ink)]">
              Luật Sư Trực Tuyến
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-sm lg:flex">
            {/* Mega-menu trigger */}
            <div className="group relative">
              <button className="flex items-center gap-1 py-2 font-medium text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-primary)]">
                Tình huống
                <span className="text-[color:var(--color-text-secondary)] transition-transform group-hover:rotate-180">
                  ▾
                </span>
              </button>
              {/* Mega panel */}
              <div className="invisible absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] shadow-[0_20px_60px_rgba(27,23,20,0.14)]">
                  <div className="grid grid-cols-2 gap-px bg-[color:var(--color-hairline)]">
                    {scenarioCategories.map((c, i) => {
                      const img = getCategoryImagery(c.slug)
                      return (
                        <Link
                          key={c.slug}
                          href={`/${c.slug}`}
                          className="group/item flex items-center gap-3 bg-[color:var(--color-surface-strong)] p-4 transition-colors hover:bg-[color:var(--color-surface)]"
                        >
                          <span className="index-num text-xs text-[color:var(--color-secondary)]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-display font-medium text-[color:var(--color-ink)] group-hover/item:text-[color:var(--color-primary)]">
                            {c.name}
                          </span>
                          {img && <span className="sr-only">{img.alt}</span>}
                        </Link>
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-[color:var(--color-ink)] px-4 py-3">
                    {utilityCategories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/${c.slug}`}
                        className="font-mono text-[0.7rem] uppercase tracking-wider text-[color:var(--color-background)]/80 transition-colors hover:text-[color:var(--color-secondary)]"
                      >
                        {c.name} →
                      </Link>
                    ))}
                    <Link
                      href="/tinh-huong"
                      className="font-mono text-[0.7rem] uppercase tracking-wider text-[color:var(--color-secondary)]"
                    >
                      Tất cả tình huống →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-underline font-medium text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-primary)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile */}
          <div className="flex items-center gap-2.5">
            {/* Mobile: compact one-tap call */}
            <a
              href={HOTLINE_TEL}
              data-cta="header-mobile"
              aria-label={`Gọi ${HOTLINE_PRETTY}`}
              className="inline-grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-primary)] text-white transition-colors hover:bg-[color:var(--color-alert)] md:hidden"
            >
              <Phone className="h-5 w-5" />
            </a>
            {/* Desktop: full label */}
            <a
              href={HOTLINE_TEL}
              data-cta="header"
              className="hidden items-center gap-1.5 rounded-sm bg-[color:var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[color:var(--color-alert)] md:inline-flex"
            >
              <Phone className="h-4 w-4" />
              Gọi {HOTLINE_PRETTY}
            </a>
            <MobileNavDrawer
              scenarioCategories={scenarioCategories}
              utilityCategories={utilityCategories}
              navLinks={NAV_LINKS}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
