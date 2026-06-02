'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export type AccordionItem = { q: string; a: string }

/**
 * Accessible single-open accordion for FAQ sections. Smooth height reveal;
 * the plus icon rotates to an x. Reduced-motion users still get instant toggle.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-[color:var(--color-hairline)] border-y border-[color:var(--color-hairline)]">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-lg font-semibold leading-snug text-[color:var(--color-ink)] md:text-xl">
                  {item.q}
                </span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--color-hairline-strong)] text-[color:var(--color-primary)] transition-transform duration-300 ${
                    isOpen ? 'rotate-45 bg-[color:var(--color-primary)] text-white' : ''
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 leading-relaxed text-[color:var(--color-text-secondary)]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
