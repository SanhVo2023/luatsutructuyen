# PRD: luatsutructuyen.net

## Product Requirements Document

**Project**: luatsutructuyen.net -- Scenario Funnel Site
**Company**: CONG TY LUAT APOLO LAWYERS
**Managing Partner**: Luat su Vo Thien Hien (Henry Vo)
**Role in Ecosystem**: Middle-funnel scenario content -- converts awareness into consultation intent
**Language**: Vietnamese only
**Phase**: Phase 2
**Last Updated**: 2026-04-03

---

## 1. Project Overview

### Purpose

luatsutructuyen.net is a scenario-based legal content site that presents real-life legal situations Vietnamese people commonly face. Rather than teaching abstract law, this site tells relatable stories: "My neighbor built a wall on my land -- what do I do?", "My spouse is hiding assets during divorce -- should I sue?", "A business partner ran off with company funds -- what can I prepare?"

The site serves as a middle-funnel conversion engine. Readers arrive with vague legal anxiety and leave with clarity about their situation AND a strong intent to consult a lawyer. Every scenario article funnels toward luatsutuvan.net as the primary conversion target.

### Key Differentiator

This is NOT a legal knowledge base (that role belongs to luatsutructuyen.vn). This site does NOT explain what the law says in general terms. Instead, it presents specific, relatable scenarios that mirror the reader's own situation, helping them self-identify their legal problem and understand what action to take next.

### Tech Stack

- Next.js 15 (App Router)
- PayloadCMS v3 (independent instance)
- Supabase PostgreSQL
- Tailwind CSS v4
- GSAP + Framer Motion for animations
- Nano Banana 2 for all non-logo images

### Success Metrics

- Conversion rate to luatsutuvan.net: target 12-18%
- Average time on page: target 3+ minutes
- Pages per session: target 2.5+
- Bounce rate: target below 55%
- 100 indexed SEO content pages within 6 months

---

## 2. Design Direction

### Concept: "Interactive Story Magazine"

The entire design language evokes a modern, empathetic storytelling magazine -- think a blend of a Vietnamese lifestyle magazine and a trusted advice column. The site should feel warm, human, and deeply relatable. Visitors should feel like they are reading stories about people just like them, not scanning a cold legal database.

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Terracotta | #C2785C | Headlines, active states, primary buttons |
| Secondary | Warm Clay | #D4A574 | Accents, hover states, tags |
| Background | Warm Cream | #FAF6F0 | Page backgrounds |
| Surface | Soft Linen | #F0EBE3 | Card backgrounds, content areas |
| Text Primary | Charcoal Brown | #3D3229 | Body text |
| Text Secondary | Warm Gray | #8B7E74 | Captions, metadata |
| Accent | Deep Olive | #5C6B4F | Success states, positive outcomes |
| Alert | Muted Rust | #B35A3A | Warning states, urgent scenarios |

### Typography

- **Headings**: Be Vietnam Pro (Bold/SemiBold) -- modern Vietnamese-optimized font
- **Body**: Be Vietnam Pro (Regular/Light) -- excellent Vietnamese diacritical rendering
- **Story Quotes**: Playfair Display (Italic) -- for pull-quotes and scenario intros
- **Scale**: Base 16px, modular scale ratio 1.25

### Layout Principles

1. **Story Card Grid**: Homepage and category pages use a magazine-style masonry grid of scenario cards, each with an illustrated hero, a provocative headline, and a one-line hook
2. **Reading Experience**: Article pages use a single-column, generous-whitespace layout (max 720px content width) optimized for immersive reading
3. **Scenario Navigation**: Sidebar or inline "Related Scenarios" panels that group by situation type, not by legal category
4. **Progressive Disclosure**: Scenarios start with the human story, then reveal legal context, then present options, then CTA
5. **Empathy-First Headers**: Every page header uses a question or emotional statement, never a legal term

### Motion & Interaction

- Cards animate in with a gentle fade-up (GSAP ScrollTrigger, 0.4s stagger)
- Story illustrations use subtle parallax on scroll (Framer Motion)
- CTA buttons use a warm pulse animation (not aggressive -- comforting)
- Page transitions use a soft crossfade (Next.js App Router transitions)
- "Continue reading" sections slide in from the right on mobile

### Mobile-First Approach

