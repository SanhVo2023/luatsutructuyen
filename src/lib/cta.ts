/**
 * Conversion CTA constants — the site's single funnel is a phone call to the
 * Apolo hotline. Sourced from `src/config/apolo.ts` (never hardcode the number).
 *
 * As of the hotline pivot (owner decision), the site no longer funnels to
 * luatsutuvan.net; every CTA drives a call, with the contact form as a
 * "request a callback" fallback and Zalo as chat.
 */
import { APOLO } from '@/config/apolo'

/** Display form, e.g. "0903.419.479". */
export const HOTLINE = APOLO.vn.callCenter

/** Spaced display form for headlines, e.g. "0903 419 479". */
export const HOTLINE_PRETTY = HOTLINE.replace(/\./g, ' ')

/** `tel:` href with non-digits stripped (same pattern as Header/Footer). */
export const HOTLINE_TEL = `tel:${HOTLINE.replace(/[^\d+]/g, '')}`

/** Zalo Official Account chat link. */
export const ZALO_URL = 'https://zalo.me/apololawyers'
