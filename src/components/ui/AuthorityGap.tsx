import { ShieldAlert, Scale, Target, Lock, FileWarning, Gavel } from 'lucide-react'
import { AUTHORITY_REASONS } from '@/content/why-lawyer'
import { StaggerReveal } from '@/components/animations/ScrollReveal'

const ICONS = { ShieldAlert, Scale, Target, Lock, FileWarning, Gavel }

/**
 * "The Authority Gap" — the 6 reasons free online/AI answers can't replace a
 * qualified lawyer, as a numbered editorial grid. Used on the homepage and the
 * /vi-sao-luat-su manifesto.
 */
export function AuthorityGap() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-hairline)] md:grid-cols-2 lg:grid-cols-3">
      <StaggerReveal staggerDelay={0.07} className="contents">
        {AUTHORITY_REASONS.map((r, i) => {
          const Icon = ICONS[r.icon]
          return (
            <div
              key={r.id}
              className="flex flex-col bg-[color:var(--color-surface-strong)] p-7"
            >
              <div className="flex items-center justify-between">
                <span className="index-num text-2xl font-medium text-[color:var(--color-secondary)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-sm bg-[color:var(--color-surface)] text-[color:var(--color-primary)]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-[color:var(--color-ink)]">
                {r.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                {r.body}
              </p>
            </div>
          )
        })}
      </StaggerReveal>
    </div>
  )
}
