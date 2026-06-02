import type { CollectionConfig } from 'payload'
import { autoSlug } from '@/hooks/auto-slug'
import { revalidateAfterChange } from '@/hooks/revalidate'

/**
 * Scenarios — the core content type for luatsutructuyen.net.
 *
 * Body field uses the Phase 2+ Markdown architecture: `type: 'code'` with
 * `language: 'markdown'`. Do NOT change to `richText` — see
 * shared-assets/PAYLOAD_SETUP_SPEC.md §1.5 and CLAUDE.md "Content body convention".
 *
 * The frontend renders the `content` field through `src/components/Markdown.tsx`.
 * The importer (`scripts/import-seo-content.mjs`) validates each article against
 * the Quality Rubric (2,500–4,000 words, ≥5 inline statutory citations, internal
 * CTA link to /lien-he) before POSTing.
 */
export const Scenarios: CollectionConfig = {
  slug: 'scenarios',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'urgencyLevel', 'status', 'publishedDate'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL segment. Auto-generated from title if blank.' },
    },
    {
      name: 'hookText',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'One-paragraph emotional hook shown on cards and as the article lede. Sets the scene before the reader commits to reading.',
      },
    },
    {
      name: 'content',
      type: 'code',
      required: true,
      admin: {
        language: 'markdown',
        editorOptions: { wordWrap: 'on', lineNumbers: 'off', fontSize: 14 },
        description:
          'Markdown body. Use ## for section headings, ### for sub-steps. Statutory citations like (Điều 121 BLDS 2015). Min 5 citations + CTA link to /lien-he. See MARKDOWN_FORMAT_REFERENCE.md.',
      },
    },
    {
      name: 'tocItems',
      type: 'array',
      admin: { description: 'Auto-populated by importer from H2/H3 headings. Don\'t edit manually.' },
      fields: [
        { name: 'level', type: 'number' },
        { name: 'label', type: 'text' },
        { name: 'anchor', type: 'text' },
      ],
    },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'author', type: 'relationship', relationTo: 'authors' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'urgencyLevel',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Low — informational', value: 'low' },
        { label: 'Medium — act soon', value: 'medium' },
        { label: 'High — time-sensitive', value: 'high' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'outcomeType',
      type: 'select',
      options: [
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Lawsuit', value: 'lawsuit' },
        { label: 'Mediation', value: 'mediation' },
        { label: 'Mixed', value: 'mixed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'preparationChecklist',
      type: 'array',
      admin: { description: 'Document/evidence checklist surfaced in the "Cần chuẩn bị gì" sidebar.' },
      fields: [
        { name: 'item', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'relatedScenarios',
      type: 'relationship',
      relationTo: 'scenarios',
      hasMany: true,
      admin: { description: '3–4 related scenarios surfaced at the end of the article.' },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: { description: 'Minutes. Auto-set by importer if blank.', position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'updatedDate',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    // metaTitle / metaDescription added by @payloadcms/plugin-seo — do not declare manually.
  ],
  hooks: {
    beforeChange: [autoSlug('title')],
    afterChange: [
      revalidateAfterChange((doc) => ['/', `/scenarios/${doc.slug}`]),
    ],
  },
}
