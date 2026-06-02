import dns from 'node:dns'

// IPv4 first — Supabase resolves to IPv6 on some networks. Must run before any DB connection.
dns.setDefaultResultOrder('ipv4first')

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Authors } from './collections/Authors'
import { Scenarios } from './collections/Scenarios'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'
import { Navigation } from './collections/Navigation'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Faqs } from './collections/Faqs'
import { GlossaryTerms } from './collections/GlossaryTerms'

import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Homepage } from './globals/Homepage'
import { Process } from './globals/Process'
import { AuthorityManifesto } from './globals/AuthorityManifesto'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET === 'replace-with-32-plus-random-chars') {
  throw new Error('PAYLOAD_SECRET env var must be set to a real random 32+ char string')
}
if (!process.env.DATABASE_URI) {
  throw new Error('DATABASE_URI env var must be set (Supabase Session Pooler URI)')
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET,

  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' — Luật Sư Trực Tuyến CMS',
    },
  },

  collections: [
    Users,
    Media,
    Categories,
    Authors,
    Scenarios,
    Posts,
    Pages,
    Navigation,
    ContactSubmissions,
    Faqs,
    GlossaryTerms,
  ],

  globals: [
    SiteSettings,
    Header,
    Footer,
    Homepage,
    Process,
    AuthorityManifesto,
  ],

  // No top-level `editor:` block — Phase 2+ markdown architecture has no richText fields.
  // See shared-assets/PAYLOAD_SETUP_SPEC.md §1.5.

  db: postgresAdapter({
    push: process.env.NODE_ENV !== 'production',
    schemaName: 'ltt',
    pool: {
      connectionString: process.env.DATABASE_URI,
      // The Supabase Session Pooler is shared (pool_size 15) across the Funnel
      // project, so keep each instance's footprint small to avoid EMAXCONNSESSION.
      max: 4,
      idleTimeoutMillis: 10_000,
    },
  }),

  plugins: [
    seoPlugin({
      collections: ['scenarios', 'posts', 'pages', 'categories'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        const title = typeof doc?.title === 'string' ? doc.title : typeof doc?.name === 'string' ? doc.name : 'Luật Sư Trực Tuyến'
        return `${title} | Luật Sư Trực Tuyến`
      },
      generateDescription: ({ doc }) => {
        if (typeof doc?.hookText === 'string') return doc.hookText
        if (typeof doc?.description === 'string') return doc.description
        if (typeof doc?.metaDescription === 'string') return doc.metaDescription
        return ''
      },
    }),

    // Media storage → Cloudflare R2 (S3-compatible). Admin uploads persist to R2
    // under /luatsutructuyen.net/cms/ and are served from the public r2.dev host
    // (whitelisted in next.config.ts). Auto-disabled if R2 env is absent so local
    // dev without creds still boots (falls back to Payload's default disk upload).
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: {
          disablePayloadAccessControl: true,
          prefix: 'luatsutructuyen.net/cms',
          generateFileURL: ({ filename, prefix }) =>
            `${process.env.R2_PUBLIC_URL}/${prefix ? `${prefix}/` : ''}${filename}`,
        },
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],

  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  sharp,
})
