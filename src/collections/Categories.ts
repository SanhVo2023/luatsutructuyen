import type { CollectionConfig } from 'payload'
import { autoSlug } from '@/hooks/auto-slug'
import { revalidateAfterChange } from '@/hooks/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL segment. Auto-generated from name if blank.' },
    },
    { name: 'description', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'icon', type: 'text', admin: { description: 'Lucide icon name (e.g. "Scale", "Home", "Briefcase").' } },
    {
      name: 'color',
      type: 'select',
      options: [
        { label: 'Terracotta (primary)', value: 'terracotta' },
        { label: 'Warm Clay', value: 'clay' },
        { label: 'Deep Olive', value: 'olive' },
        { label: 'Muted Rust', value: 'rust' },
      ],
      defaultValue: 'terracotta',
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    // metaTitle / metaDescription added by @payloadcms/plugin-seo — do not declare manually.
  ],
  hooks: {
    beforeChange: [autoSlug('name')],
    afterChange: [revalidateAfterChange((doc) => [`/${doc.slug}`, '/'])],
  },
}
