# Luật Sư Trực Tuyến — luatsutructuyen.net

Vietnamese-only, scenario-based legal content site for the Apolo Legal Ecosystem
(Phase 2). Funnels every page to a single action: a phone call to the Apolo
hotline. Built with **Next.js 16 (App Router) + PayloadCMS v3 (embedded) +
Supabase Postgres + Tailwind v4**, with media stored on **Cloudflare R2**.

## Local development

```bash
npm install
npm run dev          # Next.js dev server + Payload admin at /admin
npm run build        # production build
npm run start        # serve the production build
npm run lint
```

Copy `.env.example` → `.env.local` and fill in the values (see
`PM_CREDENTIALS.md` at the workspace root for secrets). Dev uses Payload
`push: true`, so the schema syncs automatically on boot.

### Useful scripts

```bash
npm run seed:admin          # create the first admin user
npm run seed:foundation     # editorial-team author + 6 categories
npm run seed:cms            # FAQs, glossary, process + authority globals
npm run seed:static-pages   # about / privacy / terms Pages
npm run import:images <descriptor.json>   # R2/generated images → Media collection
npm run import:posts        # blog posts → Posts (links heroImage via media-map)
npx payload migrate:status  # read-only schema check
npx payload migrate         # production migrate (coordinate first — see below)
```

## Deploying to Vercel

This repo is a single Next.js app at its root — Vercel auto-detects it. The user
handles the actual deploy; the steps below are the required configuration.

### 1. Environment variables (set in the Vercel project, Production + Preview)

Every variable in `.env.example` must be set. The critical ones:

| Variable | Notes |
| --- | --- |
| `DATABASE_URI` | Supabase **Session Pooler** URI (port 5432, IPv4). Needed at **build time** too — the homepage is statically generated and queries the DB. |
| `PAYLOAD_SECRET` | 32+ random chars. Boot fails without it. |
| `NEXT_PUBLIC_SITE_URL` | Production URL, e.g. `https://luatsutructuyen.net`. |
| `R2_BUCKET`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_PUBLIC_URL` | Cloudflare R2 media storage. **Required** — without `R2_BUCKET` uploads fall back to ephemeral disk and are lost on each deploy. |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | Only used by the seed scripts. |
| `CONTACT_HUB_URL` | Contact-form aggregator (optional). |

### 2. Build settings

- Framework: **Next.js** (auto-detected). Build: `npm run build`. Install: `npm install`
  (the `postinstall` runs `patch-package`).
- Node: **22.x** (pinned via `engines` in `package.json`).
- Region: **sin1** (Singapore, closest to the Supabase Funnel project) — set in `vercel.json`.

### 3. Database migrate (after the first deploy)

Production runs with Payload `push: false`. Run the schema migration once against
the `ltt` schema on the shared Supabase Funnel project. Because the project is
shared across sites, **coordinate via the PM inbox handshake first**:

```bash
npx payload migrate
```

### 4. Custom domain

Point `luatsutructuyen.net` at the Vercel project and update `NEXT_PUBLIC_SITE_URL`.

## Architecture notes

- **Markdown bodies** (not Lexical) — `type: 'code'` fields rendered via
  `src/components/Markdown.tsx`.
- **Media → R2** via `@payloadcms/storage-s3` (`payload.config.ts`). Uploads and
  their size variants are served from the public `r2.dev` host (whitelisted in
  `next.config.ts`).
- **CMS-editable**: scenarios, blog posts, categories, FAQs, glossary, the
  homepage hero/copy, how-it-works, the Authority manifesto, about/privacy/terms,
  and the header/footer globals.
- Hotline-first funnel — all CTAs are `tel:` click-to-call via `src/lib/cta.ts`.

See `CLAUDE.md` for the full build conventions.
