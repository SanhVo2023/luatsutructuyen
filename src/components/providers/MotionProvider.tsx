'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Client-only wrapper for framer-motion's global config. Opts users into
 * `prefers-reduced-motion` automatically. Keeps the (frontend) layout a
 * Server Component while still providing motion settings to client islands.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
