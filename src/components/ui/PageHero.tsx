import { Breadcrumb } from '@/components/ui/Breadcrumb'
import ScrollReveal from '@/components/animations/ScrollReveal'

type Crumb = { label: string; href?: string }

/** Editorial page header used by the static / index pages. */
export function PageHero({
  crumbs,
  kicker,
  title,
  lead,
}: {
  crumbs: Crumb[]
  kicker: string
  title: string
  lead?: string
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[color:var(--color-hairline)]">
      <span className="grain" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-primary), transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <Breadcrumb items={crumbs} />
        <ScrollReveal>
          <p className="kicker mt-7">{kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-[color:var(--color-ink)] md:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {lead && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--color-text-secondary)]">
              {lead}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
