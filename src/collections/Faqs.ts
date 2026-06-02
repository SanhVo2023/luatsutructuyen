import type { CollectionConfig } from 'payload'

/**
 * Frequently-asked questions for /hoi-dap (and the homepage teaser).
 * CMS-editable replacement for the static src/content/faqs.ts constants.
 * NOT registered on the seoPlugin — see CLAUDE.md (avoids duplicate metaTitle 500).
 */
export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
  },
  access: { read: () => true },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Về dịch vụ', value: 'dich-vu' },
        { label: 'Về chi phí', value: 'chi-phi' },
        { label: 'Về quy trình', value: 'quy-trinh' },
        { label: 'Về bảo mật', value: 'bao-mat' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
