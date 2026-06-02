'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * Fade + slide-up reveal triggered when the element enters the viewport.
 * Use on every section heading and major content block. Mandatory per
 * BUILDER_AGENT_BRIEF Design Vocabulary.
 *
 * @example
 *   <ScrollReveal><h2>Practice Areas</h2></ScrollReveal>
 *   <ScrollReveal delay={0.2} y={60}><p>Body...</p></ScrollReveal>
 */
interface ScrollRevealProps {
  children: ReactNode
  delay?: number       // seconds before the animation starts
  y?: number           // pixels of upward slide; default 40
  className?: string
  once?: boolean       // re-trigger on scroll back? default true (one-shot)
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger-reveal a list of children — each one fades+slides up in sequence.
 * Pair with grids of cards (practice areas, testimonials, team members).
 *
 * @example
 *   <StaggerReveal staggerDelay={0.1}>
 *     {practiceAreas.map(area => <Card key={area.id} {...area} />)}
 *   </StaggerReveal>
 */
interface StaggerProps {
  children: ReactNode[]
  staggerDelay?: number  // seconds between each child; default 0.08
  className?: string
}

export function StaggerReveal({ children, staggerDelay = 0.08, className }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
