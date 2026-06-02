'use client'

import type { ReactNode } from 'react'

/**
 * Image hover-zoom with subtle overlay crossfade. Wraps an <Image> or <img>.
 * Use on practice-area cards, blog thumbnails, gallery items.
 *
 * Pure CSS (no Framer Motion needed) — performant, works without JS hydration.
 *
 * @example
 *   <HoverZoom>
 *     <Image src="/practice/civil.webp" alt="Civil Law" width={400} height={300} />
 *   </HoverZoom>
 *
 * Or with a caption overlay:
 *   <HoverZoom overlay={<div className="text-white">View case study →</div>}>
 *     <Image ... />
 *   </HoverZoom>
 */
interface Props {
  children: ReactNode
  /** Optional content rendered over the image, fades in on hover */
  overlay?: ReactNode
  /** Scale factor on hover; default 1.08. Use 1.05 for subtler effect. */
  scale?: number
  className?: string
}

export default function HoverZoom({ children, overlay, scale = 1.08, className = '' }: Props) {
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{ '--zoom': scale } as React.CSSProperties}
    >
      <div className="transition-transform duration-700 ease-out group-hover:scale-[var(--zoom)]">
        {children}
      </div>
      {overlay && (
        <div className="pointer-events-none absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:pointer-events-auto">
          {overlay}
        </div>
      )}
    </div>
  )
}
