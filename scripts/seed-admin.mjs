#!/usr/bin/env node
/**
 * Seed the first admin user via the Payload REST API.
 * Run AFTER `npm run dev` is up and the first migration has applied.
 *
 * Idempotent: if a user with SEED_ADMIN_EMAIL already exists, exits cleanly.
 *
 * Required env:
 *   NEXT_PUBLIC_SITE_URL=http://localhost:3000
 *   SEED_ADMIN_EMAIL=admin@...
 *   SEED_ADMIN_PASSWORD=...
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

async function main() {
  // Payload's `first-register` endpoint creates the very first user without auth.
  // After that, additional users require an authenticated admin token.
  const tryFirstRegister = await fetch(`${SITE_URL}/api/users/first-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: EMAIL,
      password: PASSWORD,
      name: 'Apolo Admin',
      role: 'admin',
    }),
  })

  if (tryFirstRegister.ok) {
    console.log(`[seed-admin] created first admin: ${EMAIL}`)
    return
  }

  // If first-register is disabled (a user already exists), fall back to login check.
  const loginCheck = await fetch(`${SITE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (loginCheck.ok) {
    console.log(`[seed-admin] admin already exists and credentials work: ${EMAIL}`)
    return
  }

  const text = await tryFirstRegister.text()
  console.error(`[seed-admin] first-register failed (${tryFirstRegister.status}): ${text}`)
  console.error(
    '[seed-admin] If a user already exists with a different password, create the admin manually at /admin or via DB.',
  )
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
