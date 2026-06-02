'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Count-up numeral that animates from 0 → value the first time it scrolls into
 * view. Honours prefers-reduced-motion (jumps straight to the final value).
 *
 * @example <StatCounter value={100} suffix="+" /> năm kinh nghiệm
 */
interface Props {
  value: number
  suffix?: string
  prefix?: string
  durationMs?: number
  className?: string
}

export default function StatCounter({
  value,
  suffix = '',
  prefix = '',
  durationMs = 1400,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    let raf = 0
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / durationMs, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value, durationMs])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
