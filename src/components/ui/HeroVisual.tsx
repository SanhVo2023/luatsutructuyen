'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * "The Living Balance" — the hero centrepiece. A dimensional, gold scales of
 * justice balancing inside an ornate, counter-rotating medallion, wrapped in a
 * moody rotating aurora with drifting gold particles, a sweeping light sheen and
 * floating statutory-citation chips. The site's thesis made visual: a real lawyer
 * weighs real, current law.
 *
 * All continuous motion is CSS-driven (see globals.css `.hero-*`) so it runs on
 * mobile and under low-power mode. The cursor 3D-parallax is a desktop-only
 * progressive enhancement via Framer Motion (no effect on touch).
 */

const GOLD = 'var(--color-secondary)'
const GOLD_LITE = '#E6B85C'

const CITATIONS = [
  { t: 'Điều 430 BLDS 2015', x: '2%', y: '22%', d: '0s' },
  { t: 'Điều 51 Luật HN&GĐ', x: '68%', y: '14%', d: '1.4s' },
  { t: 'Điều 202 Luật Đất đai', x: '70%', y: '64%', d: '3s' },
  { t: 'Điều 36 BLLĐ 2019', x: '0%', y: '62%', d: '4.3s' },
  { t: 'Khoản 2 Điều 12 LDN', x: '38%', y: '84%', d: '2.2s' },
]

const PARTICLES = [
  { x: '16%', y: '30%', s: 5, d: '0s' },
  { x: '83%', y: '26%', s: 4, d: '1.1s' },
  { x: '78%', y: '52%', s: 6, d: '2.3s' },
  { x: '22%', y: '60%', s: 4, d: '0.6s' },
  { x: '50%', y: '12%', s: 5, d: '3.1s' },
  { x: '12%', y: '46%', s: 3, d: '1.8s' },
  { x: '88%', y: '70%', s: 4, d: '2.7s' },
]

