'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { HOTLINE_TEL, HOTLINE_PRETTY } from '@/lib/cta'

type Item = { slug: string; name: string }
type NavLink = { href: string; label: string }

export function MobileNavDrawer({
  scenarioCategories,
  utilityCategories,
  navLinks,
}: {
  scenarioCategories: Item[]
  utilityCategories: Item[]
  navLinks: NavLink[]
}) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Portal target only exists on the client.
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // The overlay is portaled to <body> so it escapes the header's backdrop-blur
  // containing block (a `backdrop-filter` ancestor traps `position: fixed`,
  // which previously clipped this drawer to the ~72px header bar).
  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex flex-col bg-[color:var(--color-background)] lg:hidden"
        >
            <span className="grain" />
            <div className="relative flex h-16 items-center justify-between border-b border-[color:var(--color-hairline)] px-5">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)]">
                Danh mục
              </span>
              <button
                type="button"
                aria-label="Đóng menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm hover:bg-[color:var(--color-surface)]"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            <nav className="relative flex-1 overflow-y-auto px-5 py-6">
              <p className="kicker mb-3">Tình huống</p>
              <ul className="mb-6 space-y-1">
                {scenarioCategories.map((c, i) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 py-2 font-display text-2xl font-semibold text-[color:var(--color-ink)]"
                    >
                      <span className="index-num text-sm text-[color:var(--color-secondary)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="rule-gold my-5" />

              <ul className="space-y-1">
                <li>
                  <Link
                    href="/tinh-huong"
                    onClick={() => setOpen(false)}
                    className="block py-2 text-lg text-[color:var(--color-ink)]"
                  >
                    Tất cả tình huống
                  </Link>
                </li>
                {utilityCategories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-lg text-[color:var(--color-ink)]"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-lg text-[color:var(--color-ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative border-t border-[color:var(--color-hairline)] p-5">
              <a
                href={HOTLINE_TEL}
                data-cta="mobile-nav"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-[color:var(--color-primary)] px-4 py-3.5 font-semibold text-white"
              >
                <Phone className="h-4 w-4" />
                Gọi ngay {HOTLINE_PRETTY}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  )

  return (
    <>
      <button
        type="button"
        aria-label="Mở menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-[color:var(--color-ink)] hover:bg-[color:var(--color-surface)] lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" strokeWidth={1.75} />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  )
}
