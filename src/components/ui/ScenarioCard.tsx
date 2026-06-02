import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowUpRight } from 'lucide-react'
import type { ScenarioDoc, CategoryDoc, MediaDoc } from '@/lib/queries'
import { getCategoryImagery } from '@/lib/imagery'
import { urgencyMeta, toneVar } from '@/lib/scenario-meta'

const tintWash: Record<string, string> = {
  terracotta: 'var(--color-primary)',
  clay: 'var(--color-secondary)',
  olive: 'var(--color-accent)',
  rust: 'var(--color-alert)',
}

/**
 * Editorial scenario card — image plate with a restrained category-tinted wash,
 * mono category kicker, serif title with an animated gold underline on hover,
 * hook excerpt, and a footer rail (reading time + urgency chip).
 */
export function ScenarioCard({ scenario, index }: { scenario: ScenarioDoc; index?: number }) {
  const cat = scenario.category as CategoryDoc
  const hero = scenario.heroImage as MediaDoc | null
  const fallback = getCategoryImagery(cat?.slug)
  const heroUrl = hero?.sizes?.card?.url || hero?.url || fallback?.src || null
  const imgAlt = hero?.alt || fallback?.alt || scenario.title
  const tint = fallback?.tint ?? 'terracotta'
  const urgency = urgencyMeta(scenario.urgencyLevel)
  const href = cat?.slug ? `/${cat.slug}/${scenario.slug}` : `/tinh-huong/${scenario.slug}`

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-[color:var(--color-surface-strong)] shadow-[0_1px_0_var(--color-hairline)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(27,23,20,0.14)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[color:var(--color-surface)]">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt={imgAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 mix-blend-multiply opacity-25"
          style={{ background: `linear-gradient(135deg, ${tintWash[tint]}, transparent 70%)` }}
        />
        {index != null && (
          <span className="index-num absolute left-3 top-3 rounded-sm bg-[color:var(--color-ink)]/80 px-1.5 py-0.5 text-xs text-[color:var(--color-background)] backdrop-blur-sm">
            {String(index).padStart(2, '0')}
          </span>
        )}
        {urgency && (
          <span
            className="absolute right-3 top-3 rounded-full bg-[color:var(--color-surface-strong)]/95 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider backdrop-blur-sm"
            style={{ color: toneVar(urgency.tone) }}
          >
            {urgency.label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-1.5 pb-1.5 pt-4">
        {cat?.name && <span className="kicker text-[0.66rem]">{cat.name}</span>}
        <h3 className="font-display text-lg font-semibold leading-snug text-[color:var(--color-ink)]">
          <span className="link-underline bg-[length:0%_1.5px] transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
            {scenario.title}
          </span>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
          {scenario.hookText}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-[color:var(--color-text-secondary)]">
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
