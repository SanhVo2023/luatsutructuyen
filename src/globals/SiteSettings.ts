import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Luật Sư Trực Tuyến',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Tình huống pháp lý có thật — hướng giải quyết rõ ràng',
    },
    {
      name: 'defaultSeo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', defaultValue: '0903.419.479' },
        { name: 'email', type: 'email', defaultValue: 'contact@apolo.com.vn' },
        { name: 'zaloUrl', type: 'text', defaultValue: 'https://zalo.me/apololawyers' },
        {
          name: 'primaryCtaText',
          type: 'text',
          defaultValue: 'Gọi luật sư ngay',
        },
        {
          name: 'primaryCtaUrl',
          type: 'text',
          // Hotline-first funnel (owner decision): click-to-call the Apolo hotline.
          defaultValue: 'tel:0903419479',
        },
      ],
    },
    {
      name: 'analyticsId',
      type: 'text',
      admin: { description: 'GA4 Measurement ID (G-XXXXXXXXXX).' },
    },
    {
      name: 'acceptingNewMatters',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Toggle off to hide CTAs site-wide during capacity holds.' },
    },
  ],
}
