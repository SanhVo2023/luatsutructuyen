# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**luatsutructuyen.net** — Vietnamese-only, scenario-based content site for the Apolo Legal Ecosystem (Phase 2). It tells relatable real-life legal stories ("neighbor built on my land", "spouse hiding assets in divorce") and — as of the 2026-06-01 owner pivot — **funnels every page to a single action: a phone call to the Apolo hotline (`0903.419.479`)** for consultation. The positioning angle is **"The Authority Gap"**: free online/AI legal answers carry no accountability/authority/context and only a qualified luật sư can truly help. ~100 SEO scenario articles + 6 category hubs + a "Góc Luật Sư" blog + utility pages.

> **Funnel deviation (owner-approved):** the ecosystem rule says this site feeds `luatsutuvan.net`. The owner overrode that on 2026-06-01 — the site now drives **hotline calls only** (no luatsutuvan.net links, no UTM). CTAs use `src/lib/cta.ts` (`HOTLINE_TEL`). PM should log this in `PM_INBOX.md`.

**Current build state** (as of 2026-06-01): Phases A–E substantially in place. Production `npm run build` is green (`BUILD_EXIT=0`, see `.build-clean.log`).

> **2026-06-02 update (CMS images + 40+ blog + full editability + homepage redesign).** Production `npm run build` GREEN (48 routes, TS clean).
> - **Media now persists to Cloudflare R2** via `@payloadcms/storage-s3` in `payload.config.ts` (mirrors `hub/`): bucket `apolowebsite`, prefix `luatsutructuyen.net/cms`, served from the public `r2.dev` host. Admin/API uploads + their size variants land in R2 (verified round-trip). R2 creds live in `.env.local` (`R2_BUCKET/ACCOUNT_ID/ACCESS_KEY_ID/SECRET_ACCESS_KEY/ENDPOINT/PUBLIC_URL`) — **must be mirrored to Vercel env at deploy**. Adapter auto-disables if `R2_BUCKET` is unset.
> - **Image→CMS bridge**: `scripts/import-images-to-media.mjs` uploads R2/generated images through the Local-API-equivalent REST upload so they become browsable Media docs; `scripts/rebuild-media-map.mjs` rebuilds `content/drafts/media-map.json` (imageKey→mediaId). Blog/hero imagery generated via `tools/image-generator/headless.mjs` (16 new assets in `/cms`).
> - **Blog**: 44 published posts (`scripts/import-posts.mjs` from `content/drafts/posts-batch-*.json`, each linked to a heroImage). 41 carry images.
> - **New CMS editability**: collections `Faqs`, `GlossaryTerms`; globals `Homepage`, `Process`, `AuthorityManifesto` (none on the SEO plugin). Pages `/hoi-dap /thuat-ngu /quy-trinh /vi-sao-luat-su /ve-chung-toi` read CMS with hardcoded fallbacks. Seeds: `npm run seed:cms` + `scripts/seed-homepage.mjs` (hero copy/image). `src/content/*.ts` kept as fallbacks.
> - **Homepage redesigned**: concise dark-ink hero (1 headline + 1 line + phone CTA, strong R2 image visible on mobile, magazine "issue number" gimmick removed), de-boxed cards, ivory credentials bar, mobile one-tap call button in header. Hero copy/image come from the `homepage` global.
> - **Deploy gate**: new tables (`faqs`, `glossary_terms`) + new globals need a coordinated `npx payload migrate` (PM_INBOX handshake), and Vercel needs the R2_* env vars. See [[ltt-deploy-pending-2026-06]].

