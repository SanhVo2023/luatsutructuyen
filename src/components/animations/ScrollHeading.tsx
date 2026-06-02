'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Headline that reveals word-by-word as it enters the viewport.
 * Use on major H1/H2 section openings — feels more deliberate than a fade.
 *
 * @example
 *   <ScrollHeading text="Where the law meets your business" as="h2" className="text-4xl font-serif" />
 */
interface Props {
  text: string
  /** HTML tag to render; default "h2" */
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  staggerDelay?: number  // seconds between each word; default 0.05
}

export default function ScrollHeading({ text, as: Tag = 'h2', className = '', staggerDelay = 0.05 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const words = text.split(' ')

  return (
    <Tag className={className}>
      <span ref={ref} className="inline-block">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: '0.4em' }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
            style={{ marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  )
}