- Swipeable scenario card carousel on mobile homepage
- Bottom-sheet style scenario category selector
- Sticky "Hoi Luat Su" (Ask a Lawyer) button at bottom, appears after 30% scroll
- Touch-friendly card interactions with haptic-style visual feedback

---

## 3. Sitemap & Page Structure

### Primary Navigation

```
/                               -- Homepage (Featured Scenarios + Category Grid)
/tinh-huong-dan-su/             -- Civil Dispute Scenarios (Category Hub)
/tinh-huong-ly-hon/             -- Divorce Scenarios (Category Hub)
/tinh-huong-dat-dai/            -- Land & Property Scenarios (Category Hub)
/tinh-huong-doanh-nghiep/       -- Business Scenarios (Category Hub)
/co-nen-kien-khong/             -- "Should I Sue?" Decision Hub
/can-chuan-bi-gi/               -- "What Should I Prepare?" Guide Hub
/ve-chung-toi/                  -- About (Minimal -- links to main Apolo sites)
/lien-he/                       -- Contact Page
```

### Category Hub Pages (6 pages)

Each category hub displays:
- Hero illustration + empathetic intro text
- Featured scenario cards (3-4 highlighted)
- Full scenario listing with filters (by outcome type, urgency, complexity)
- "Most Read This Week" sidebar
- Cross-category recommendations
- Bottom CTA: "Tinh huong cua ban khong co o day? Hoi luat su ngay"

### Scenario Article Pages (~88 pages)

Each scenario article follows a structured template:
1. **Hook**: Emotional headline + one-paragraph human story
2. **Situation**: Detailed scenario description (relatable, specific)
3. **Legal Context**: What the law actually says (brief, accessible)
4. **Options**: What the person in this scenario can do (numbered steps)
5. **Should You Sue?**: Honest assessment with pros/cons
6. **What to Prepare**: Documents and evidence checklist
7. **CTA Block**: "Tinh huong nay giong ban? Hoi luat su ngay" with link to luatsutuvan.net

### Utility Pages (6 pages)

```
/chinh-sach-bao-mat/            -- Privacy Policy
/dieu-khoan-su-dung/            -- Terms of Use
/sitemap.xml                    -- XML Sitemap
/robots.txt                     -- Robots
/404                            -- Custom 404 (with scenario suggestions)
/lien-he/                       -- Contact
```

### Total Page Count: ~100

- 1 Homepage
- 6 Category Hub Pages
- ~88 Scenario Article Pages
- 5 Utility Pages

---

## 4. SEO Strategy

### Primary Keywords

| Keyword | Monthly Search Volume (est.) | Difficulty | Intent |
|---------|------------------------------|------------|--------|
| tinh huong phap ly | 2,400 | Medium | Informational |
| co nen kien khong | 1,800 | Low | Navigational/Transactional |
| xu ly tranh chap | 3,600 | High | Informational |
| tranh chap dat dai lam sao | 1,200 | Low | Informational |
| chong giau tai san khi ly hon | 900 | Low | Informational |
| bi lua dao tien lam sao | 1,500 | Low | Informational |
| nen lam gi khi bi kien | 800 | Low | Informational |

### On-Page SEO Requirements

- **Title Tag Formula**: `[Tinh Huong Cu The] -- Co Nen [Action]? | Luat Su Truc Tuyen`
- **Meta Description Formula**: `Ban dang gap tinh huong [X]? Tim hieu [Y] va biet chinh xac nen lam gi tiep theo. Tu van mien phi tu luat su.`
- **H1**: One per page, scenario-question format
- **H2**: Section breaks matching the article template structure
- **Schema Markup**: FAQPage, Article, BreadcrumbList on every scenario page
- **Internal Links**: Minimum 3 internal links per scenario article
- **Image Alt Text**: Descriptive, keyword-rich, Vietnamese

### Technical SEO

- Server-side rendering via Next.js App Router
- Dynamic OG images generated per scenario (scenario title + illustration)
- Canonical URLs on all pages
- Hreflang not needed (VN only)
- Core Web Vitals targets: LCP < 2.0s, FID < 80ms, CLS < 0.05
- Lazy-loaded images with blur-up placeholders
- Structured breadcrumbs on all scenario pages

### Content Velocity Plan

