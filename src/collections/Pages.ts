import type { CollectionConfig } from 'payload'
import { autoSlug } from '@/hooks/auto-slug'
import { revalidateAfterChange } from '@/hooks/revalidate'

/**
 * Utility/static pages — privacy policy, terms of use, about, etc.
 * Article bodies use the same Phase 2+ markdown convention as Scenarios.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'content',
      type: 'code',
      admin: {
        language: 'markdown',
        editorOptions: { wordWrap: 'on', lineNumbers: 'off', fontSize: 14 },
      },
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    // metaTitle / metaDescription added by @payloadcms/plugin-seo — do not declare manually.
  ],
  hooks: {
    beforeChange: [autoSlug('title')],
    afterChange: [revalidateAfterChange((doc) => [`/${doc.slug}`])],
  },
}
