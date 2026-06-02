import Link from 'next/link'
import { Clock, ArrowUpRight } from 'lucide-react'
import type { ScenarioDoc, CategoryDoc } from '@/lib/queries'
import { urgencyMeta, toneVar } from '@/lib/scenario-meta'
import { ArticleBanner } from '@/components/ui/ArticleBanner'

/**
 * Editorial scenario card — an abstract gradient "title banner" (unique per
 * scenario via its slug, so no duplicate imagery), a category label, the hook
 * excerpt, and a footer rail (reading time + urgency chip).
 */
export function ScenarioCard({ scenario, index }: { scenario: ScenarioDoc; index?: number }) {
  const cat = scenario.category as CategoryDoc
  const urgency = urgencyMeta(scenario.urgencyLevel)
  const href = cat?.slug ? `/${cat.slug}/${scenario.slug}` : `/tinh-huong/${scenario.slug}`

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-[color:var(--color-surface-strong)] shadow-[0_1px_0_var(--color-hairline)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(27,23,20,0.14)]"
    >
      <div className="relative">
        <ArticleBanner
          seed={scenario.slug}
          title={scenario.title}
          label={cat?.name}
          titleAs="h3"
          className="aspect-[16/10] rounded-xl transition-transform duration-500 group-hover:scale-[1.015]"
          titleClassName="font-display text-base font-semibold leading-snug text-white line-clamp-3"
        />
        {index != null && (
          <span className="index-num absolute left-3 top-3 z-10 rounded-sm bg-[color:var(--color-ink)]/70 px-1.5 py-0.5 text-xs text-[color:var(--color-background)] backdrop-blur-sm">
            {String(index).padStart(2, '0')}
          </span>
        )}
        {urgency && (
          <span
            className="absolute right-3 top-3 z-10 rounded-full bg-[color:var(--color-surface-strong)]/95 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider backdrop-blur-sm"
            style={{ color: toneVar(urgency.tone) }}
          >
            {urgency.label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-1.5 pb-1.5 pt-4">
        <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
          {scenario.hookText}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-[color:var(--color-text-secondary)]">
          {scenario.readingTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {scenario.readingTime} phút đọc
            </span>
          ) : (
            <span />
          )}
          <ArrowUpRight className="h-4 w-4 text-[color:var(--color-primary)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}
