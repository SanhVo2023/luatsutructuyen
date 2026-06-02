'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'
import { HOTLINE_TEL } from '@/lib/cta'

/**
 * Sticky "Gọi luật sư" floating CTA. Appears after the user scrolls 30% of the
 * document height. Editorial pill — oxblood, square-ish corners, gentle pulse.
 * Click-to-call the Apolo hotline (the site's single funnel).
 */
export function FloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled =
        window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setVisible(scrolled > 0.3)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-30 md:bottom-8 md:right-8"
        >
          <a
            href={HOTLINE_TEL}
            data-cta="floating-cta"
            className="group flex items-center gap-2.5 rounded-sm bg-[color:var(--color-ink)] py-3 pl-3 pr-5 font-medium text-[color:var(--color-background)] shadow-[0_10px_30px_rgba(27,23,20,0.28)] ring-1 ring-[color:var(--color-secondary)]/30 transition-colors hover:bg-[color:var(--color-primary)]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-sm bg-[color:var(--color-primary)] text-white transition-colors group-hover:bg-[color:var(--color-secondary)]">
              <motion.span
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <Phone className="h-4 w-4" strokeWidth={2} />
              </motion.span>
            </span>
            <span>Gọi luật sư</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
