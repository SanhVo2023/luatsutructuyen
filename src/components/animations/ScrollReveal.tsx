'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Fade + slide-up reveal. Animation is a *progressive enhancement* — content is
 * ALWAYS revealed (a hard safety timer + reduced-motion fallback guarantee it),
 * so it can never get stuck invisible. (The old version observed the element with
 * IntersectionObserver and left content at opacity:0 if the observer never fired
 * — which happened on `display:contents` wrappers and some mobile browsers,
 * blanking everything below the fold.)
 */
interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export default function ScrollReveal({ children, delay = 0, y = 40, className }: ScrollRevealProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (reduce) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    let done = false
    const reveal = () => {
      if (!done) {
        done = true
        setShown(true)
      }
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal()
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    io.observe(el)
    // Safety net: never leave content hidden, whatever the observer does.
    const t = setTimeout(reveal, 1000)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [reduce])

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger-reveal a list of children. Reveals on mount (the wrapper is usually
 * `display:contents` for grids, which breaks IntersectionObserver), so the grid
 * is guaranteed visible immediately after hydration with a pleasant stagger.
 */
interface StaggerProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggerReveal({ children, staggerDelay = 0.08, className }: StaggerProps) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    const t = setTimeout(() => setShown(true), 800)
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(t)
    }
  }, [])

  const visible = shown || reduce

  return (
    <motion.div className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 28 }}
          transition={{
            duration: 0.6,
            delay: reduce ? 0 : i * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
