import { Be_Vietnam_Pro, Lora, JetBrains_Mono } from 'next/font/google'

/**
 * Modern Editorial Ink type system.
 *
 * - Lora (display serif) — headlines, pull-quotes, drop-caps. Ships a `vietnamese`
 *   subset so diacritics in titles ("Tình huống", "Câu chuyện") render correctly.
 *   Replaces the old italic-only Playfair (which lacked Vietnamese coverage).
 * - Be Vietnam Pro (body + UI) — best-in-class Vietnamese diacritics. Weights now
 *   include 800 for heavy UI moments.
 * - JetBrains Mono (Latin/numerals ONLY) — index numerals ("01 — 06"), dates,
 *   "EST." labels. Never used for Vietnamese text (no diacritic coverage).
 */
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
})

export const lora = Lora({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})
