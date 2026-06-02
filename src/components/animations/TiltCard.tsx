'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'

/**
 * 3D mouse-track tilt for cards. Best for case-study cards, practice-area cards,
 * testimonial cards. Adds depth without being garish.
 *
 * Wrap card content; the card tilts up to ±max degrees following the cursor.
 *
 * @example
 *   <TiltCard className="bg-white rounded-xl shadow-lg p-6">
 *     <h3>Land Disputes</h3>
 *     <p>...</p>
 *   </TiltCard>
 */
interface Props {
  children: ReactNode
  className?: string
  /** Max tilt in degrees on each axis; default 8. Reduce to 4-5 for subtler effect. */
  max?: number
  /** Glare overlay (subtle white sheen on hover); default true */
  glare?: boolean
}

export default function TiltCard({ children, className = '', max = 8, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0.5)  // 0..1 normalized
  const my = useMotionValue(0.5)

  // Tilt: when mouse on left, tilt right (and vice versa)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 200, damping: 20 })
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 200, damping: 20 })

  // Glare position follows cursor
  const glareX = useTransform(mx, (v) => `${v * 100}%`)
  const glareY = useTransform(my, (v) => `${v * 100}%`)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  )
}