- Month 1: 30 scenario articles (10 dan su, 8 ly hon, 7 dat dai, 5 doanh nghiep)
- Month 2: 30 scenario articles (balanced across categories)
- Month 3: 28 scenario articles + 10 "co nen kien" + "can chuan bi gi" articles
- Month 4-6: Optimization, interlinking, updating based on Search Console data

---

## 5. Content Plan for 100 SEO Pages

### Category Distribution

| Category | Article Count | Focus |
|----------|--------------|-------|
| Tinh huong dan su | 22 | Contract disputes, debt collection, neighbor conflicts, consumer rights |
| Tinh huong ly hon | 20 | Asset division, child custody, domestic issues, hidden assets |
| Tinh huong dat dai | 20 | Land disputes, boundary issues, inheritance land, construction violations |
| Tinh huong doanh nghiep | 18 | Partner disputes, employee issues, contract breaches, debt recovery |
| Co nen kien khong | 10 | Cross-category "should I sue" decision articles |
| Can chuan bi gi | 10 | Cross-category preparation and evidence guides |

### Sample Article Titles (20 of 100)

1. Hang xom xay tuong lan sang dat nha toi -- co nen kien?
2. Vo/chong giau tai san khi ly hon -- toi can lam gi?
3. Bi lua dao mua ban dat -- co doi lai duoc tien khong?
4. Doi tac kinh doanh chiem doat tien cong ty -- xu ly the nao?
5. Nguoi thue nha khong tra tien 6 thang -- nen kien hay thuong luong?
6. Tranh chap thua ke dat giua anh chi em -- giai quyet ra sao?
7. Cong ty no luong 3 thang -- toi co the kien khong?
8. Mua nha chung cu bi loi -- chu dau tu khong sua -- lam sao?
9. Chong bao hanh -- toi can chuan bi gi de ly hon?
10. Hop dong vay tien khong co chung -- co doi lai duoc khong?
11. Bi tai nan giao thong -- doi boi thuong the nao?
12. Dat co so do nhung bi nguoi khac chiem -- phai lam gi?
13. Kinh doanh online bi khach hang to cao lua dao -- xu ly sao?
14. Con cai tranh chap quyen nuoi con sau ly hon -- ai duoc quyen?
15. Cho muon tien ban be khong tra -- co nen kien ra toa?
16. Mua hang qua mang bi lua -- co kien duoc khong?
17. Bi don phuong cham dut hop dong lao dong -- quyen loi cua toi?
18. Dat thua ke khong co di chuc -- chia nhu the nao?
19. Doi tac pha vo hop dong hop tac -- boi thuong ra sao?
20. Thue nha roi bi chu nha duoi truoc han -- toi co quyen gi?

### Content Template (Per Article)

```
Word Count: 1,500-2,500 words
Reading Time: 6-10 minutes

Structure:
- Hook (100-150 words): Emotional opening, set the scene
- Tinh huong chi tiet (300-500 words): Full scenario description
- Phap luat noi gi (200-300 words): Relevant legal provisions (brief)
- Ban co the lam gi (300-500 words): Step-by-step options
- Co nen kien khong (200-300 words): Honest pros/cons assessment
- Can chuan bi nhung gi (200-300 words): Document/evidence checklist
- CTA Block: Link to luatsutuvan.net with scenario-specific messaging
- Related Scenarios: 3-4 links to related articles
```

---

## 6. Contact Strategy

### Contact Level: Optional/Moderate

This is a content-first site. Contact is available but not aggressive. The primary goal is to push visitors to luatsutuvan.net for actual consultation intake.

### Contact Elements

| Element | Implementation | Priority |
|---------|---------------|----------|
| Contact Form | Simple form on /lien-he/ page | Required |
| Phone Number | Displayed in footer and contact page only | Optional |
| Zalo Link | Footer and contact page | Optional |
| Floating CTA Button | "Hoi Luat Su" button linking to luatsutuvan.net | Required |
| In-Article CTA | End-of-article CTA block linking to luatsutuvan.net | Required |
| WhatsApp | Not included | N/A |

### CTA Hierarchy

1. **Primary CTA**: "Hoi Luat Su Ngay" -- links to luatsutuvan.net (all scenario pages)
2. **Secondary CTA**: "Xem Them Tinh Huong" -- links to related scenarios (category pages)
3. **Tertiary CTA**: "Lien He Truc Tiep" -- links to /lien-he/ (footer only)

