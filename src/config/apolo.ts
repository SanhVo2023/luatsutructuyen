/**
 * APOLO LAWYERS — canonical constants
 *
 * Single source of truth for: legal name, addresses, phones, parent-brand URLs,
 * and English/Vietnamese terminology glossary. Every site in the ecosystem
 * imports from this file (copied to `src/config/apolo.ts` during scaffold) and
 * uses these constants in Footer, metadata, Organization JSON-LD, and inline
 * copy — NEVER hardcode strings.
 *
 * Sources:
 *   - Address / phones / company name: workspace-root `address.txt` (Mr Hien 2026-05-11, post-2025
 *     administrative-merger official text). Words and punctuation are verbatim — do not paraphrase.
 *   - Glossary: Mr Hien 2026-04-20 (PM_INBOX) — consistency requirement for EN lawyer terminology
 *   - Parent-brand cross-link rule: Mr Hien 2026-05-11, SITE_BUILD_FEEDBACK.md Issue 13.
 *     VN content links to apolo.com.vn ONLY. EN content links to apololawyers.com ONLY.
 *     The two parent-brand sites must not cross-link.
 *
 * If any value here drifts from `address.txt`, address.txt wins. Update both.
 */

export type Locale = 'vi' | 'en'

export const APOLO = {
  vn: {
    legalName:
      'Công ty Luật Apolo Lawyers, thuộc Đoàn Luật sư TP. Hồ Chí Minh, trực thuộc Liên đoàn Luật sư Việt Nam',
    shortName: 'Công ty Luật Apolo Lawyers',
    address: '108 Trần Đình Xu, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh',
    phones: ['(028) 66.701.709', '0908.043.086'],
    callCenter: '0903.419.479',
    email: 'contact@apolo.com.vn',
    parentBrandUrl: 'https://www.apolo.com.vn',
    glossary: {
      lawyer: 'Luật sư',
      managingPartner: 'Luật sư Điều hành',
      lawFirm: 'Công ty Luật',
      practiceAreas: 'Lĩnh vực hành nghề',
      barAssociation: 'Đoàn Luật sư',
      barFederation: 'Liên đoàn Luật sư Việt Nam',
    },
  },
  en: {
    legalName:
      'APOLO LAWYERS - Solicitors & Litigators, a law practice organization belonging to the Ho Chi Minh City Bar Association, under the Vietnam Bar Federation',
    shortName: 'APOLO LAWYERS - Solicitors & Litigators',
    address: '108 Tran Dinh Xu Street, Cau Ong Lanh Ward, Ho Chi Minh City, Vietnam',
    phones: ['(+8428) 66.701.709', '(+84) 908.043.086'],
    hotline: '(+84) 903.600.347',
    callCenter: '(+84) 903.419.479',
    email: 'contact@apolo.com.vn',
    parentBrandUrl: 'https://www.apololawyers.com',
    branch: {
      name: 'EAST SAI GON BRANCH - APOLO LAWYERS LAWFIRM',
      address:
        '9th/F, Tower K&M Building, 33 Ung Van Khiem Street, Thanh My Tay Ward, Ho Chi Minh City, Vietnam',
      phones: ['(+8428) 35.059.349', '(+84) 908.097.068'],
      hotline: '(+84) 979.48.98.79',
    },
    glossary: {
      lawyer: 'Attorney',
      managingPartner: 'Managing Partner',
      lawFirm: 'law firm',
      practiceAreas: 'practice areas',
      barAssociation: 'Bar Association',
      barFederation: 'Vietnam Bar Federation',
      editorialByline: 'Apolo Editorial Team',
    },
  },
} as const

/**
 * Government-source allowlist for citations and external links (Mr Hien 2026-05-11).
 * Builders strip any inline citation link whose host does NOT match one of these.
 * Internal ecosystem cross-links are unaffected by this rule.
 */
export const GOV_SOURCE_HOST_PATTERNS = [
  /\.gov\.vn$/i,
  /\.chinhphu\.vn$/i,
  /\.quochoi\.vn$/i,
  /\.toaan\.gov\.vn$/i,
  /\.moj\.gov\.vn$/i,
  /^vbpl\.vn$/i,
] as const

export function isGovSource(host: string): boolean {
  const h = host.toLowerCase().replace(/^www\./, '')
  return GOV_SOURCE_HOST_PATTERNS.some((re) => re.test(h))
}

/**
 * Parent-brand cross-link helper. Pass the page locale; receive the canonical
 * parent-brand URL. Use this in Footer.tsx, Organization JSON-LD, inline
 * "Apolo Lawyers" mentions. Never hardcode the URL.
 *
 * Note: APOLO uses keys 'vn'/'en' but the Locale type uses ISO codes 'vi'/'en'.
 * Map 'vi' → 'vn' here. Upstream shared-asset has the same mismatch; flagged in
 * PM_INBOX 2026-05-17 for canonicalization.
 */
export function parentBrandUrl(locale: Locale): string {
  const key = locale === 'vi' ? ('vn' as const) : locale
  return APOLO[key].parentBrandUrl
}

/**
 * Canonical editorial byline used across all sites for AI-drafted SEO content.
 * Mr Hien rule (Issue 10): never credit Mr Hien for articles he did not personally author.
 * Slug `editorial-team` is shared across sites for consistency.
 */
export const EDITORIAL_AUTHOR = {
  slug: 'editorial-team',
  name: 'Apolo Editorial Team',
} as const