- **Design**: "Modern Editorial Ink" (2026-06-01 redesign) — ink-on-ivory, oxblood + gold accents. Fonts now **Lora** (display serif, `--font-display`) + **Be Vietnam Pro** (body) + **JetBrains Mono** (numerals/labels) via `src/lib/fonts.ts`. Palette/utilities/keyframes in `src/app/globals.css`. (Playfair Display was removed — it lacked Vietnamese.) Rich motion library in `src/components/animations/` (most now wired up).
- **Stack**: Next 16.2.2 + Payload 3.81 + Tailwind v4.
- **Database**: Supabase Funnel `zxmdegfnjbvytjnwfhfq`, schema `ltt`. **9 collections** (`Authors`, `Categories`, `ContactSubmissions`, `Media`, `Navigation`, `Pages`, `Posts`, `Scenarios`, `Users`) + 3 globals (`Header`, `Footer`, `SiteSettings`) live. `push: true` on dev syncs on boot. **`Posts` (the blog) was added 2026-06-01 — its `ltt.posts` table needs a coordinated production migrate (PM_INBOX handshake) at deploy.**
- **Routes built** (verified via `npm run build` — see `.build-clean.log` for the latest table):
  - `○ /` (static, ISR 1h) — magazine-style homepage with hero, featured grid, category strip, trust strip, end CTA
  - `ƒ /[categorySlug]` — category hub. **`export const dynamic = 'force-dynamic'`** (NOT SSG — this is how the build was unblocked; only live traffic touches the DB). `generateStaticParams` still exists but is overridden by force-dynamic.
  - `ƒ /[categorySlug]/[scenarioSlug]` — scenario detail (also `force-dynamic`): reading-progress bar, drop-cap, `ScrollSpyToc`, share row, preparation checklist, hotline CTA, Article + BreadcrumbList JSON-LD
  - `ƒ /tinh-huong` — all-scenarios archive with client filter tabs (category/urgency/outcome)
  - `ƒ /goc-luat-su` + `ƒ /goc-luat-su/[slug]` — **"Góc Luật Sư" blog** (Posts collection). Both `force-dynamic` (so the build never queries `posts` before the table exists). Detail mirrors the scenario reading experience; BlogPosting + BreadcrumbList JSON-LD. Seed launch posts via `npm run seed:posts`.
  - `○ /vi-sao-luat-su` (ISR 1h) — "Authority Gap" manifesto (the 6 reasons via `AuthorityGap`, online-vs-lawyer contrast, authority block)
  - `○ /hoi-dap` (FAQPage JSON-LD), `○ /thuat-ngu` (DefinedTermSet JSON-LD), `○ /quy-trinh` — FAQ / glossary / how-it-works (content from `src/content/*.ts`, no DB)
  - `○ /lien-he` (ISR 1h) — "Gọi luật sư / Yêu cầu gọi lại": click-to-call hero + callback form posting to `/api/contact`
  - `○ /ve-chung-toi`, `○ /chinh-sach-bao-mat`, `○ /dieu-khoan-su-dung` (ISR 1h) — static Pages content; Organization JSON-LD lives in `src/lib/organization-schema.ts`
  - `ƒ /api/contact` (dynamic) — validates, writes to `contact-submissions`, fire-and-forget mirror to `CONTACT_HUB_URL`
  - `ƒ /admin/[[...segments]]` and `ƒ /api/[...slug]` — Payload-owned routes
  - `○ /robots.txt`, `○ /sitemap.xml` — AI bots allowed, sitemap pulls live from Payload
- **Seed data**: 1 admin user, 1 `editorial-team` author, 6 categories matching PRD §5 slugs, static-page stubs via `seed:static-pages`.
- **Content (Phase C) in progress**: ~31 scenario drafts in `content/drafts/scenarios.json`; per-scenario staging drafts under `content/drafts/staging/` (validated via `import:content:dry` before import). Target is ~100 scenarios.
- **Images (Phase D)**: `image-assets.json` manifest exists; generate/upload via `tools/image-generator-ui /batch` (reuse-first), then R2 upload.
- **What's left**: finish Phase C content to ~100 scenarios + import; Phase D image generation + R2 upload; Phase F (Vercel deploy + owner review). An OG image route is still outstanding.

### Local conventions established during the build (don't re-discover)

