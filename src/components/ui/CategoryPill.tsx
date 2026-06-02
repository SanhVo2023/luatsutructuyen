import Link from 'next/link'
import Image from 'next/image'
import * as Icons from 'lucide-react'
import type { CategoryDoc } from '@/lib/queries'
import { getCategoryImagery } from '@/lib/imagery'
import { toneVar } from '@/lib/scenario-meta'

const colorToTone: Record<NonNullable<CategoryDoc['color']>, string> = {
  terracotta: 'primary',
  clay: 'secondary',
  olive: 'olive',
  rust: 'rust',
}

/**
 * Editorial category card (`card`) or compact link (`inline`).
 * `card` shows the category image plate with an ink gradient for legibility,
 * a tinted icon chip, serif name, and a reveal arrow.
 */
export function CategoryPill({
  category,
  variant = 'card',
}: {
  category: CategoryDoc
  variant?: 'card' | 'inline'
}) {
  const IconCmp =
    (category.icon &&
      (Icons as unknown as Record<string, React.FC<{ className?: string; strokeWidth?: number }>>)[
        category.icon
      ]) ||
    Icons.Scale
  const colorKey: NonNullable<CategoryDoc['color']> = category.color ?? 'terracotta'
  const tone = toneVar(colorToTone[colorKey])

  if (variant === 'inline') {
    return (
      <Link
        href={`/${category.slug}`}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
        style={{ background: `color-mix(in srgb, ${tone} 12%, transparent)`, color: tone }}
      >
        <IconCmp className="h-3.5 w-3.5" strokeWidth={2} />
        {category.name}
      </Link>
    )
  }

  const imagery = getCategoryImagery(category.slug)

  return (
    <Link
      href={`/${category.slug}`}
      className="group relative block aspect-[5/4] overflow-hidden rounded-lg border border-[color:var(--color-hairline)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(27,23,20,0.14)]"
    >
      {imagery && (
        <Image
          src={imagery.src}
          alt={imagery.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply opacity-35"
        style={{ background: `linear-gradient(160deg, ${tone}, transparent 70%)` }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/85 via-[color:var(--color-ink)]/15 to-transparent"
      />
      <div className="relative flex h-full flex-col justify-end p-5">
        <span
          className="mb-3 inline-grid h-10 w-10 place-items-center rounded-sm text-white shadow-md"
          style={{ background: tone }}
        >
          <IconCmp className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="font-display text-lg font-semibold leading-tight text-white">
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/80">
            {category.description}
          </p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
          Xem tình huống →
        </span>
      </div>
    </Link>
  )
}
