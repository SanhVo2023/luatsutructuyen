'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * Section background that scrolls slower than the foreground (parallax).
 * Use for hero backdrops, divider images, full-bleed photographs that
 * should feel cinematic rather than static.
 *
 * Wrap a `<div>` with a background image — the speed prop controls how
 * much slower the background moves vs page scroll.
 *
 * @example
 *   <section className="relative h-[80vh] overflow-hidden">
 *     <ParallaxSection speed={0.4} className="absolute inset-0">
 *       <Image src="/hero.webp" alt="" fill priority />
 *     </ParallaxSection>
 *     <div className="relative z-10 ...">Hero content</div>
 *   </section>
 */
interface Props {
  children: ReactNode
  /** 0 = no parallax, 1 = scrolls with page. Typical: 0.3-0.5 (slower than page). Default 0.4 */
  speed?: number
  className?: string
}

export default function ParallaxSection({ children, speed = 0.4, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Translate background up to (1-speed) * 100px range
  const offset = (1 - speed) * 100
  const y = useTransform(scrollYProgress, [0, 1], [`${-offset}px`, `${offset}px`])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