- **Layout split** mirrors Phase 1: pass-through `src/app/layout.tsx`, then `(frontend)/layout.tsx` (loads globals.css, fonts, MotionProvider, SiteHeader, SiteFooter, FloatingCta) and `(payload)/layout.tsx` (Payload's own chrome). Keeps Tailwind preflight + site fonts out of `/admin`.
- **MotionConfig** lives in a small client provider `src/components/providers/MotionProvider.tsx` so the layout itself stays a Server Component.
- **Queries**: `src/lib/queries.ts` wraps `getPayload().find()` with typed helpers (`CategoryDoc`, `ScenarioDoc`, etc.). Server-only. Use `unstable_cache` for global lists (categories) revalidated hourly.
- **Apolo constants helper**: `parentBrandUrl('vi')` maps to `APOLO.vn.parentBrandUrl` — upstream shared-asset uses keys `vn`/`en` but the Locale type uses `vi`/`en`. Mapping lives in `src/config/apolo.ts`; flagged for shared-assets canonicalization.
- **CTAs = hotline call** (2026-06-01 pivot). All CTAs (`CtaBlock`, `FloatingCta`, header/footer/mobile, hero) are `tel:` click-to-call via `src/lib/cta.ts` (`HOTLINE_TEL`, sourced from `APOLO.vn.callCenter`). No more luatsutuvan.net / UTM. The `/lien-he` form is the "request a callback" fallback; Zalo is the chat fallback.
- **Contact API** at `/api/contact` does local Payload write first, then fire-and-forget mirror to `CONTACT_HUB_URL`. Hub failure must never block the user.
- **Blog (`Posts`)** mirrors `Scenarios` (markdown `code` body, autoSlug + revalidate hooks, SEO plugin). Topic taxonomy is its own select (not the scenario categories). Query helpers `listPosts`/`getPostBySlug` in `queries.ts`; topic labels in `src/lib/post-meta.ts`.

**Pilot status**: this is the **first site to use the Phase 2+ Markdown body architecture**. Phase 1 sites use Lexical (`@payloadcms/richtext-lexical`); this site does **not**. See "Content body convention" below — easy to break by reflex.

## Reading order (before writing any code)

1. `./BUILDER_BRIEF.md` — kickoff brief; reading order, pilot warnings, image workflow, exit criteria
2. `./PRD.md` — full design direction, sitemap, content plan, CMS schema sketches, conversion funnel
3. `../../shared-assets/BUILDER_AGENT_BRIEF.md` — Standing Authorizations, animation/design vocabulary, **pre-migrate coordination protocol**
4. `../../shared-assets/PAYLOAD_SETUP_SPEC.md` **§1.5** (Phase 2+ Markdown) — canonical `payload.config.ts`; **skip §1 (Phase 1 Lexical legacy)**
5. `../../shared-assets/SUPABASE_CONFIG.md` — Session Pooler URI, schema assignments
6. `../../shared-assets/MARKDOWN_FORMAT_REFERENCE.md` — supported markdown subset + validator rules
7. `../../shared-assets/CONTENT_GENERATION_GUIDE.md` § Quality Rubric — content quality bar (overrides PRD's older numbers)
8. `../../shared-assets/SITE_BUILD_CHECKLIST.md` — 7-phase build order
9. `../../shared-assets/SITE_BUILD_FEEDBACK.md` — cross-ecosystem pitfalls Issues 1–13

When a site-level doc disagrees with `shared-assets/`, the shared spec wins (PRD predates several conventions; the BUILDER_BRIEF and shared-assets supersede where they conflict).

## Tech stack

Next.js 15 (App Router, TS strict) + PayloadCMS v3 (embedded) + Supabase Postgres + Tailwind v4 + GSAP (ScrollTrigger) + Framer Motion + Be Vietnam Pro font + `next-intl` not required (VN-only). Images via R2 CDN, generated through `tools/image-generator-ui` (Nano Banana 2). Deploys to Vercel.

## Database — site-specific facts

- **Supabase project**: `zxmdegfnjbvytjnwfhfq` (Apolo Funnel, Singapore `ap-southeast-1`) — shared across Phase 2/3 funnel + practice-area sites, so isolation matters.
- **Schema**: `ltt` — set via `postgresAdapter({ schemaName: 'ltt' })`. **Do not use `tablePrefix`** (the legacy column header in older docs is stale; per-site Postgres schemas are now canonical).
- **Connection**: use the **Session Pooler URI** (port `5432`, `aws-1-ap-southeast-1.pooler.supabase.com`) for both runtime and `npx payload migrate`. The deprecated 6543-pooled + 5432-direct split must not be reintroduced.
- **DNS**: `dns.setDefaultResultOrder('ipv4first')` must be the **first line** in both `payload.config.ts` and `next.config.ts`, before any import that resolves hostnames.
- **Migrate coordination** (mandatory before *every* migrate on this shared project):
  1. Append to workspace-root `PM_INBOX.md`: `## YYYY-MM-DD HH:MM — luatsutructuyen.net: starting migrate (schema=ltt)`
  2. Wait for PM ack
  3. Run `npx payload migrate`
  4. Append success/failure line
  Never run migrations from two sites on the same Supabase project simultaneously.
- Never run raw DDL (`ALTER TABLE`, `DROP`, etc.) outside `npx payload migrate`.

## SEO plugin and `metaTitle`/`metaDescription` (gotcha caught 2026-05-17)

`@payloadcms/plugin-seo` is enabled on `scenarios`, `pages`, and `categories`. The plugin **automatically adds** `metaTitle`, `metaDescription`, and `metaImage` fields to those collections. If you also declare `metaTitle`/`metaDescription` manually in the collection's `fields` array, Payload generates an `INSERT` statement with the same column listed twice → Postgres 500. **Do not manually declare those fields on any SEO-enabled collection** — the plugin owns them. (Logged after a first-seed failure on `categories`.)

## Content body convention (the pilot — easy to get wrong)

- Content body fields are **`type: 'code'` with `admin: { language: 'markdown' }`**, stored as a `text` column. **Not** `richText`. **Not** Lexical.
- Do **not** add `@payloadcms/richtext-lexical` to `package.json`.
- Do **not** add a top-level `editor:` block in `buildConfig({...})`.
- Frontend renders bodies through `src/components/Markdown.tsx` (copied from `../../shared-assets/components/Markdown.tsx`).
- Markdown subset and citation/CTA validator rules live in `../../shared-assets/MARKDOWN_FORMAT_REFERENCE.md`. The importer (`scripts/import-seo-content.mjs`, copied from `../../shared-assets/scripts/import-markdown-content.mjs`) enforces them — **do not lower validator thresholds**; fix the source markdown instead.
- The PRD's collection sketches mention `type: 'richText'` for body fields. That is **stale**; use markdown per the rules above.

## Collections (per PRD §7, with markdown body adjustment)

Live collections: `Scenarios` (core), `Categories`, `Authors`, `Pages` (static pages), `Media`, `Navigation`, `ContactSubmissions`, `Users`. Globals: `Header`, `Footer`, `SiteSettings`. Field shapes are in PRD §7; rewrite every `richText` body field as `code/markdown`. Auto-slug (`src/hooks/auto-slug.ts`) + ISR-revalidation (`src/hooks/revalidate.ts`) hooks on `scenarios`. Media collection sizes: thumbnail 400×300, card 768×512, hero 1920×1080, og 1200×630.

## Content quality bar

Per `CONTENT_GENERATION_GUIDE.md` § Quality Rubric (this **overrides** the PRD's older 1,500–2,500 word figure):

- 2,500–4,000 words per scenario article
- Minimum 5 inline statutory citations, e.g. `(Điều 430 BLDS 2015)`, `(Khoản 2 Điều 18 Luật Doanh nghiệp 2020)`
- 1–2 anonymized case-pattern examples per article
- Structured H2 every 250–400 words, H3 for procedure steps
- A real call-to-action to phone the Apolo hotline (never `#`); the page-level `CtaBlock` handles the click-to-call

The validator enforces this at import time. Hard acceptance criterion, not aspirational.

## Image workflow (soft caps apply)

- Reuse first: check `../../shared-assets/r2-shared/MANIFEST.md` and the image-generator-ui `/library` route before generating anything.
- Generate site-specific imagery via `tools/image-generator-ui` (port 3100) → `/batch` → preview → approve → upload. The tool writes `ASSETS.md` + `assets.json` back into this folder.
- Never call Gemini directly; always go through image-generator-ui.
- **Stop and escalate to PM** if: >50 total generations on this site, >10 regenerations on a single asset, or any asset >2560px wide.
- Icons are SVG via `lucide-react` (no raster icons). Need photo-real cut-outs on alpha? Set `transparent: true` in the manifest — chroma-keyed server-side. Do **not** prompt "transparent PNG, alpha channel" (Nano Banana 2 fakes it as solid white).

## Internal linking & funnel rules

- **Primary (and only) funnel = the Apolo hotline call** (`tel:` via `src/lib/cta.ts`). As of 2026-06-01 the site no longer links to luatsutuvan.net and uses **no UTM params**. (This overrides the older ecosystem rule; owner-approved.)
- Authority backlinks: `vothienhien.com` (Managing Partner profile), `apolo.com.vn` (VN parent brand). `zalo.me/apololawyers` is the Zalo OA contact channel.
- VN content links only to `apolo.com.vn` (never `apololawyers.com`).
- The blog ("Góc Luật Sư") is scoped to the **"Authority Gap" angle** (why a real lawyer beats free online/AI answers) — thought-leadership that drives the call, not a general legal encyclopedia (that role belongs to `luatsutructuyen.vn`).
- Citation allowlist: only `*.gov.vn` (any subdomain) and `vbpl.vn`.

## Name & terminology canon

- Vietnamese: **"Luật sư Võ Thiện Hiển"** (never "Henry Vo", never "Mr Hien").
- Title: **"Luật sư Điều hành"** (Managing Partner).
- Profession term: **"Luật sư"** consistently — never "luật gia" or other variants.
- Author byline: **Apolo Editorial Team** (slug `editorial-team`). No fictional individual authors.
- Address & phone come from `../../shared-assets/site-constants/apolo.ts` — copy to `src/config/apolo.ts` and import. Do not hardcode address strings (F-009 / Issue 11).

## Contact strategy (hotline-first)

The single conversion action is a **phone call to the Apolo hotline** — surfaced as click-to-call in the hero, header, footer, end-of-article `CtaBlock`, and the floating "Gọi luật sư" button (after 30% scroll). `/lien-he` leads with a big click-to-call, then offers the **"Yêu cầu gọi lại"** callback form. Zalo OA is the chat fallback. Callback-form submissions: local Payload write **and** fire-and-forget mirror to `CONTACT_HUB_URL` from `.env` (Google Apps Script aggregator — see `tools/contact-form-hub/`).

## Coding conventions (non-obvious bits only)

- Server Components by default; `'use client'` only when interactivity demands it.
- SSG for public pages; ISR `revalidate: 3600` for scenario/category pages (revalidate-on-publish hook required).
- Every page exports `generateMetadata` and renders JSON-LD via a `<JsonLd>` component (minimum: BreadcrumbList; add FAQPage on pages with FAQ sections, Article on scenario pages).
- Allow AI bots in `robots.ts`: GPTBot, ChatGPT-User, PerplexityBot, Claude-Web.
- Animations: minimum 4 patterns from `../../shared-assets/design-patterns/animations/`. `ScrollReveal` on section headings and `StaggerReveal` on card grids are mandatory.
- Apply the `@next/env` patch per `PAYLOAD_SETUP_SPEC.md` §7.1 via `patch-package`.
- Boot-time env guards on `PAYLOAD_SECRET` and `DATABASE_URI` (throw early if missing).
- Tailwind only — no CSS modules, no styled-components.

## Commands (run inside this site folder)

```bash
npm install
npm run dev                       # Next.js dev server, also serves /admin
npm run build
npm run start
npm run lint
npx payload generate:types        # after any collection change
npx payload migrate:status        # safe read-only check
npx payload migrate               # production migrate — follow PM_INBOX coordination protocol first
                                  # Dev uses push: true, so a fresh `npm run dev` syncs schema automatically.
npm run seed:admin                # idempotent — creates first admin via /api/users/first-register
npm run seed:foundation           # idempotent — creates editorial-team author + 6 categories
npm run seed:static-pages         # idempotent — creates /ve-chung-toi, privacy, terms Pages stubs
npm run import:content:dry        # validate scenario markdown drafts (Quality Rubric) without writing
npm run import:content            # import content/drafts/scenarios.json via REST API
```

No test runner is wired up yet.

### Env files

Node scripts in `scripts/` load env via `dotenv` from `.env.local` first, then `.env`. Next.js itself reads `.env.local` natively. `.env.example` is the template — `.env.local` is in `.gitignore` and holds the real secrets.

## Never (without asking)

- Reach for `@payloadcms/richtext-lexical` — this site is markdown-only.
- Run `npx payload migrate` without the PM_INBOX coordination handshake.
- Hardcode addresses, phones, or parent-brand URLs — import from `src/config/apolo.ts`.
- Cross-link to `apololawyers.com` from VN content.
- Generate images outside `tools/image-generator-ui`.
- `git init` here; this is part of a non-git workspace.
