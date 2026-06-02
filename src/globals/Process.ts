import type { GlobalConfig } from 'payload'

/**
 * "Cách hoạt động" — the reader-to-lawyer journey shown on /quy-trinh.
 * CMS replacement for the static src/content/process.ts constants.
 */
export const Process: GlobalConfig = {
  slug: 'process',
  access: { read: () => true },
  fields: [
    { name: 'kicker', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'lead', type: 'textarea' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'BookOpen', value: 'BookOpen' },
            { label: 'ClipboardCheck', value: 'ClipboardCheck' },
            { label: 'MessagesSquare', value: 'MessagesSquare' },
            { label: 'Scale', value: 'Scale' },
          ],
        },
      ],
    },
  ],
}