// 72 medallion ticks (major every 6)
const TICKS = Array.from({ length: 72 }, (_, i) => i)

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), { stiffness: 110, damping: 20 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-11, 11]), { stiffness: 110, damping: 20 })

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[27rem] select-none lg:max-w-none"
      style={{ perspective: 1300 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {/* depth: atmosphere */}
        <div className="absolute inset-0 overflow-hidden rounded-full" style={{ transform: 'translateZ(-40px)' }}>
          {/* rotating aurora */}
          <div
            aria-hidden
            className="hero-aurora absolute inset-[-28%] rounded-full opacity-40 blur-2xl"
            style={{
              background:
                'conic-gradient(from 0deg, var(--color-primary), var(--color-ink), var(--color-secondary), var(--color-ink), var(--color-alert), var(--color-primary))',
            }}
          />
          {/* oxblood core glow */}
          <div
            aria-hidden
            className="hero-glow absolute inset-[14%] rounded-full blur-2xl"
            style={{ background: `radial-gradient(circle, var(--color-primary), transparent 66%)` }}
          />
          {/* vignette */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 46%, transparent 42%, var(--color-ink) 100%)' }}
          />
        </div>

        {/* depth: medallion rings */}
        <div className="absolute inset-0" style={{ transform: 'translateZ(8px)' }}>
          <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" fill="none">
            <defs>
              <linearGradient id="hvGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={GOLD} />
                <stop offset="0.5" stopColor={GOLD_LITE} />
                <stop offset="1" stopColor={GOLD} />
              </linearGradient>
              <radialGradient id="hvPan" cx="0.5" cy="0.28" r="0.85">
                <stop offset="0" stopColor={GOLD_LITE} />
                <stop offset="1" stopColor={GOLD} />
              </radialGradient>
              <path id="hvSeal" d="M150,150 m-119,0 a119,119 0 1,1 238,0 a119,119 0 1,1 -238,0" />
            </defs>

            {/* outer ring + ticks */}
            <g className="hero-ring-slow">
              <circle cx="150" cy="150" r="143" stroke="url(#hvGold)" strokeOpacity="0.32" strokeWidth="1" />
              <circle cx="150" cy="150" r="132" stroke={GOLD} strokeOpacity="0.16" strokeWidth="1" />
              {TICKS.map((i) => (
                <line
                  key={i}
                  x1="150"
                  y1="9"
                  x2="150"
                  y2={i % 6 === 0 ? '20' : '15'}
                  stroke={GOLD}
                  strokeOpacity={i % 6 === 0 ? '0.6' : '0.25'}
                  strokeWidth={i % 6 === 0 ? '1.4' : '1'}
                  transform={`rotate(${i * 5} 150 150)`}
                />
              ))}
              {[0, 90, 180, 270].map((a) => (
                <path
                  key={a}
                  d="M150 4 l5 7 -5 7 -5 -7 Z"
                  fill="url(#hvGold)"
                  transform={`rotate(${a} 150 150)`}
                />
              ))}
            </g>

            {/* rotating seal text */}
            <g className="hero-ring-rev">
              <text
                fill={GOLD}
                fillOpacity="0.6"
                style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9.2px', letterSpacing: '5px', textTransform: 'uppercase' }}
              >
                <textPath href="#hvSeal" startOffset="0%">
                  · LUẬT SƯ THẬT · TRÁCH NHIỆM THẬT · APOLO LAWYERS · TƯ VẤN ĐÚNG VIỆC
                </textPath>
              </text>
            </g>

            {/* inner dashed ring */}
            <circle
              className="hero-ring-med"
              cx="150"
              cy="150"
              r="102"
              stroke="url(#hvGold)"
              strokeOpacity="0.45"
              strokeWidth="1"
              strokeDasharray="1.5 9"
              strokeLinecap="round"
            />

            {/* orbiting glow dot */}
            <g className="hero-orbit">
              <circle cx="150" cy="20" r="7" fill={GOLD_LITE} opacity="0.3" />
              <circle cx="150" cy="20" r="3" fill={GOLD_LITE} />
            </g>
          </svg>
        </div>

        {/* depth: the scales */}
        <div
          className="absolute inset-0"
          style={{ transform: 'translateZ(46px)', filter: 'drop-shadow(0 0 14px color-mix(in srgb, var(--color-secondary) 38%, transparent))' }}
        >
          <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" fill="none">
            {/* static frame: base, column, finial */}
            <g strokeLinecap="round" strokeLinejoin="round">
              <path d="M120 262 H180 L172 250 H128 Z" fill="url(#hvGold)" fillOpacity="0.9" />
              <rect x="145" y="244" width="10" height="8" rx="1" fill="url(#hvGold)" />
              <line x1="150" y1="246" x2="150" y2="100" stroke="url(#hvGold)" strokeWidth="5.5" />
              <circle cx="150" cy="176" r="6.5" fill="none" stroke="url(#hvGold)" strokeWidth="2" />
              <circle cx="150" cy="100" r="6.5" fill="url(#hvGold)" />
              <path d="M150 74 l7.5 11 -7.5 11 -7.5 -11 Z" fill="url(#hvGold)" />
            </g>

            {/* balancing beam + pans (CSS sway around the pivot) */}
            <g className="hero-beam">
              <rect x="71" y="91.5" width="158" height="5.5" rx="2.75" fill="url(#hvGold)" />
              <circle cx="71" cy="94.25" r="5.5" fill="url(#hvGold)" />
              <circle cx="229" cy="94.25" r="5.5" fill="url(#hvGold)" />

              {/* left pan */}
              <line x1="71" y1="96" x2="56" y2="134" stroke={GOLD} strokeWidth="1.4" />
              <line x1="71" y1="96" x2="86" y2="134" stroke={GOLD} strokeWidth="1.4" />
              <path d="M48 134 Q71 164 94 134 Z" fill="url(#hvPan)" stroke="url(#hvGold)" strokeWidth="1.5" />
              <path d="M48 134 Q71 141 94 134" stroke="#fff" strokeOpacity="0.3" strokeWidth="1" fill="none" />

              {/* right pan */}
              <line x1="229" y1="96" x2="214" y2="134" stroke={GOLD} strokeWidth="1.4" />
              <line x1="229" y1="96" x2="244" y2="134" stroke={GOLD} strokeWidth="1.4" />
              <path d="M206 134 Q229 164 252 134 Z" fill="url(#hvPan)" stroke="url(#hvGold)" strokeWidth="1.5" />
              <path d="M206 134 Q229 141 252 134" stroke="#fff" strokeOpacity="0.3" strokeWidth="1" fill="none" />
            </g>
          </svg>
        </div>

        {/* depth: particles, sheen, citations */}
        <div className="absolute inset-0 overflow-hidden rounded-[28%]" style={{ transform: 'translateZ(72px)' }}>
          {/* light sheen sweep */}
          <span
            aria-hidden
            className="hero-sheen absolute inset-y-0 left-0 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, color-mix(in srgb, #fff 22%, transparent), transparent)',
              mixBlendMode: 'overlay',
            }}
          />
          {/* gold particles */}
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              aria-hidden
              className="hero-particle absolute rounded-full"
              style={{ left: p.x, top: p.y, height: p.s, width: p.s, background: GOLD_LITE, animationDelay: p.d }}
            />
          ))}
          {/* floating citation chips */}
          {CITATIONS.map((c) => (
            <span
              key={c.t}
              className="hero-cite absolute whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[0.6rem] tracking-wide backdrop-blur-sm"
              style={{
                left: c.x,
                top: c.y,
                color: GOLD,
                borderColor: 'color-mix(in srgb, var(--color-secondary) 35%, transparent)',
                background: 'color-mix(in srgb, var(--color-ink) 55%, transparent)',
                animationDelay: c.d,
              }}
            >
              {c.t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
