'use client'

import Link from 'next/link'
import Image from 'next/image'
import * as Icons from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import TiltCard from '@/components/animations/TiltCard'
import { toneVar } from '@/lib/scenario-meta'

export type IndexCategory = {
  slug: string
  name: string
  description?: string | null
  icon?: string | null
  color?: string | null
  imageSrc?: string | null
  imageAlt?: string | null
}

const colorToTone: Record<string, string> = {
  terracotta: 'primary',
  clay: 'secondary',
  olive: 'olive',
  rust: 'rust',
}

/**
 * Numbered editorial category index. Each entry is a tilting card; on hover the
 * category image fades up behind the ink and the title shifts to gold. Replaces
 * the old uniform pill grid.
 */
export default function CategoryIndex({ categories }: { categories: IndexCategory[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-hairline)] sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c, i) => {
        const Icon =
          (c.icon &&
            (Icons as unknown as Record<
              string,
              React.FC<{ className?: string; strokeWidth?: number }>
            >)[c.icon]) ||
          Icons.Scale
        const tone = toneVar(colorToTone[c.color ?? 'terracotta'] ?? 'primary')
        return (
          <TiltCard key={c.slug} max={4} glare={false} className="rounded-none">
            <Link
              href={`/${c.slug}`}
              className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden bg-[color:var(--color-surface-strong)] p-6 transition-colors"
            >
              {/* Hover image reveal */}
              {c.imageSrc && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <Image src={c.imageSrc} alt="" fill sizes="33vw" className="object-cover" />
                  <span className="absolute inset-0 bg-[color:var(--color-ink)]/82" />
                  <span
                    className="absolute inset-0 mix-blend-multiply opacity-50"
                    style={{ background: `linear-gradient(160deg, ${tone}, transparent 70%)` }}
                  />
                </span>
              )}

              <div className="relative flex items-start justify-between">
                <span
                  className="index-num text-2xl font-medium"
                  style={{ color: tone }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="grid h-10 w-10 place-items-center rounded-sm transition-colors group-hover:bg-white/10"
                  style={{ color: tone }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
              </div>

              <div className="relative mt-6">
                <h3 className="font-display text-xl font-semibold leading-snug text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-background)]">
                  {c.name}
                </h3>
                {c.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[color:var(--color-text-secondary)] transition-colors group-hover:text-[color:var(--color-background)]/75">
                    {c.description}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-wider text-[color:var(--color-primary)] transition-colors group-hover:text-[color:var(--color-secondary)]">
                  Xem tình huống <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </TiltCard>
        )
      })}
    </div>
  )
}
