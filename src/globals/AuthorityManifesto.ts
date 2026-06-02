import type { GlobalConfig } from 'payload'

/**
 * "The Authority Gap" manifesto on /vi-sao-luat-su — why free online/AI legal
 * answers can't replace a qualified, accountable luật sư.
 * CMS replacement for the static src/content/why-lawyer.ts constants.
 */
export const AuthorityManifesto: GlobalConfig = {
  slug: 'authority-manifesto',
  access: { read: () => true },
  fields: [
    { name: 'heroKicker', type: 'text' },
    { name: 'heroTitle', type: 'text' },
    { name: 'heroLead', type: 'textarea' },
    {
      name: 'reasons',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'ShieldAlert', value: 'ShieldAlert' },
            { label: 'Scale', value: 'Scale' },
            { label: 'Target', value: 'Target' },
            { label: 'Lock', value: 'Lock' },
            { label: 'FileWarning', value: 'FileWarning' },
            { label: 'Gavel', value: 'Gavel' },
          ],
        },
      ],
    },
    { name: 'onlineLabel', type: 'text' },
    {
      name: 'onlinePoints',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
    { name: 'lawyerLabel', type: 'text' },
    {
      name: 'lawyerPoints',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
  ],
}
