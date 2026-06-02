'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ScenarioCard } from '@/components/ui/ScenarioCard'
import type { ScenarioDoc, CategoryDoc } from '@/lib/queries'
import { URGENCY_META, OUTCOME_META, type Urgency, type Outcome } from '@/lib/scenario-meta'

type Cat = { slug: string; name: string; id: string | number }

/**
 * Client archive grid with filter tabs by category, urgency, and outcome.
 * Receives the full published list from the server and filters in-memory.
 */
export default function ScenarioArchive({
  scenarios,
  categories,
}: {
  scenarios: ScenarioDoc[]
  categories: Cat[]
}) {
  const [cat, setCat] = useState<string>('all')
  const [urgency, setUrgency] = useState<Urgency | 'all'>('all')
  const [outcome, setOutcome] = useState<Outcome | 'all'>('all')

  const filtered = useMemo(() => {
    return scenarios.filter((s) => {
      const sCat = (s.category as CategoryDoc)?.slug
      if (cat !== 'all' && sCat !== cat) return false
      if (urgency !== 'all' && s.urgencyLevel !== urgency) return false
      if (outcome !== 'all' && s.outcomeType !== outcome) return false
      return true
    })
  }, [scenarios, cat, urgency, outcome])

  const pill = (active: boolean) =>
    `rounded-sm border px-3.5 py-1.5 text-sm font-medium transition-colors ${
      active
        ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white'
        : 'border-[color:var(--color-hairline)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-primary)]/40 hover:text-[color:var(--color-ink)]'
    }`

  return (
    <div>
      {/* Filters */}
      <div className="space-y-4 border-y border-[color:var(--color-hairline)] py-6">
        <FilterRow label="Chủ đề">
          <button type="button" onClick={() => setCat('all')} className={pill(cat === 'all')}>
            Tất cả
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCat(c.slug)}
              className={pill(cat === c.slug)}
            >
              {c.name}
            </button>
          ))}
        </FilterRow>

        <FilterRow label="Mức độ">
          <button
            type="button"
            onClick={() => setUrgency('all')}
            className={pill(urgency === 'all')}
          >
            Tất cả
          </button>
          {(Object.keys(URGENCY_META) as Urgency[]).map((u) => (
            <button key={u} type="button" onClick={() => setUrgency(u)} className={pill(urgency === u)}>
              {URGENCY_META[u].label}
            </button>
          ))}
        </FilterRow>

        <FilterRow label="Hướng giải quyết">
          <button
            type="button"
            onClick={() => setOutcome('all')}
            className={pill(outcome === 'all')}
          >
            Tất cả
          </button>
          {(Object.keys(OUTCOME_META) as Outcome[]).map((o) => (
            <button key={o} type="button" onClick={() => setOutcome(o)} className={pill(outcome === o)}>
              {OUTCOME_META[o].label}
            </button>
          ))}
        </FilterRow>
      </div>

      <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {filtered.length} tình huống
      </p>

      {filtered.length > 0 ? (
        <motion.div layout className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <motion.div
              key={String(s.id)}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
            >
              <ScenarioCard scenario={s} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-[color:var(--color-secondary)] bg-[color:var(--color-surface-strong)] p-12 text-center">
          <p className="text-[color:var(--color-text-secondary)]">
            Không có tình huống nào khớp bộ lọc. Hãy thử bỏ bớt điều kiện.
          </p>
        </div>
      )}
    </div>
  )
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-36 flex-shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--color-text-secondary)]">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
