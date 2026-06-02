'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

/**
 * A thin horizontal rule that "draws on" left-to-right when scrolled into view.
 * Gold by default. Used between editorial sections.
 */
export default function DrawDivider({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      className={`h-px w-full ${className}`}
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="0.5"
        x2="100"
        y2="0.5"
        stroke="var(--color-secondary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}
