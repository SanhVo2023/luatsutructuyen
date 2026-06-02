import type { CollectionConfig } from 'payload'

/**
 * Contact form submissions. Created by the public /api/contact route,
 * which also fire-and-forgets a mirror to CONTACT_HUB_URL (workspace tool).
 * Local Payload write is the source of truth — hub failures must NOT block the user.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'matterType', 'status', 'submittedAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'scenarioSlug', type: 'text', admin: { description: 'If submitted from a scenario article, the article slug.' } },
    {
      name: 'matterType',
      type: 'select',
      options: [
        { label: 'Tranh chấp dân sự', value: 'civil' },
        { label: 'Ly hôn / Gia đình', value: 'family' },
        { label: 'Đất đai / Nhà ở', value: 'land' },
        { label: 'Doanh nghiệp / Lao động', value: 'business' },
        { label: 'Hình sự', value: 'criminal' },
        { label: 'Khác', value: 'other' },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'submittedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
