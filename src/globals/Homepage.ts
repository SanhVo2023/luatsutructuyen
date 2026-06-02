import type { GlobalConfig } from 'payload'

/**
 * Editable copy for the magazine-style homepage (hero, ticker, section headings,
 * end CTA). CMS replacement for strings currently hardcoded in
 * src/app/(frontend)/page.tsx. heroImage is left for later media linking.
 */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: { read: () => true },
  fields: [
    { name: 'heroKicker', type: 'text' },
    { name: 'heroHeadline', type: 'text' },
    {
      name: 'heroHighlight',
      type: 'text',
      admin: { description: 'the phrase inside the headline to visually emphasize' },
    },
    { name: 'heroSubhead', type: 'textarea' },
    { name: 'heroCtaLabel', type: 'text' },
    { name: 'heroCtaTel', type: 'text' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroImageCaption', type: 'text' },
    {
      name: 'trustBadges',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
    {
      name: 'ticker',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
    { name: 'featuredKicker', type: 'text' },
    { name: 'featuredHeading', type: 'text' },
    { name: 'categoriesKicker', type: 'text' },
    { name: 'categoriesHeading', type: 'text' },
    { name: 'ctaHeading', type: 'text' },
    { name: 'ctaSubhead', type: 'textarea' },
  ],
}
