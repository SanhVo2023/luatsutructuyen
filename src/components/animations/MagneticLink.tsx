'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useRef, type MouseEvent, type ReactNode } from 'react'

/**
 * Anchor that drifts toward the cursor on hover (magnetic effect) — the link
 * counterpart to MagneticButton. Use on a single primary CTA per page.
 * External (http) hrefs render a plain <a>; internal hrefs use next/link.
 */
interface Props {
  href: string
  children: ReactNode
  className?: string
  strength?: number
  external?: boolean
}

export default function MagneticLink({
  href,
  children,
  className = '',
  strength = 0.3,
  external,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const isExternal = external ?? /^https?:\/\//.test(href)
  const MotionAnchor = motion.a

  if (isExternal) {
    return (
      <MotionAnchor
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
      </MotionAnchor>
    )
  }
  return (
    <motion.span
      ref={ref as unknown as React.Ref<HTMLSpanElement>}
      onMouseMove={handleMove as unknown as (e: MouseEvent<HTMLSpanElement>) => void}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.span>
  )
}
