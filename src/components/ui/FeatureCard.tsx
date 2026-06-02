import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import type { ScenarioDoc, CategoryDoc, MediaDoc } from '@/lib/queries'
import { getCategoryImagery } from '@/lib/imagery'
import HoverZoom from '@/components/animations/HoverZoom'
import { urgencyMeta, toneVar } from '@/lib/scenario-meta'

const tintWash: Record<string, string> = {
  terracotta: 'var(--color-primary)',
  clay: 'var(--color-secondary)',
  olive: 'var(--color-accent)',
  rust: 'var(--color-alert)',
}

/**
 * Large editorial "story of the week" card — asymmetric split, big serif
 * headline, italic pull-quote excerpt, gold-ruled meta rail. Image uses HoverZoom.
 */
export function FeatureCard({ scenario }: { scenario: ScenarioDoc }) {
  const cat = scenario.category as CategoryDoc
  const hero = scenario.heroImage as MediaDoc | null
  const fallback = getCategoryImagery(cat?.slug)
  const imgSrc = hero?.sizes?.hero?.url || hero?.url || fallback?.src || null
  const imgAlt = hero?.alt || fallback?.alt || scenario.title
  const tint = fallback?.tint ?? 'terracotta'
  const urgency = urgencyMeta(scenario.urgencyLevel)
  const href = cat?.slug ? `/${cat.slug}/${scenario.slug}` : `/tinh-huong/${scenario.slug}`

  return (
    <article className="group grid grid-cols-1 overflow-hidden rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] transition-shadow duration-500 hover:shadow-[0_28px_70px_rgba(27,23,20,0.14)] lg:grid-cols-[1.05fr_1fr]">
      <Link href={href} className="relative block min-h-[280px] overflow-hidden lg:min-h-[460px]">
        <HoverZoom scale={1.06} className="absolute inset-0 h-full w-full">
          {imgSrc && (
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
              priority
            />
          )}
        </HoverZoom>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-30"
          style={{ background: `linear-gradient(135deg, ${tintWash[tint]}, transparent 65%)` }}
        />
        <span className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-ink)]/85 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-background)] backdrop-blur-sm">
          Câu chuyện trong tuần
        </span>
      </Link>

      <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
        <div>
          <div className="mb-5 flex items-center gap-3">
            {cat?.name && <span className="kicker">{cat.name}</span>}
            {urgency && (
              <span
                className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider"
                style={{
                  color: toneVar(urgency.tone),
                  background: `color-mix(in srgb, ${toneVar(urgency.tone)} 12%, transparent)`,
                }}
              >
                {urgency.label}
              </span>
            )}
          </div>
          <h2 className="font-display text-2xl font-semibold leading-[1.12] text-[color:var(--color-ink)] md:text-3xl lg:text-[2.6rem]">
            <Link href={href} className="transition-colors hover:text-[color:var(--color-primary)]">
              {scenario.title}
            </Link>
          </h2>
          <p className="pull-quote mt-5 line-clamp-4 text-lg leading-relaxed md:text-xl">
            “{scenario.hookText}”
          </p>
        </div>

        <div className="mt-8">
          <div className="rule-gold mb-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              {scenario.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {scenario.readingTime} phút
                </span>
              )}
              {scenario.publishedDate && (
                <span>
                  {new Date(scenario.publishedDate).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
              )}
            </div>
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-primary)] transition-all hover:gap-2.5"
            >
              Đọc tiếp <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
