#!/usr/bin/env node
/**
 * Import "Góc Luật Sư" blog posts from content/drafts/posts-batch-*.json into the
 * Posts collection via the Payload REST API. Mirrors scripts/seed-posts.mjs.
 *
 * - Merges all posts-batch-*.json files (each an array of post objects).
 * - Links heroImage by looking up post.imageKey in content/drafts/media-map.json
 *   (produced by scripts/import-images-to-media.mjs).
 * - Bylines every post to the editorial-team author.
 * - Idempotent: skips a post whose slug already exists.
 * - Staggers publishedDate deterministically over the past weeks so the blog
 *   index isn't a wall of identical dates.
 *
 * Run AFTER: seed:admin, seed:foundation, import:images, and a dev boot that
 * created the posts table. Requires SEED_ADMIN_* in env.
 */
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile, readdir } from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = path.resolve(__dirname, '..')
dotenv.config({ path: path.join(SITE_ROOT, '.env.local') })
dotenv.config({ path: path.join(SITE_ROOT, '.env') })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const EMAIL = process.env.SEED_ADMIN_EMAIL
const PASSWORD = process.env.SEED_ADMIN_PASSWORD
const DRAFTS_DIR = path.join(SITE_ROOT, 'content/drafts')

if (!EMAIL || !PASSWORD) {
  console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env.local')
  process.exit(1)
}

async function login() {
  const res = await fetch(`${SITE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  return (await res.json()).token
}

async function findBySlug(token, collection, slug) {
  const res = await fetch(
    `${SITE_URL}/api/${collection}?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  return (await res.json()).docs?.[0] ?? null
}

async function loadPosts() {
  const files = (await readdir(DRAFTS_DIR)).filter((f) => /^posts-batch-.*\.json$/.test(f)).sort()
  const all = []
  for (const f of files) {
    const arr = JSON.parse(await readFile(path.join(DRAFTS_DIR, f), 'utf8'))
    all.push(...arr)
  }
  return all
}

async function loadMediaMap() {
  try {
    return JSON.parse(await readFile(path.join(DRAFTS_DIR, 'media-map.json'), 'utf8'))
  } catch {
    console.warn('[import-posts] no media-map.json — posts will import without heroImage')
    return {}
  }
}

// Deterministic publishedDate: spread posts back from a fixed anchor, ~3 days apart.
function publishedDateFor(index) {
  const anchor = new Date('2026-05-30T09:00:00Z').getTime()
  const d = new Date(anchor - index * 3 * 24 * 60 * 60 * 1000)
  return d.toISOString().slice(0, 10)
}

async function main() {
  const posts = await loadPosts()
  const mediaMap = await loadMediaMap()
  console.log(`[import-posts] ${posts.length} posts across batches; logging in…`)
  const token = await login()

  const author = await findBySlug(token, 'authors', 'editorial-team')
  const authorId = author?.id
  if (!authorId) console.warn('[import-posts] editorial-team author missing — run seed:foundation. Continuing without author.')

  let created = 0
  let skipped = 0
  let linked = 0
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const existing = await findBySlug(token, 'posts', post.slug)
    if (existing) {
      skipped++
      console.log(`  · posts/${post.slug} exists — skip`)
      continue
    }
    const heroImage = post.imageKey ? mediaMap[post.imageKey] : undefined
    if (heroImage) linked++
    const body = {
      title: post.title,
      slug: post.slug,
      topic: post.topic,
      excerpt: post.excerpt,
      content: post.content,
      readingTime: post.readingTime,
      featured: Boolean(post.featured),
      status: 'published',
      publishedDate: publishedDateFor(i),
    }
    if (authorId) body.author = authorId
    if (heroImage) body.heroImage = heroImage

    const res = await fetch(`${SITE_URL}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`posts/${post.slug}: ${res.status} ${await res.text()}`)
    created++
    console.log(`  + posts/${post.slug}${heroImage ? ` (img #${heroImage})` : ' (no img)'}`)
  }

  console.log(`[import-posts] done. created=${created} skipped=${skipped} withImage=${linked}/${posts.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
