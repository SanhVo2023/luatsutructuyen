import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
            { name: 'isExternal', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'bottomText',
      type: 'textarea',
      admin: { description: 'Copyright line. Address/phone come from src/config/apolo.ts — do not hardcode here.' },
    },
  ],
}
