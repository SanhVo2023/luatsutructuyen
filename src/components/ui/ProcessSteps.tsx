import { BookOpen, ClipboardCheck, MessagesSquare, Scale } from 'lucide-react'
import { PROCESS_STEPS } from '@/content/process'
import { StaggerReveal } from '@/components/animations/ScrollReveal'

const ICONS = { BookOpen, ClipboardCheck, MessagesSquare, Scale }

/** Three-step "how it works" rail with numbered editorial cards. */
export function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StaggerReveal staggerDelay={0.1} className="contents">
        {PROCESS_STEPS.map((step, i) => {
          const Icon = ICONS[step.icon]
          return (
            <div
              key={step.id}
              className="relative flex flex-col rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-7"
            >
              <div className="flex items-center justify-between">
                <span className="index-num text-3xl font-medium text-[color:var(--color-secondary)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-sm bg-[color:var(--color-surface)] text-[color:var(--color-primary)]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-[color:var(--color-ink)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                {step.body}
              </p>
            </div>
          )
        })}
      </StaggerReveal>
    </div>
  )
}
