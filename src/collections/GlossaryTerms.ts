import type { CollectionConfig } from 'payload'
import { autoSlug } from '@/hooks/auto-slug'

/**
 * Legal-terms glossary for /thuat-ngu (A–Z + DefinedTermSet JSON-LD).
 * CMS-editable replacement for the static src/content/glossary.ts constants.
 * NOT registered on the seoPlugin — see CLAUDE.md (avoids duplicate metaTitle 500).
 */
export const GlossaryTerms: CollectionConfig = {
  slug: 'glossary-terms',
  admin: {
    useAsTitle: 'term',
    defaultColumns: ['term', 'slug', 'order'],
  },
  access: { read: () => true },
  fields: [
    { name: 'term', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL/anchor segment. Auto-generated from term if blank.' },
    },
    { name: 'definition', type: 'textarea', required: true },
    {
      name: 'seeAlso',
      type: 'text',
      admin: { description: 'comma-separated slugs of related terms' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
  hooks: {
    beforeChange: [autoSlug('term')],
  },
}
