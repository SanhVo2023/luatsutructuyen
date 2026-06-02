'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'

/**
 * Button that drifts toward the cursor on hover (magnetic effect).
 * Use sparingly — best on a single primary CTA per page (hero, contact).
 * Adds a tasteful sense of interactivity without being gimmicky.
 *
 * @example
 *   <MagneticButton onClick={...} className="bg-amber-700 px-8 py-4 rounded-full text-white">
 *     Schedule consultation
 *   </MagneticButton>
 */
interface Props {
  children: ReactNode
  className?: string
  strength?: number  // 0-1, how strongly to follow cursor; default 0.3
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  type = 'button',
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring smooths the cursor follow
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  // Subtle scale during hover
  const scale = useTransform([springX, springY], (vals) => {
    const [vx, vy] = vals as [number, number]
    const dist = Math.sqrt(vx * vx + vy * vy)
    return 1 + Math.min(dist / 1000, 0.05)
  })

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, scale }}
      className={className}
    >
      {children}
    </motion.button>
  )
}
