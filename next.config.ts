import dns from 'node:dns'
import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

dns.setDefaultResultOrder('ipv4first')

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev',
        pathname: '/luatsutructuyen.net/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev',
        pathname: '/shared/**',
      },
      {
        // r2-shared library — pre-generated assets from vothienhien.com's
        // catalog (see shared-assets/r2-shared/MANIFEST.md) reused across sites
        // for backgrounds, practice-area imagery, and decorative accents.
        protocol: 'https',
        hostname: 'pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev',
        pathname: '/vothienhien.com/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default withPayload(nextConfig)
