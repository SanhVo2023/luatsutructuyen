#!/usr/bin/env node
/**
 * Rebuild content/drafts/media-map.json from the Media collection.
 * Maps every media doc's filename (minus extension) → its id, so import-posts.mjs
 * can resolve heroImage by imageKey regardless of which generator run last wrote
 * the (per-run, non-merged) media-map.json. Idempotent + safe to re-run.
 */
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFile } from 'node:fs/promises'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: path.join(ROOT, '.env.local') })
dotenv.config({ path: path.join(ROOT, '.env') })
const S = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const r = await fetch(`${S}/api/users/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: process.env.SEED_ADMIN_EMAIL, password: process.env.SEED_ADMIN_PASSWORD }) })
const token = (await r.json()).token
const res = await fetch(`${S}/api/media?limit=500&depth=0`, { headers: { Authorization: `JWT ${token}` } })
const docs = (await res.json()).docs || []
const map = {}
for (const d of docs) {
  if (!d.filename) continue
  const key = String(d.filename).replace(/\.[a-z0-9]+$/i, '')
  map[key] = d.id
}
await writeFile(path.join(ROOT, 'content/drafts/media-map.json'), JSON.stringify(map, null, 2))
console.log(`[rebuild-media-map] ${Object.keys(map).length} media → content/drafts/media-map.json`)
console.log(Object.keys(map).join(', '))
