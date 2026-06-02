#!/usr/bin/env node
/**
 * Seed foundation records via the Payload REST API:
 *   - 1 Author: "Apolo Editorial Team" (slug `editorial-team`)
 *     Canonical byline for AI-drafted SEO content (Mr Hien Issue 10).
 *   - 6 Categories from PRD §5:
 *     tinh-huong-dan-su, tinh-huong-ly-hon, tinh-huong-dat-dai,
 *     tinh-huong-doanh-nghiep, co-nen-kien-khong, can-chuan-bi-gi
 *
 * Idempotent: skips records whose slug already exists.
 *
 * Run AFTER scripts/seed-admin.mjs.
 */
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = path.resolve(__dirname, '..')
dotenv.config({ path: path.join(SITE_ROOT, '.env.local') })
dotenv.config({ path: path.join(SITE_ROOT, '.env') })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const EMAIL = process.env.SEED_ADMIN_EMAIL
const PASSWORD = process.env.SEED_ADMIN_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env')
  process.exit(1)
}

const CATEGORIES = [
  {
    name: 'Tình huống dân sự',
    slug: 'tinh-huong-dan-su',
    description:
      'Tranh chấp hợp đồng, đòi nợ, hàng xóm, quyền lợi người tiêu dùng — các tình huống dân sự thường gặp.',
    icon: 'Scale',
    color: 'terracotta',
    order: 1,
  },
  {
    name: 'Tình huống ly hôn',
    slug: 'tinh-huong-ly-hon',
    description:
      'Chia tài sản, quyền nuôi con, bạo hành, tài sản giấu sau ly hôn — những tình huống gia đình nhạy cảm.',
    icon: 'Heart',
    color: 'clay',
    order: 2,
  },
  {
    name: 'Tình huống đất đai',
    slug: 'tinh-huong-dat-dai',
    description:
      'Tranh chấp ranh giới, đất thừa kế, sổ đỏ bị chiếm, sai phạm xây dựng — vấn đề đất đai và bất động sản.',
    icon: 'Map',
    color: 'olive',
    order: 3,
  },
  {
    name: 'Tình huống doanh nghiệp',
    slug: 'tinh-huong-doanh-nghiep',
    description:
      'Đối tác chiếm đoạt, nhân viên kiện công ty, vi phạm hợp đồng, thu hồi nợ — vấn đề kinh doanh.',
    icon: 'Briefcase',
    color: 'rust',
    order: 4,
  },
  {
    name: 'Có nên kiện không?',
    slug: 'co-nen-kien-khong',
    description:
      'Đánh giá thẳng thắn ưu nhược điểm của việc khởi kiện cho từng loại tình huống cụ thể.',
    icon: 'HelpCircle',
    color: 'terracotta',
    order: 5,
  },
  {
    name: 'Cần chuẩn bị gì?',
    slug: 'can-chuan-bi-gi',
    description:
      'Hướng dẫn chuẩn bị hồ sơ, chứng cứ, tài liệu cho từng tình huống pháp lý.',
    icon: 'ClipboardCheck',
    color: 'clay',
    order: 6,
  },
]

const EDITORIAL_AUTHOR = {
  name: 'Apolo Editorial Team',
  slug: 'editorial-team',
  role: 'Đội ngũ Biên tập Apolo',
  bio: 'Đội ngũ biên tập của Công ty Luật Apolo Lawyers — các luật sư, chuyên viên pháp lý cùng biên soạn nội dung dựa trên quy định pháp luật Việt Nam hiện hành.',
}

async function login() {
  const res = await fetch(`${SITE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.token
}

async function findBySlug(token, collection, slug) {
  const res = await fetch(
    `${SITE_URL}/api/${collection}?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] ?? null
}

async function ensure(token, collection, record) {
  const existing = await findBySlug(token, collection, record.slug)
  if (existing) {
    console.log(`  · ${collection}/${record.slug} exists — skip`)
    return existing.id
  }
  const res = await fetch(`${SITE_URL}/api/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(record),
  })
  if (!res.ok) {
    throw new Error(`${collection}/${record.slug}: ${res.status} ${await res.text()}`)
  }
  const data = await res.json()
  console.log(`  + ${collection}/${record.slug}`)
  return data.doc?.id ?? data.id
}

async function main() {
  console.log('[seed-foundation] logging in…')
  const token = await login()

  console.log('[seed-foundation] authors…')
  await ensure(token, 'authors', EDITORIAL_AUTHOR)

  console.log('[seed-foundation] categories…')
  for (const cat of CATEGORIES) await ensure(token, 'categories', cat)

  console.log('[seed-foundation] done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
