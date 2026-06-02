import type { CollectionConfig } from 'payload'

/**
 * Lightweight navigation entries. Header and Footer globals reference these
 * for primary nav links; can also be queried for sitemap generation.
 */
export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'url', 'group', 'order'],
  },
  access: { read: () => true },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
    {
      name: 'group',
      type: 'select',
      required: true,
      defaultValue: 'header',
      options: [
        { label: 'Header', value: 'header' },
        { label: 'Footer — primary', value: 'footer-primary' },
        { label: 'Footer — secondary', value: 'footer-secondary' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    {
      name: 'isExternal',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Opens in a new tab with rel="noopener".' },
    },
  ],
}
