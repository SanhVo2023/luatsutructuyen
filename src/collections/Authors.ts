import type { CollectionConfig } from 'payload'
import { autoSlug } from '@/hooks/auto-slug'

/**
 * Authors collection. Canonical default: "Apolo Editorial Team" (slug `editorial-team`)
 * per Mr Hien's Issue 10 ruling — AI-drafted SEO content must NOT credit individual
 * lawyers who didn't personally author it.
 */
export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'role'],
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'role', type: 'text', admin: { description: 'e.g., "Luật sư Điều hành", "Apolo Editorial Team".' } },
    { name: 'bio', type: 'textarea' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
  hooks: {
    beforeChange: [autoSlug('name')],
  },
}
