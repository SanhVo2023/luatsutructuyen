import type { ElementType } from 'react'

/**
 * Deterministic abstract gradient banner for articles — gives every post/scenario
 * a unique, on-brand visual derived from its slug (no duplicate stock photos).
 * "Modern Editorial Ink": brand-palette gradient + a gold radial accent + paper
 * grain + a large faint § (section sign) legal motif. Optionally overlays the
 * title (used on cards); on detail heroes the title lives in the masthead, so
 * pass showTitle={false} and just a label.
 */

// Brand-cohesive gradient palettes (each ends/starts on a dark anchor so a
// bottom scrim keeps overlaid text legible).
const PALETTES: [string, string, string?][] = [
  ['var(--color-ink)', 'var(--color-primary)'],
  ['var(--color-primary)', 'var(--color-ink)'],
  ['var(--color-accent)', 'var(--color-ink)'],
  ['var(--color-ink)', 'var(--color-secondary)'],
  ['var(--color-alert)', 'var(--color-ink)'],
  ['var(--color-primary)', 'var(--color-ink)', 'var(--color-secondary)'],
  ['var(--color-accent)', 'var(--color-primary)'],
  ['var(--color-ink)', 'var(--color-alert)'],
  ['var(--color-secondary)', 'var(--color-primary)'],
]

function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function ArticleBanner({
  seed,
  title,
  label,
  showTitle = true,
  titleAs: TitleTag = 'span',
  className = '',
  titleClassName = 'font-display text-lg font-semibold leading-snug text-white',
}: {
  seed: string
  title?: string | null
  label?: string | null
  showTitle?: boolean
  titleAs?: ElementType
  className?: string
  titleClassName?: string
}) {
  const h = hashSeed(seed || 'apolo')
  const pal = PALETTES[h % PALETTES.length]
  const angle = 115 + (h % 6) * 14 // 115–185deg
  const gx = 18 + ((h >> 3) % 64) // accent x %
  const gy = 12 + ((h >> 6) % 46) // accent y %
  const base =
    pal.length === 3
      ? `linear-gradient(${angle}deg, ${pal[0]}, ${pal[1]} 52%, ${pal[2]})`
      : `linear-gradient(${angle}deg, ${pal[0]}, ${pal[1]})`
  const accent = `radial-gradient(72% 90% at ${gx}% ${gy}%, color-mix(in srgb, var(--color-secondary) 32%, transparent), transparent 64%)`

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{ backgroundImage: `${accent}, ${base}` }}
    >
      <span className="grain opacity-30" />
      {/* large faint legal section mark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-3 select-none font-display font-semibold leading-none text-white/10"
        style={{ fontSize: '13rem' }}
      >
        §
      </span>
      {/* bottom scrim for legibility */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/70 via-transparent to-transparent"
      />
      {(showTitle || label) && (
        <div className="relative flex h-full flex-col justify-end gap-2 p-5">
          {label && (
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/75">
              {label}
            </span>
          )}
          {showTitle && title && <TitleTag className={titleClassName}>{title}</TitleTag>}
        </div>
      )}
    </div>
  )
}
