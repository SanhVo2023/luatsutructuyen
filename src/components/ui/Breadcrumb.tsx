import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }
type Tone = 'default' | 'light'

const toneClasses = {
  default: {
    root: 'text-[color:var(--color-text-secondary)]',
    link: 'hover:text-[color:var(--color-primary)]',
    current: 'text-[color:var(--color-text-primary)]',
    sep: 'opacity-60',
  },
  light: {
    root: 'text-white/75',
    link: 'hover:text-white',
    current: 'text-white',
    sep: 'opacity-50',
  },
} as const

export function Breadcrumb({ items, tone = 'default' }: { items: Crumb[]; tone?: Tone }) {
  const t = toneClasses[tone]
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${t.root}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {c.href && !isLast ? (
                <Link href={c.href} className={`${t.link} transition-colors`}>
                  {c.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? t.current : ''}>
                  {c.label}
                </span>
              )}
              {!isLast && <ChevronRight className={`w-3.5 h-3.5 ${t.sep}`} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function breadcrumbJsonLd(items: Crumb[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: c.href.startsWith('http') ? c.href : `${siteUrl}${c.href}` } : {}),
    })),
  }
}
