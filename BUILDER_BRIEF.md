# Builder Brief — luatsutructuyen.net

**Site**: luatsutructuyen.net — Scenario Funnel Site (Phase 2)
**Language**: Vietnamese only (no EN locale)
**Supabase project**: `zxmdegfnjbvytjnwfhfq` (Project 2 — Apolo Funnel Sites, Singapore region `ap-southeast-1`)
**Schema**: `ltt` — set in `payload.config.ts` `postgresAdapter({ schemaName: 'ltt' })`. **NOT** `tablePrefix` (the actual ecosystem convention is per-site Postgres schemas; the docs that say "table prefix" are stale — see PM_INBOX 2026-04-27)
**Audience**: Vietnamese consumers searching scenarios like "neighbor built wall on my land", "spouse hiding assets in divorce", etc. Middle-funnel — they have anxiety, not yet a clear legal problem.

## Role in ecosystem
Scenario-based middle-funnel content. Converts vague legal anxiety into clarity + consultation intent. Funnels readers to **luatsutuvan.net** (the primary intake hub).

## Reading order (do not skip)
1. `./PRD.md` — full design direction, content strategy, sitemap. **Read end-to-end before coding.**
2. `./CLAUDE.md` — coding conventions, SEO requirements, internal linking
3. `../../shared-assets/BUILDER_AGENT_BRIEF.md` — Standing Authorizations + Design Vocabulary + Image workflow + **pre-migrate coordination protocol**
4. `../../shared-assets/PAYLOAD_SETUP_SPEC.md` — **READ §1.5 (Phase 2+ Markdown Field Config), NOT §1 (Phase 1 Lexical legacy).** This is a new pilot architecture; you are the first site to use it. Skip §1 entirely.
5. `../../shared-assets/SUPABASE_CONFIG.md` — your project ref + Session Pooler connection string. Schema-based separation: your schema is `ltt`.
6. `../../shared-assets/SITE_BUILD_CHECKLIST.md` — 7-phase build order (now phase-aware)
7. `../../shared-assets/SITE_BUILD_FEEDBACK.md` — known pitfalls Issues 1–13
8. `../../shared-assets/MARKDOWN_FORMAT_REFERENCE.md` — supported markdown subset + citation/CTA validator rules. **You are NOT using Lexical.** Do NOT install `@payloadcms/richtext-lexical`.
9. `../../shared-assets/CONTENT_GENERATION_GUIDE.md` — § Quality Rubric: 2,500-4,000 words/article, 5+ inline citations, structured H2/H3. Validator enforces this at import time.
10. `../../shared-assets/r2-shared/MANIFEST.md` — reusable assets. The image-generator-ui `/library` route (NEW) surfaces this catalog visually + lets you browse all R2 assets across sites; pick "Reuse from library" instead of generating where possible.
11. `../../shared-assets/design-patterns/README.md` — animation library (mandatory: ScrollReveal + StaggerReveal); icon convention (SVG-first via `lucide-react`)
12. `../../shared-assets/site-constants/apolo.ts` — canonical VN address, terminology, parent-brand URLs. **Copy to `src/config/apolo.ts` and import; never hardcode address strings.**
13. `./design-refs/` (if present) — hero / landing mock images from PM. Match proportion + hierarchy.

## Pre-built scaffold
None yet. You're building from a fresh Next.js project. Follow SITE_BUILD_CHECKLIST.md phase 1.

## Immediate priorities (in order)

**⚠ You are the PILOT for the Phase 2+ Markdown Field architecture.** Phase 1 sites use Lexical; you do NOT. If you find yourself reaching for `@payloadcms/richtext-lexical`, stop — re-read `PAYLOAD_SETUP_SPEC.md` §1.5.

1. Initialize Next.js + PayloadCMS scaffold per PAYLOAD_SETUP_SPEC.md **§1.5** (Phase 2+ Markdown architecture), including:
   - `dns.setDefaultResultOrder('ipv4first')` at top
   - `schemaName: 'ltt'` in `postgresAdapter()`
   - **NO** `editor: lexicalEditor(...)` block in `buildConfig({...})` — drop it entirely
   - **NO** `@payloadcms/richtext-lexical` in `package.json`
   - Boot-time env guards (PAYLOAD_SECRET + DATABASE_URI)
   - **Apply the `@next/env` patch** per PAYLOAD_SETUP_SPEC.md §7.1 (use `patch-package`)

2. Install markdown rendering deps:
   ```bash
   npm install react-markdown remark-gfm rehype-slug rehype-autolink-headings
   ```

3. Copy the canonical Markdown renderer and importer from shared-assets:
   ```bash
   cp ../../shared-assets/components/Markdown.tsx src/components/Markdown.tsx
   cp ../../shared-assets/scripts/import-markdown-content.mjs scripts/import-seo-content.mjs
   cp ../../shared-assets/site-constants/apolo.ts src/config/apolo.ts
   ```
   Edit only the `CONFIG` block at the top of `scripts/import-seo-content.mjs` (collection slug, monolingual `isBilingual: false` for this VN-only site).