### Contact Information

- **Head Office**: 108 Tran Dinh Xu, TP.HCM
- **Branch**: K&M Tower, 33 Ung Van Khiem
- **Phone**: 0903 419 479
- **Email**: contact@apolo.com.vn
- **Zalo**: https://zalo.me/apololawyers

---

## 7. CMS Collections (PayloadCMS v3)

### Collection: Scenarios

```typescript
{
  slug: 'scenarios',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'hookText', type: 'textarea', required: true },
    { name: 'scenarioDetail', type: 'richText', required: true },
    { name: 'legalContext', type: 'richText', required: true },
    { name: 'optionsSteps', type: 'richText', required: true },
    { name: 'shouldSueAssessment', type: 'richText' },
    { name: 'preparationChecklist', type: 'array', fields: [
      { name: 'item', type: 'text' },
      { name: 'description', type: 'textarea' }
    ]},
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'relatedScenarios', type: 'relationship', relationTo: 'scenarios', hasMany: true },
    { name: 'urgencyLevel', type: 'select', options: ['low', 'medium', 'high'] },
    { name: 'outcomeType', type: 'select', options: ['negotiation', 'lawsuit', 'mediation', 'mixed'] },
    { name: 'readingTime', type: 'number' },
    { name: 'publishedDate', type: 'date' },
    { name: 'status', type: 'select', options: ['draft', 'published', 'archived'] },
    { name: 'featured', type: 'checkbox', defaultValue: false }
  ]
}
```

### Collection: Categories

```typescript
{
  slug: 'categories',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number' },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'color', type: 'text' }
  ]
}
```

### Collection: Media

```typescript
{
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'card', width: 800, height: 600 },
      { name: 'hero', width: 1600, height: 900 },
      { name: 'og', width: 1200, height: 630 }
    ]
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'nanoBananaPrompt', type: 'textarea' }
  ]
}
```

### Collection: Navigation

```typescript
{
  slug: 'navigation',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
    { name: 'order', type: 'number' },
    { name: 'parent', type: 'relationship', relationTo: 'navigation' },
    { name: 'isExternal', type: 'checkbox', defaultValue: false }
  ]
}
```

### Global: SiteSettings

```typescript
{
  slug: 'site-settings',
  fields: [
    { name: 'siteName', type: 'text' },
    { name: 'siteDescription', type: 'textarea' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'contactPhone', type: 'text' },
    { name: 'contactEmail', type: 'text' },
    { name: 'zaloUrl', type: 'text' },
    { name: 'primaryCtaText', type: 'text' },
    { name: 'primaryCtaUrl', type: 'text' },
    { name: 'footerText', type: 'richText' },
    { name: 'analyticsId', type: 'text' }
  ]
}
```

---

## 8. AI Image Asset List (Nano Banana 2 Prompts)

### Hero Images (Per Category)

1. **Homepage Hero**
   Prompt: `"Warm illustration of a Vietnamese family sitting at a kitchen table looking worried at documents, soft terracotta and cream color palette, modern flat illustration style with gentle gradients, empathetic mood, warm lighting, editorial magazine quality"`

2. **Tinh huong dan su (Civil)**
   Prompt: `"Illustration of two Vietnamese neighbors having a tense conversation over a fence, documents in hand, warm earth tones, modern editorial illustration, soft shadows, relatable everyday scene, terracotta and warm gray palette"`

3. **Tinh huong ly hon (Divorce)**
   Prompt: `"Gentle illustration of a Vietnamese couple sitting apart on a sofa with a child between them, warm but somber tones, empathetic editorial illustration, modern flat style, terracotta and muted olive colors"`

4. **Tinh huong dat dai (Land)**
   Prompt: `"Illustration of a Vietnamese person standing on a piece of land looking at a property boundary marker, neighbor's construction visible, warm earth tones, modern editorial style, aerial perspective elements, terracotta palette"`

5. **Tinh huong doanh nghiep (Business)**
   Prompt: `"Illustration of Vietnamese business people in a modern office having a disagreement over contract documents, warm professional tones, modern flat illustration, terracotta and warm gray, editorial quality"`

6. **Co nen kien khong (Should I Sue?)**
   Prompt: `"Illustration of a Vietnamese person at a crossroads, one path leading to a courthouse and another to a handshake, warm terracotta tones, decision-making visual metaphor, modern editorial illustration style"`

