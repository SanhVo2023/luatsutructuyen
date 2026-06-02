/**
 * Mapped shared imagery for luatsutructuyen.net.
 *
 * The site is VN-only and uses a warm terracotta/cream magazine palette. The
 * shared r2-shared library was originally generated for vothienhien.com's dark
 * luxury aesthetic — we blend it into our palette with gradient overlays in CSS.
 *
 * Source manifest: shared-assets/r2-shared/MANIFEST.md
 */

const R2 = 'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/vothienhien.com'
const R2_LTT = 'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/luatsutructuyen.net'

/**
 * Site-native "Modern Editorial Ink" imagery — warm editorial documentary photos
 * generated for luatsutructuyen.net (tools/image-generator/headless.mjs).
 * Replaces the dark-luxury vothienhien.com assets as the primary look.
 */
export const LTT = {
  hero: `${R2_LTT}/hero/ltt-hero-editorial-e2dedf6f.webp`,
  authority: `${R2_LTT}/background/ltt-authority-atmosphere-b5d0abfd.webp`,
  // 2026-06 homepage-redesign hero (strong, authority-forward portrait).
  // Imported to Media as `home-hero-authority`; the homepage prefers the CMS
  // Homepage.heroImage and falls back to this constant.
  heroPrimary: `${R2_LTT}/cms/home-hero-authority.webp`,
  // Authority-pivot imagery (professional Apolo law-firm look)
  heroAuthority: `${R2_LTT}/hero/ltt-hero-authority-3274aa79.webp`,
  firmOffice: `${R2_LTT}/background/ltt-firm-office-3e380d27.webp`,
  blogCover: `${R2_LTT}/blog/ltt-goc-luatsu-cover-535bcf9b.webp`,
  coverDanSu: `${R2_LTT}/hub/ltt-cover-dan-su-0ede9998.webp`,
  coverLyHon: `${R2_LTT}/hub/ltt-cover-ly-hon-d959bcf4.webp`,
  coverDatDai: `${R2_LTT}/hub/ltt-cover-dat-dai-42fb6df3.webp`,
  coverDoanhNghiep: `${R2_LTT}/hub/ltt-cover-doanh-nghiep-acc29c98.webp`,
  coverCoNenKien: `${R2_LTT}/hub/ltt-cover-co-nen-kien-62a3e0e2.webp`,
  coverChuanBi: `${R2_LTT}/hub/ltt-cover-chuan-bi-a53cf489.webp`,
} as const

/** Practice-area imagery — abstract, no people, safe for any site. */
export const SHARED = {
  scales: `${R2}/content/practice-civil-9e32fb02.webp`,            // gold scales — civil disputes
  rings: `${R2}/content/practice-family-c50dd275.webp`,            // wedding rings — family / divorce
  boardroom: `${R2}/content/practice-corporate-5f2c5501.webp`,     // boardroom — business
  handshake: `${R2}/content/practice-labor-aec105be.webp`,         // gold handshake — labor / negotiation
  columns: `${R2}/content/practice-criminal-59f8f545.webp`,        // courthouse columns — litigation, "should I sue"
  gavel: `${R2}/content/practice-commercial-b5a1a6d9.webp`,        // gavel — commercial
  bgLibrary: `${R2}/background/bg-library-f8675605.webp`,          // law library
  bgMarble: `${R2}/background/bg-marble-5a92903f.webp`,            // dark marble texture
  bgHallway: `${R2}/background/bg-office-hallway-e2bffaa5.webp`,   // ultra-wide office hallway
  goldStroke: `${R2}/content/accent-gold-stroke-4de2a341.webp`,    // decorative gold brush stroke
  signing: `${R2}/content/section-document-signing-63dc5758.webp`, // hands signing
  articleGavel: `${R2}/content/article-criminal-defense-3fb4bf85.webp`, // close-up gavel
} as const

/**
 * Per-category fallback imagery. When a category has no `heroImage` uploaded
 * via the CMS, the frontend renders this shared asset with a category-color
 * overlay so the grid still has visual texture.
 */
export const CATEGORY_IMAGERY: Record<
  string,
  { src: string; alt: string; tint: 'terracotta' | 'clay' | 'olive' | 'rust' }
> = {
  'tinh-huong-dan-su': {
    src: LTT.coverDanSu,
    alt: 'Hai người xem lại hợp đồng dân sự trên bàn gỗ — tình huống dân sự',
    tint: 'terracotta',
  },
  'tinh-huong-ly-hon': {
    src: LTT.coverLyHon,
    alt: 'Chiếc nhẫn cưới đặt cạnh lá thư bên cửa sổ — tình huống ly hôn',
    tint: 'clay',
  },
  'tinh-huong-dat-dai': {
    src: LTT.coverDatDai,
    alt: 'Sổ đỏ và bản đồ thửa đất trên bàn — tình huống đất đai',
    tint: 'olive',
  },
  'tinh-huong-doanh-nghiep': {
    src: LTT.coverDoanhNghiep,
    alt: 'Chủ doanh nghiệp nhỏ xem lại hóa đơn — tình huống kinh doanh',
    tint: 'rust',
  },
  'co-nen-kien-khong': {
    src: LTT.coverCoNenKien,
    alt: 'Cân nhắc quyết định bên tài liệu — có nên kiện hay thương lượng',
    tint: 'terracotta',
  },
  'can-chuan-bi-gi': {
    src: LTT.coverChuanBi,
    alt: 'Giấy tờ pháp lý được sắp xếp gọn gàng — cần chuẩn bị tài liệu',
    tint: 'clay',
  },
}

export function getCategoryImagery(slug: string | undefined | null) {
  if (!slug) return null
  return CATEGORY_IMAGERY[slug] ?? null
}
