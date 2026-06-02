import Image from 'next/image'
import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import { APOLO, parentBrandUrl } from '@/config/apolo'
import { LTT } from '@/lib/imagery'

const VOTHIENHIEN_URL = 'https://vothienhien.com'

const CREDENTIALS = [
  'Luật sư Điều hành, Công ty Luật Apolo Lawyers',
  'Đoàn Luật sư TP. Hồ Chí Minh',
  'Hơn 20 năm hành nghề tư vấn & tranh tụng',
]

/**
 * Authority block — establishes trust before the funnel hand-off. Features
 * Luật sư Võ Thiện Hiển (Managing Partner). No fabricated portrait: an editorial
 * atmosphere plate + serif monogram medallion. Links to the MP profile
 * (vothienhien.com) and the VN parent brand (apolo.com.vn) — both allowed.
 */
export function AuthorityBlock() {
  return (
    <section className="relative overflow-hidden rounded-lg bg-[color:var(--color-ink)] text-[color:var(--color-background)]">
      <span className="grain opacity-25" />
      <div className="relative grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Atmosphere plate + monogram */}
        <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
          <Image
            src={LTT.firmOffice}
            alt="Văn phòng Công ty Luật Apolo Lawyers hiện đại, chuyên nghiệp"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/55 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-sm border border-[color:var(--color-secondary)]/50 bg-[color:var(--color-ink)]/60 font-display text-2xl font-semibold text-[color:var(--color-secondary)] backdrop-blur-sm">
              VTH
            </span>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[color:var(--color-background)]/70">
              Apolo Lawyers
              <br />
              Est. 2004
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="p-8 md:p-12 lg:p-14">
          <p className="kicker text-[color:var(--color-secondary)]">Người đứng sau nội dung</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
            Luật sư Võ Thiện Hiển
          </h2>
          <p className="mt-1 text-[color:var(--color-background)]/70">{APOLO.vn.glossary.managingPartner}</p>

          <p className="pull-quote mt-6 text-xl leading-relaxed text-[color:var(--color-background)]/90">
            “Pháp luật là công cụ để giải quyết vấn đề của bạn — không phải rào cản. Việc của chúng
            tôi là làm cho nó dễ hiểu.”
          </p>

          <ul className="mt-7 space-y-2.5">
            {CREDENTIALS.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-[color:var(--color-background)]/80">
                <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-secondary)]" />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[0.72rem] uppercase tracking-wider">
            <a
              href={VOTHIENHIEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[color:var(--color-secondary)] hover:underline"
            >
              Hồ sơ luật sư <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={parentBrandUrl('vi')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[color:var(--color-background)]/70 hover:text-[color:var(--color-secondary)]"
            >
              apolo.com.vn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
