#!/usr/bin/env node
/**
 * Markdown content importer for luatsutructuyen.net.
 * Copied from shared-assets/scripts/import-markdown-content.mjs — CONFIG block
 * below is edited for this site (scenarios collection, VN-only, has categories).
 *
 * Usage:
 *   node scripts/import-seo-content.mjs           — import all
 *   node scripts/import-seo-content.mjs --dry-run — validate only, no POSTs
 *
 * Validates each scenario against the Quality Rubric (2,500–4,000 words,
 * ≥5 statutory citations, internal CTA link to /lien-he) before POSTing.
 * Articles failing validation are skipped and logged — fix the source and re-run.
 *
 * Required env:
 *   NEXT_PUBLIC_SITE_URL=http://localhost:3000
 *   SEED_ADMIN_EMAIL=...
 *   SEED_ADMIN_PASSWORD=...
 */
import dotenv from 'dotenv'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __envDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: path.join(__envDir, '.env.local') })
dotenv.config({ path: path.join(__envDir, '.env') })

// ====================================================================
// CONFIG — edited for luatsutructuyen.net
// ====================================================================
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const CONFIG = {
  draftsFile: path.resolve(__dirname, '..', 'content', 'drafts', 'scenarios.json'),
  collectionSlug: 'scenarios',
  contentField: 'content',
  excerptField: 'hookText',
  titleField: 'title',
  hasCategory: true,
  hasToc: true,
  isBilingual: false, // VN-only site
}
// ====================================================================

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD
const DRY_RUN = process.argv.includes('--dry-run')

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env')
  process.exit(1)
}