7. **Can chuan bi gi (What to Prepare)**
   Prompt: `"Illustration of organized documents, folders, and a checklist on a warm wooden desk, Vietnamese person reviewing papers, warm earth tones, organized and reassuring mood, modern flat illustration"`

### Scenario Article Illustrations (Template Prompts)

8. **Neighbor Dispute Scenarios**
   Prompt: `"Warm illustration of Vietnamese residential neighborhood scene with [specific situation], empathetic tone, modern editorial style, terracotta and cream palette, soft shadows"`

9. **Divorce Scenarios**
   Prompt: `"Sensitive illustration of Vietnamese family situation involving [specific element], warm but gentle tones, modern flat illustration, editorial quality, terracotta and muted olive"`

10. **Land Dispute Scenarios**
    Prompt: `"Illustration of Vietnamese rural/urban land scene with [specific boundary or property element], warm earth tones, aerial perspective elements, modern editorial style"`

11. **Business Dispute Scenarios**
    Prompt: `"Professional illustration of Vietnamese business scenario involving [specific element], warm office/commercial setting, terracotta and warm gray, modern editorial quality"`

### UI & Decorative Elements

12. **Story Card Backgrounds (Set of 6)**
    Prompt: `"Abstract warm watercolor texture in terracotta and cream, suitable for card background, subtle organic shapes, editorial magazine quality, seamless edges"`

13. **Section Dividers**
    Prompt: `"Minimalist line illustration of Vietnamese legal symbols -- scales of justice, gavel, document -- in terracotta line art style, simple and elegant"`

14. **CTA Background Patterns**
    Prompt: `"Subtle geometric pattern inspired by Vietnamese traditional motifs, warm terracotta on cream, low opacity suitable for background use, modern interpretation"`

15. **Empty State / 404 Illustration**
    Prompt: `"Friendly illustration of a Vietnamese person looking confused at a map with question marks, warm terracotta tones, lighthearted but empathetic, modern flat style"`

### OG Image Templates

16. **Default OG Template**
    Prompt: `"Clean editorial layout background with warm terracotta gradient, space for text overlay, subtle Vietnamese pattern watermark, magazine cover quality, 1200x630 ratio"`

---

## 9. Internal Linking Strategy

### Outbound Links (From This Site)

| Target Site | Link Type | Placement | Frequency |
|-------------|-----------|-----------|-----------|
| luatsutuvan.net | Primary CTA | Every scenario article (end-of-article CTA block) | Every page |
| luatsutuvan.net | Floating Button | Sticky "Hoi Luat Su" button | Every page |
| luatsutuvan.net | Inline Link | Within scenario "Options" section | Most articles |
| luatsutructuyen.vn | Knowledge Link | "Tim hieu them ve luat" contextual links | Where relevant |

### Inbound Links (To This Site)

| Source Site | Link Type | Context |
|-------------|-----------|---------|
| luatsutructuyen.vn | Contextual | From general legal knowledge articles to specific scenarios |
| law.org.vn | Resource | From authority content linking to practical scenarios |

### Internal Cross-Linking Rules

1. Every scenario article must link to at least 2 other scenarios in the same category
2. Every scenario article must link to at least 1 scenario in a different category (thematic connection)
3. "Co nen kien" articles link to 3-5 relevant scenario articles
4. "Can chuan bi gi" articles link to 3-5 relevant scenario articles
5. Category hub pages display all scenarios in that category
6. Homepage features a rotating selection of 6-8 scenarios across all categories

### Link Anchor Text Guidelines

- Use natural Vietnamese question-format anchors: "Xem tinh huong tuong tu: [title]"
- For CTA links to luatsutuvan.net: "Gui cau hoi cho luat su" or "Dat lich tu van ngay"
- Avoid generic anchors like "click here" or "xem them"
- Include keyword variations in anchor text naturally

### Breadcrumb Structure

```
Trang chu > [Category Name] > [Scenario Title]
Example: Trang chu > Tinh huong dat dai > Hang xom xay tuong lan sang dat toi
```

---

## 10. Conversion Funnel

### Funnel Overview

