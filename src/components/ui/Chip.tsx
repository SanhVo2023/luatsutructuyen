import type { ReactNode } from 'react'

/**
 * Small editorial pill. `tone` accepts a CSS color string (e.g. a var()).
 * `variant`: 'solid' (filled), 'soft' (tinted bg), or 'outline'.
 */
export default function Chip({
  children,
  tone = 'var(--color-primary)',
  variant = 'soft',
  className = '',
}: {
  children: ReactNode
  tone?: string
  variant?: 'solid' | 'soft' | 'outline'
  className?: string
}) {
  const base =
    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider'
  const styles: Record<string, React.CSSProperties> = {
    solid: { background: tone, color: '#fff' },
    soft: {
      background: `color-mix(in srgb, ${tone} 12%, transparent)`,
      color: tone,
      border: `1px solid color-mix(in srgb, ${tone} 26%, transparent)`,
    },
    outline: { color: tone, border: `1px solid ${tone}` },
  }
  return (
    <span className={`${base} ${className}`} style={styles[variant]}>
      {children}
    </span>
  )
}
