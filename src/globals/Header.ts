import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Hỏi Luật Sư',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/lien-he',
    },
  ],
}
