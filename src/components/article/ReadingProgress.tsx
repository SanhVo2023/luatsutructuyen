'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin oxblood progress bar pinned to the top of the viewport that fills as the
 * reader scrolls through an article. Sits just under the sticky header.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-[color:var(--color-primary)]"
      aria-hidden="true"
    />
  )
}
