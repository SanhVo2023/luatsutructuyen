'use client'

/**
 * Subtle grid pattern overlay using SVG. 60×60px cells, 4% opacity by default,
 * uses currentColor so cascades from CSS text color.
 *
 * Use as a background decoration on hero sections, testimonial sections, or any
 * area that feels too plain. Position relative on the parent.
 *
 * @example
 *   <section className="relative">
 *     <AnimatedGrid />
 *     <div className="relative z-10">...content...</div>
 *   </section>
 */
export default function AnimatedGrid({
  className = '',
  cellSize = 60,
  opacity = 0.04,
}: {
  className?: string
  cellSize?: number
  opacity?: number
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 h-full w-full" style={{ opacity }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-pattern-${cellSize}`} width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
            <path d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-pattern-${cellSize})`} />
      </svg>
    </div>
  )
}