```
AWARENESS (from Google search / luatsutructuyen.vn)
    |
    v
SCENARIO IDENTIFICATION (reader finds matching scenario)
    |
    v
ENGAGEMENT (reads full scenario, understands their situation)
    |
    v
INTENT FORMATION (realizes they need legal help)
    |
    v
CONVERSION (clicks CTA to luatsutuvan.net)
```

### Funnel Stage Details

#### Stage 1: Arrival & Scenario Matching
- **Entry Points**: Google organic search, links from luatsutructuyen.vn, direct traffic
- **Goal**: Reader finds a scenario that matches their situation
- **Key Elements**: SEO-optimized titles using question format, category browsing, search functionality
- **Metric**: Bounce rate < 55%

#### Stage 2: Engagement & Understanding
- **Goal**: Reader fully engages with the scenario content
- **Key Elements**: Compelling storytelling, relatable details, clear legal context, step-by-step options
- **Metric**: Average time on page > 3 minutes, scroll depth > 70%

#### Stage 3: Intent Formation
- **Goal**: Reader recognizes they need professional legal assistance
- **Key Elements**: "Should I sue" honest assessment, preparation complexity revealed, urgency signals
- **Metric**: Click-through to related scenarios or CTA sections

#### Stage 4: Conversion to luatsutuvan.net
- **Goal**: Reader clicks through to consultation intake
- **Key Elements**: End-of-article CTA block, floating CTA button, inline contextual links
- **Metric**: CTR to luatsutuvan.net > 12%

### CTA Design Specifications

#### End-of-Article CTA Block
```
Background: Warm cream with terracotta left border
Icon: Illustrated lawyer avatar
Headline: "Tinh huong nay giong cua ban?"
Subtext: "Gui cau hoi mien phi cho luat su -- phan hoi trong 30 phut"
Button: "Hoi Luat Su Ngay" (terracotta background, white text)
Link: luatsutuvan.net/gui-cau-hoi?ref=luatsutructuyen&scenario=[slug]
```

#### Floating CTA Button
```
Position: Bottom-right (desktop), bottom-center (mobile)
Appearance: Terracotta pill button with phone icon
Text: "Hoi Luat Su"
Animation: Gentle pulse every 10 seconds
Trigger: Appears after 30% page scroll
Link: luatsutuvan.net?ref=luatsutructuyen-float
```

#### Inline CTA (Within Content)
```
Format: Highlighted text box within article body
Style: Soft linen background, terracotta text
Text: "Can luat su ho tro tinh huong nay? Gui cau hoi mien phi tai day."
Link: luatsutuvan.net/gui-cau-hoi?ref=luatsutructuyen-inline&scenario=[slug]
```

### UTM Parameters

All outbound links to luatsutuvan.net include:
- `utm_source=luatsutructuyen`
- `utm_medium=referral`
- `utm_campaign=scenario-funnel`
- `utm_content=[scenario-slug]`

### Conversion Tracking

- Google Analytics 4 events for all CTA clicks
- Custom events: `scenario_read_complete`, `cta_click_primary`, `cta_click_float`, `cta_click_inline`
- Scroll depth tracking at 25%, 50%, 75%, 100%
- Heatmap integration (Hotjar or Microsoft Clarity) for first 3 months

---

## Appendix: Content Calendar (First 3 Months)

### Month 1 (30 Articles)
- Week 1: 8 articles (3 dan su, 2 ly hon, 2 dat dai, 1 doanh nghiep)
- Week 2: 8 articles (3 dan su, 2 ly hon, 2 dat dai, 1 doanh nghiep)
- Week 3: 7 articles (2 dan su, 2 ly hon, 2 dat dai, 1 doanh nghiep)
- Week 4: 7 articles (2 dan su, 2 ly hon, 1 dat dai, 2 doanh nghiep)

### Month 2 (30 Articles)
- Week 1-4: Balanced distribution, 7-8 articles per week across all categories

### Month 3 (28 Articles + Hub Content)
- Week 1-2: 14 scenario articles (remaining categories)
- Week 3: 5 "Co nen kien" decision articles
- Week 4: 5 "Can chuan bi gi" preparation guides + 4 remaining scenario articles

### Month 4-6: Optimization
- Update underperforming articles based on Search Console data
- Add internal links to new content
- Create additional "Co nen kien" and "Can chuan bi gi" articles based on traffic patterns
- A/B test CTA placements and copy
