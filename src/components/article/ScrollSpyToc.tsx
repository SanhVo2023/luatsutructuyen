'use client'

import { useEffect, useState } from 'react'

type TocItem = { level: number; label: string; anchor: string }

/**
 * Sticky table of contents that highlights the section currently in view.
 * Uses IntersectionObserver against the heading anchors rendered by Markdown.tsx
 * (rehype-slug gives each h2/h3 an id matching `anchor`).
 */
export default function ScrollSpyToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.anchor ?? null)

  useEffect(() => {
    if (!items.length) return
    const headings = items
      .map((i) => document.getElementById(i.anchor))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="Mục lục bài viết" className="text-sm">
      <p className="kicker mb-4">Trong bài</p>
      <ul className="space-y-2.5 border-l border-[color:var(--color-hairline)]">
        {items.map((item) => {
          const active = item.anchor === activeId
          return (
            <li key={item.anchor} style={{ paddingLeft: item.level === 3 ? '1.5rem' : '0.9rem' }}>
              <a
                href={`#${item.anchor}`}
                className={`-ml-px block border-l-2 py-0.5 leading-snug transition-colors ${
                  active
                    ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)] font-medium'
                    : 'border-transparent text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-ink)]'
                }`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
