import type { CollectionConfig } from 'payload'
import { autoSlug } from '@/hooks/auto-slug'
import { revalidateAfterChange } from '@/hooks/revalidate'

/**
 * Posts — the "Góc Luật Sư" blog. Thought-leadership / legal-warning articles
 * (the Authority Gap angle). Mirrors Scenarios' markdown architecture: body is
 * `type: 'code'` with `language: 'markdown'`, rendered via src/components/Markdown.tsx.
 * Do NOT use richText/Lexical (CLAUDE.md "Content body convention").
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'topic', 'status', 'publishedDate'],
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'One-paragraph summary shown on cards and as the article lede.' },
    },
    {
      name: 'content',
      type: 'code',
      required: true,
      admin: {
        language: 'markdown',
        editorOptions: { wordWrap: 'on', lineNumbers: 'off', fontSize: 14 },
        description:
          'Markdown body. Use ## for section headings, ### for sub-points. Cite điều luật where relevant and end with a call-to-action to gọi luật sư.',
      },
    },
    {
      name: 'tocItems',
      type: 'array',
      admin: { description: 'Optional. Auto-populated from H2/H3 if imported; safe to leave empty.' },
      fields: [
        { name: 'level', type: 'number' },
        { name: 'label', type: 'text' },
        { name: 'anchor', type: 'text' },
      ],
    },
    {
      name: 'topic',
      type: 'select',
      defaultValue: 'canh-bao',
      options: [
        { label: 'Cảnh báo pháp lý', value: 'canh-bao' },
        { label: 'AI vs Luật sư', value: 'ai-vs-luat-su' },
        { label: 'Kiến thức pháp lý', value: 'kien-thuc' },
        { label: 'Cập nhật luật', value: 'cap-nhat-luat' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'author', type: 'relationship', relationTo: 'authors' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'readingTime',
      type: 'number',
      admin: { description: 'Minutes.', position: 'sidebar' },
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
    afterChange: [revalidateAfterChange((doc) => ['/goc-luat-su', `/goc-luat-su/${doc.slug}`])],
  },
}
