/**
 * Decorative dot-grid SVG pattern. Use as a section accent or background
 * texture — solid color, no animation, server-renderable.
 */
export function DotGrid({
  className,
  color = 'currentColor',
  opacity = 0.18,
  size = 28,
}: {
  className?: string
  color?: string
  opacity?: number
  size?: number
}) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`dot-${size}`} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={size / 2} cy={size / 2} r="1.2" fill={color} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dot-${size})`} />
    </svg>
  )
}

/**
 * Decorative diagonal-line pattern. Lighter accent for hero overlays.
 */
export function DiagonalLines({
  className,
  color = 'currentColor',
  opacity = 0.08,
  gap = 18,
}: {
  className?: string
  color?: string
  opacity?: number
  gap?: number
}) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`diag-${gap}`} patternUnits="userSpaceOnUse" width={gap} height={gap} patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2={gap} stroke={color} strokeWidth="1" opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#diag-${gap})`} />
    </svg>
  )
}
