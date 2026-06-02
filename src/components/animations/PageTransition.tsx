'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Wraps page content in a fade + subtle slide on route change.
 * Drop into the locale layout (or root layout) so every navigation feels intentional.
 *
 * @example
 *   // src/app/[locale]/layout.tsx
 *   <body>
 *     <Header />
 *     <PageTransition>{children}</PageTransition>
 *     <Footer />
 *   </body>
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