const CITATION_RE = {
  vi: /\((Điều|Khoản|Án lệ|Nghị định|Thông tư|Luật)\s+\d/g,
  en: /\((Article|Section|Precedent|Decree|Circular|Act)\s+\d/g,
}

const CTA_INTERNAL_LINK_RE = /\]\((\/lien-he|\/contact|\/lien-he-luat-su|\/dat-lich)/i

function validateArticle(draft, locale) {
  const errors = []
  const body = draft[locale]?.body
  if (!body || typeof body !== 'string') {
    errors.push(`missing ${locale}.body`)
    return errors
  }

  if (body.includes('<')) {
    const stripped = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '')
    if (/<[a-zA-Z!]/.test(stripped)) {
      errors.push(`raw HTML in ${locale}.body — markdown subset disallows HTML`)
    }
  }

  if (/^[^\n]+\n=+\s*$/m.test(body) || /^[^\n]+\n-+\s*$/m.test(body)) {
    errors.push(`setext headings in ${locale}.body — use ATX (## H2) only`)
  }

  const words = body.split(/\s+/).filter(Boolean).length
  if (words < 2500 || words > 4000) {
    errors.push(`${locale} word count ${words}, expected 2500–4000`)
  }

  const citations = (body.match(CITATION_RE[locale]) || []).length
  if (citations < 5) {
    errors.push(`${locale} only ${citations} statutory citations, expected ≥5`)
  }

  if (!CTA_INTERNAL_LINK_RE.test(body)) {
    errors.push(`${locale} body has no internal CTA link (/lien-he)`)
  }

  return errors
}

/**
 * IMPORTANT: this slugifier must produce IDs identical to rehype-slug's defaults
 * (github-slugger). If they diverge, the side-TOC jump-links in <ScenarioPage>
 * won't resolve to the actual rendered <h2 id=...> elements.
 */
import GithubSlugger from 'github-slugger'

function extractToc(md) {
  const slugger = new GithubSlugger()
  const items = []
  const lines = md.split(/\r?\n/)
  let inFence = false
  for (const line of lines) {
    if (/^```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (m) {
      const level = m[1].length
      const label = m[2].trim()
      items.push({ level, label, anchor: slugger.slug(label) })
    }
  }
  return items
}

async function login() {
  const res = await fetch(`${SITE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.token
}

async function loadCategoryMap(token) {
  if (!CONFIG.hasCategory) return {}
  const res = await fetch(`${SITE_URL}/api/categories?limit=50`, {
    headers: { Authorization: `JWT ${token}` },
  })
  if (!res.ok) throw new Error(`Category fetch failed: ${res.status}`)
  const data = await res.json()
  const map = {}
  for (const c of data.docs) map[c.slug] = c.id
  return map
}

async function findBySlug(token, slug) {
  const res = await fetch(
    `${SITE_URL}/api/${CONFIG.collectionSlug}?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] ?? null
}

function buildPayload(draft, locale) {
  const body = draft[locale]
  const out = {
    [CONFIG.titleField]: body.title,
    [CONFIG.excerptField]: body.excerpt,
    [CONFIG.contentField]: body.body,
  }
  if (CONFIG.hasToc) out.tocItems = extractToc(body.body)
  return out
}

async function createOrUpdate(token, draft, categoryId) {
  const existing = await findBySlug(token, draft.slug)
  const primaryLocale = CONFIG.isBilingual ? 'vi' : draft.en ? 'en' : 'vi'

  const primaryBody = {
    slug: draft.slug,
    status: draft.status || 'published',
    publishedDate: draft.publishedDate,
    updatedDate: draft.updatedDate,
    ...(CONFIG.hasCategory && categoryId ? { category: categoryId } : {}),
    ...buildPayload(draft, primaryLocale),
  }

  if (DRY_RUN) {
    return { id: existing?.id ?? 'dry-run', existed: Boolean(existing), dryRun: true }
  }

  if (existing) {
    const patch = await fetch(`${SITE_URL}/api/${CONFIG.collectionSlug}/${existing.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(primaryBody),
    })
    if (!patch.ok)
      throw new Error(`Patch ${draft.slug}: ${patch.status} ${await patch.text()}`)
    return { id: existing.id, existed: true }
  }

  const post = await fetch(`${SITE_URL}/api/${CONFIG.collectionSlug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(primaryBody),
  })
  if (!post.ok)
    throw new Error(`Post ${draft.slug}: ${post.status} ${await post.text()}`)
  const doc = await post.json()
  return { id: doc.doc?.id ?? doc.id, existed: false }
}

async function main() {
  const drafts = JSON.parse(await fs.readFile(CONFIG.draftsFile, 'utf8'))
  console.log(`[import] ${drafts.length} drafts loaded from ${CONFIG.draftsFile}`)
  if (DRY_RUN) console.log('[import] DRY RUN — no writes will happen')

  const validated = []
  let skipped = 0
  for (const draft of drafts) {
    const errors = validateArticle(draft, 'vi')
    if (errors.length) {
      skipped += 1
      console.error(`  ✗ SKIP ${draft.slug}: ${errors.join('; ')}`)
    } else {
      validated.push(draft)
    }
  }
  console.log(`[import] validation: ${validated.length} pass, ${skipped} skipped`)
  if (validated.length === 0) {
    console.error('[import] nothing to import — fix validation errors first')
    process.exit(1)
  }
  if (DRY_RUN) {
    console.log('[import] dry-run finished — validation only')
    return
  }

  const token = await login()
  const catMap = await loadCategoryMap(token)

  if (CONFIG.hasCategory) {
    const missing = validated.filter((d) => !catMap[d.category]).map((d) => d.category)
    if (missing.length) {
      console.error(`Missing categories: ${[...new Set(missing)].join(', ')}`)
      console.error('Run `npm run seed:foundation` first.')
      process.exit(1)
    }
  }

  let created = 0
  let updated = 0
  let failed = 0
  for (const [idx, draft] of validated.entries()) {
    try {
      const { existed } = await createOrUpdate(token, draft, catMap[draft.category])
      if (existed) updated += 1
      else created += 1
      process.stdout.write(
        `  [${String(idx + 1).padStart(3)}/${validated.length}] ${existed ? '↻' : '+'} ${draft.slug}\n`,
      )
    } catch (e) {
      failed += 1
      console.error(`  [${idx + 1}] ✗ ${draft.slug}: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 200))
  }

  console.log(
    `[import] done. created=${created}, updated=${updated}, failed=${failed}, validation-skipped=${skipped}`,
  )
  if (failed > 0 || skipped > 0) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
