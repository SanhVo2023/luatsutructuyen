'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

/**
 * "The Authority Seal" — the interactive hero centrepiece (replaces a static
 * photo). A minimal line-art scales-of-justice gently balances inside a slowly
 * counter-rotating engraved medallion, while real statutory-citation chips drift
 * up and fade — the site's thesis made visual: a real lawyer cites real, current
 * law. The whole emblem tilts toward the cursor in layered 3D parallax; on touch
 * devices (and for reduced-motion users) it keeps a calm ambient state.
 */

const GOLD = 'var(--color-secondary)'
const OXBLOOD = 'var(--color-primary)'

const CITATIONS = [
  { t: 'Điều 430 BLDS 2015', x: '4%', y: '24%', delay: 0 },
  { t: 'Điều 51 Luật HN&GĐ', x: '70%', y: '16%', delay: 1.6 },
  { t: 'Điều 202 Luật Đất đai', x: '74%', y: '62%', delay: 3.1 },
  { t: 'Điều 36 BLLĐ 2019', x: '2%', y: '64%', delay: 4.4 },
  { t: 'Khoản 2 Điều 12 LDN', x: '40%', y: '82%', delay: 2.3 },
]

function Layer({
  z,
  rx,
  ry,
  className,
  children,
}: {
  z: number
  rx: MotionValue<number>
  ry: MotionValue<number>
  className?: string
  children: React.ReactNode
}) {
  // Depth parallax: deeper layers shift more as the parent tilts.
  const tx = useTransform(ry, (v) => (v / 12) * z)
  const ty = useTransform(rx, (v) => (-v / 12) * z)
  return (
    <motion.div
      style={{ x: tx, y: ty, translateZ: z }}
      className={`absolute inset-0 ${className ?? ''}`}
    >
      {children}
    </motion.div>
  )
}

export function HeroVisual() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 })

  function onMove(e: React.MouseEvent) {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    px.set(0)
    py.set(0)
  }

  const sway = reduce ? {} : { rotate: [-3.2, 3.2, -3.2] }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[26rem] select-none lg:max-w-none"
      style={{ perspective: 1100 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {/* Oxblood glow */}
        <Layer z={-60} rx={rx} ry={ry}>
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${OXBLOOD}, transparent 68%)`, opacity: 0.35 }}
            animate={reduce ? {} : { opacity: [0.28, 0.42, 0.28], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </Layer>

        {/* Engraved medallion — counter-rotating rings + seal text */}
        <Layer z={10} rx={rx} ry={ry}>
          <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" fill="none">
            <defs>
              <path id="sealArc" d="M120,120 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
            </defs>
            {/* outer rotating tick ring */}
            <motion.g
              style={{ transformOrigin: '120px 120px' }}
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="120" cy="120" r="112" stroke={GOLD} strokeOpacity="0.28" strokeWidth="1" />
              {Array.from({ length: 60 }).map((_, i) => (
                <line
                  key={i}
                  x1="120"
                  y1="10"
                  x2="120"
                  y2={i % 5 === 0 ? '20' : '15'}
                  stroke={GOLD}
                  strokeOpacity={i % 5 === 0 ? '0.55' : '0.25'}
                  strokeWidth="1"
                  transform={`rotate(${i * 6} 120 120)`}
                />
              ))}
            </motion.g>
            {/* rotating seal text */}
            <motion.g
              style={{ transformOrigin: '120px 120px' }}
              animate={reduce ? {} : { rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            >
              <text
                fill={GOLD}
                fillOpacity="0.5"
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                }}
              >
                <textPath href="#sealArc" startOffset="0%">
                  · LUẬT SƯ THẬT · TRÁCH NHIỆM THẬT · APOLO LAWYERS · TƯ VẤN ĐÚNG VIỆC
                </textPath>
              </text>
            </motion.g>
            {/* inner ring */}
            <motion.circle
              cx="120"
              cy="120"
              r="86"
              stroke={GOLD}
              strokeOpacity="0.4"
              strokeWidth="1"
              strokeDasharray="2 8"
              style={{ transformOrigin: '120px 120px' }}
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </Layer>

        {/* Scales of justice — gentle balancing sway */}
        <Layer z={48} rx={rx} ry={ry}>
          <svg
            viewBox="0 0 240 240"
            className="absolute inset-0 h-full w-full"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* base + post */}
            <path d="M104 198 L136 198" stroke={GOLD} strokeWidth="4" />
            <path d="M111 192 L129 192 L136 198 L104 198 Z" fill={OXBLOOD} fillOpacity="0.9" />
            <line x1="120" y1="192" x2="120" y2="74" stroke={GOLD} strokeWidth="3" />
            {/* pivot finial */}
            <circle cx="120" cy="68" r="5.5" fill={GOLD} />
            {/* balancing beam + pans (sways around the pivot) */}
            <motion.g
              style={{ transformOrigin: '120px 70px' }}
              animate={sway}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <line x1="64" y1="74" x2="176" y2="66" stroke={GOLD} strokeWidth="3" />
              {/* left hanger + pan */}
              <line x1="64" y1="74" x2="56" y2="98" stroke={GOLD} strokeWidth="1.5" />
              <line x1="64" y1="74" x2="72" y2="98" stroke={GOLD} strokeWidth="1.5" />
              <path d="M48 98 Q64 116 80 98" stroke={OXBLOOD} strokeWidth="2.5" />
              {/* right hanger + pan */}
              <line x1="176" y1="66" x2="168" y2="90" stroke={GOLD} strokeWidth="1.5" />
              <line x1="176" y1="66" x2="184" y2="90" stroke={GOLD} strokeWidth="1.5" />
              <path d="M160 90 Q176 108 192 90" stroke={OXBLOOD} strokeWidth="2.5" />
            </motion.g>
          </svg>
        </Layer>

        {/* Floating statutory-citation chips */}
        <Layer z={78} rx={rx} ry={ry}>
          {CITATIONS.map((c) => (
            <motion.span
              key={c.t}
              className="absolute whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[0.62rem] tracking-wide backdrop-blur-sm"
              style={{
                left: c.x,
                top: c.y,
                color: GOLD,
                borderColor: 'color-mix(in srgb, var(--color-secondary) 35%, transparent)',
                background: 'color-mix(in srgb, var(--color-ink) 55%, transparent)',
              }}
              animate={reduce ? { opacity: 0.7 } : { y: [14, -16, 14], opacity: [0, 0.95, 0] }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: c.delay,
              }}
            >
              {c.t}
            </motion.span>
          ))}
        </Layer>
      </motion.div>
    </div>
  )
}
