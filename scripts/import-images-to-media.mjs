#!/usr/bin/env node
/**
 * Bridge: R2 / generated images → Payload Media collection.
 *
 * Reads an image descriptor JSON (default: content/drafts/media-import.json) of
 * the shape:
 *   [{ "imageKey": "ai-vs-lawyer", "sourceUrl": "https://.../x.webp",
 *      "alt": "…", "caption": "…", "credit": "Nano Banana 2 generated" }, …]
 * (sourceUrl may instead be a localPath to a file on disk.)
 *
 * For each entry it fetches the bytes and POSTs a multipart upload to
 * /api/media. With the @payloadcms/storage-s3 adapter active, Payload pushes the
 * original + size variants to R2 (prefix luatsutructuyen.net/cms) and creates a
 * browsable Media doc. Writes content/drafts/media-map.json = { imageKey: mediaId }
 * which scripts/import-posts.mjs consumes to link heroImage.
 *
 * Idempotent: skips an entry whose deterministic filename already exists in Media.
 *
 * Usage:  node scripts/import-images-to-media.mjs [path-to-descriptor.json]
 * Requires the dev server running + SEED_ADMIN_EMAIL/PASSWORD in env.
 */
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = path.resolve(__dirname, '..')
dotenv.config({ path: path.join(SITE_ROOT, '.env.local') })
dotenv.config({ path: path.join(SITE_ROOT, '.env') })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const EMAIL = process.env.SEED_ADMIN_EMAIL
const PASSWORD = process.env.SEED_ADMIN_PASSWORD
const DESCRIPTOR = process.argv[2] || path.join(SITE_ROOT, 'content/drafts/media-import.json')
const MAP_OUT = path.join(SITE_ROOT, 'content/drafts/media-map.json')

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

async function findByFilename(token, filename) {
  const res = await fetch(
    `${SITE_URL}/api/media?where[filename][equals]=${encodeURIComponent(filename)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  return (await res.json()).docs?.[0] ?? null
}

async function loadBytes(entry) {
  if (entry.localPath) {
    const buf = await readFile(path.isAbsolute(entry.localPath) ? entry.localPath : path.join(SITE_ROOT, entry.localPath))
    return new Uint8Array(buf)
  }
  const res = await fetch(entry.sourceUrl)
  if (!res.ok) throw new Error(`fetch ${entry.sourceUrl}: ${res.status}`)
  return new Uint8Array(await res.arrayBuffer())
}

async function main() {
  console.log('[import-images] reading', DESCRIPTOR)
  const entries = JSON.parse(await readFile(DESCRIPTOR, 'utf8'))
  console.log(`[import-images] ${entries.length} entries; logging in…`)
  const token = await login()

  const map = {}
  for (const raw of entries) {
    // Normalize: accept our descriptor shape OR the generator's assets.json shape
    // ({ id, cdn_url, alt }). imageKey is the stable join key used by import-posts.
    const entry = {
      imageKey: raw.imageKey || raw.id,
      sourceUrl: raw.sourceUrl || raw.cdn_url || raw.url,
      localPath: raw.localPath,
      alt: raw.alt,
      caption: raw.caption,
      credit: raw.credit,
    }
    if (!entry.imageKey || (!entry.sourceUrl && !entry.localPath)) {
      console.warn('  ! skipping entry with no imageKey/source:', JSON.stringify(raw).slice(0, 80))
      continue
    }
    const filename = `${entry.imageKey}.webp`
    const existing = await findByFilename(token, filename)
    if (existing) {
      map[entry.imageKey] = existing.id
      console.log(`  · media/${filename} exists (#${existing.id}) — skip`)
      continue
    }

    const bytes = await loadBytes(entry)
    const form = new FormData()
    form.append('file', new Blob([bytes], { type: 'image/webp' }), filename)
    // Payload v3 multipart uploads expect document fields as a single _payload JSON blob.
    form.append(
      '_payload',
      JSON.stringify({
        alt: entry.alt || entry.imageKey,
        caption: entry.caption || undefined,
        credit: entry.credit || 'AI generated (Nano Banana 2) via image-generator',
      }),
    )

    const res = await fetch(`${SITE_URL}/api/media`, {
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: form,
    })
    if (!res.ok) throw new Error(`media/${filename}: ${res.status} ${await res.text()}`)
    const doc = (await res.json()).doc
    map[entry.imageKey] = doc.id
    console.log(`  + media/${filename} → #${doc.id}  ${doc.url || ''}`)
  }

  const { writeFile } = await import('node:fs/promises')
  await writeFile(MAP_OUT, JSON.stringify(map, null, 2))
  console.log(`[import-images] wrote ${MAP_OUT} (${Object.keys(map).length} keys)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