4. **Pre-migrate coordination** (NEW — see BUILDER_AGENT_BRIEF.md "Pre-migrate coordination protocol"):
   - Append to `PM_INBOX.md`: `## YYYY-MM-DD HH:MM — luatsutructuyen.net: starting migrate (schema=ltt)`
   - Wait for PM ack in chat
   - Then run `npx payload migrate` (Session Pooler URI handles both runtime + migrate)
   - Append success line to PM_INBOX

5. Build collections per PRD: scenarios (the core content type), authors, tags, categories, contact submissions. **Body field is `type: 'code'` with `language: 'markdown'`** — see PAYLOAD_SETUP_SPEC.md §1.5 for the exact field shape. NO `richText` fields.

6. Frontend pages per PRD sitemap. Article pages render bodies via `<Markdown>{article.content}</Markdown>`.

7. Generate 100 SEO scenario articles per CONTENT_GENERATION_GUIDE.md § Quality Rubric. Run the importer with `--dry-run` first — fix any validator failures in the source markdown before the real import. Do NOT lower validator thresholds.

8. Image pipeline — **use the new `/library` route in image-generator-ui first** (curated MANIFEST tab + Browse All R2 history). Reuse before regenerate. Generate site-specific imagery only for assets the library doesn't cover.

9. Wire contact form to `CONTACT_HUB_URL` (see CONTACT_VI.md § Form Submission Endpoint).

## Design direction
"Interactive Story Magazine" — warm, human, deeply relatable. Terracotta primary (`#C2785C`), warm cream backgrounds. Think Vietnamese lifestyle magazine + trusted advice column. See PRD §2 for full palette and typography.

**Design vocabulary** (mandatory minimums):
- `ScrollReveal` on every section heading entering viewport
- `StaggerReveal` on every grid of scenario cards
- 4+ patterns total from `shared-assets/design-patterns/animations/`
- Icons via `lucide-react` (SVG, transparent native) — NOT raster

## Content quality bar
Per CONTENT_GENERATION_GUIDE.md § Quality Rubric (NEW):
- **2,500-4,000 words per scenario article**
- **Minimum 5 inline statutory citations** like `(Điều 430 BLDS 2015)` or `(Khoản 2 Điều 18 Luật Doanh nghiệp 2020)`
- 1-2 anonymized case-pattern examples per article
- Structured H2 every 250-400 words; H3 for procedure steps
- CTA paragraph at the end linking to luatsutuvan.net consultation page (real internal link, NOT `#`)

This bar is a hard acceptance criterion, not aspirational. Phase 1 articles below this bar are grandfathered; Phase 2 onward is held to it.

## Image workflow
**Self-serve, soft cap at 50 generations / ~$5 budget per site.**
1. Check `../../shared-assets/r2-shared/MANIFEST.md` first — reuse generic legal imagery (gold scales, marble textures, courthouse columns). Don't regenerate what's already there.
2. Enumerate site-specific images you actually need (scenario article thumbnails, custom illustrations matching the magazine aesthetic).
3. Open `tools/image-generator-ui` (port 3100, `npm run dev` in that folder) → /batch → write manifest → generate previews → regenerate until satisfied → Approve & Upload.
4. **Stop and report to PM** if you exceed 50 generations OR do >10 regenerations on a single asset OR want to generate >2560px wide.
5. Icons are SVG via `lucide-react`. Do NOT add `category: "icon"` raster entries.
6. **Need raster transparency** (photo-real cut-outs over animated backdrops, hero foreground subjects)? Set `transparent: true` on the entry — image-generator-ui renders on a chroma-key screen and strips it server-side. See `../../shared-assets/IMAGE_MANIFEST_SCHEMA.md § Transparent Backgrounds`. Do NOT prompt "transparent PNG, alpha channel" — Nano Banana 2 fakes that as solid white.

## Contact strategy
Per CONTACT_VI.md and PRD §10. **Vietnamese-only audience** — Zalo OA is appropriate here (unlike lawyer.id.vn). WhatsApp link, contact form. Contact form submissions mirror to `CONTACT_HUB_URL` per `CONTACT_VI.md § Form Submission Endpoint`.

## Internal linking
- **Primary funnel target**: luatsutuvan.net (every scenario article ends with a CTA to consultation booking there)
- **Secondary**: practice-area sites (luatsudansu.vn, luatsuhinhsu.vn, etc.) when topic-relevant
- **Authority backlinks**: vothienhien.com (Managing Partner profile), apololawyers.com

## Name / terminology rules
- Canonical VN name: **"Luật sư Võ Thiện Hiển"** (not "Henry Vo", not "Mr Hien")
- Title: **"Luật sư Điều hành"** / "Managing Partner" (English)
- Profession: **"Luật sư"** consistently; do not switch to "luật gia" or other variants
- Apply the F-009 terminology consistency rule across the whole site

## Exit criteria
Standard 8-task checklist (see `../../shared-assets/BUILDER_AGENT_BRIEF.md` § Exit Criteria).

## Status reporting
Update PM_INBOX.md at workspace root after each major milestone. PM session uses the inbox-watcher hook (see `.claude/settings.json`) to get notified.
