#!/usr/bin/env node
/**
 * Seed the `homepage` global with the 2026-06 redesign hero copy + image, so the
 * CMS matches the redesigned homepage (and the owner can edit it). Run AFTER
 * seed:cms and import:images. Idempotent (a global update is upsert-by-nature).
 * heroImage is linked to the `home-hero-authority` media doc via media-map.json.
 */
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: path.join(ROOT, '.env.local') })
dotenv.config({ path: path.join(ROOT, '.env') })
const S = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

let mediaMap = {}
try {
  mediaMap = JSON.parse(await readFile(path.join(ROOT, 'content/drafts/media-map.json'), 'utf8'))
} catch {}

const data = {
  heroKicker: 'Luật sư thật · Trách nhiệm thật',
  heroHeadline: 'Câu trả lời miễn phí không chịu trách nhiệm.',
  heroHighlight: 'Luật sư thật thì có.',
  heroSubhead:
    'Mỗi vụ việc một khác. Gọi luật sư Apolo để được tư vấn đúng trường hợp của bạn — buổi đầu miễn phí, bảo mật tuyệt đối.',
  heroCtaLabel: 'Gọi ngay 0903.419.479',
  heroCtaTel: 'tel:0903419479',
  trustBadges: [
    { text: 'Buổi đầu miễn phí' },
    { text: 'Trích dẫn điều luật' },
    { text: 'Bảo mật tuyệt đối' },
  ],
  ticker: [
    { text: 'Hàng xóm lấn ranh đất' },
    { text: 'Vợ/chồng giấu tài sản khi ly hôn' },
    { text: 'Đối tác nợ tiền hàng kéo dài' },
    { text: 'Cổ đông nhỏ bị gạt khỏi công ty' },
    { text: 'Mua nhà giấy tay không sổ đỏ' },
    { text: 'Giành quyền nuôi con' },
    { text: 'Chủ đầu tư chậm bàn giao căn hộ' },
  ],
  featuredKicker: 'Câu chuyện trong tuần',
  featuredHeading: 'Tình huống được tìm đọc nhiều nhất',
  categoriesKicker: 'Chủ đề pháp lý',
  categoriesHeading: 'Tình huống của bạn thuộc nhóm nào?',
  ctaHeading: 'Đừng để một câu trả lời miễn phí quyết định cả vụ việc của bạn',
  ctaSubhead:
    'Luật sư Apolo Lawyers nghe trường hợp cụ thể của bạn và tư vấn có trách nhiệm — phản hồi nhanh, buổi đầu miễn phí, bảo mật tuyệt đối.',
}
if (mediaMap['home-hero-authority']) data.heroImage = mediaMap['home-hero-authority']

const r = await fetch(`${S}/api/users/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: process.env.SEED_ADMIN_EMAIL, password: process.env.SEED_ADMIN_PASSWORD }) })
const token = (await r.json()).token
const res = await fetch(`${S}/api/globals/homepage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
  body: JSON.stringify(data),
})
if (!res.ok) throw new Error(`seed-homepage: ${res.status} ${await res.text()}`)
console.log(`[seed-homepage] homepage global updated${data.heroImage ? ` (heroImage #${data.heroImage})` : ''}`)
