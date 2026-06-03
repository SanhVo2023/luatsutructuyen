import type { Metadata, Viewport } from 'next'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { FloatingCta } from '@/components/layout/FloatingCta'
import { JsonLd } from '@/components/ui/JsonLd'
import { organizationJsonLd, websiteJsonLd } from '@/lib/organization-schema'
import PageTransition from '@/components/animations/PageTransition'
import { beVietnamPro, lora, jetBrainsMono } from '@/lib/fonts'
import '../globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: {
    default: 'Luật Sư Trực Tuyến — Tình huống pháp lý có thật',
    template: '%s | Luật Sư Trực Tuyến',
  },
  description:
    'Tình huống pháp lý cụ thể, kể bằng ngôn ngữ thường ngày. Hiểu rõ vấn đề của mình và biết cần làm gì tiếp theo. Tư vấn từ Apolo Lawyers.',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL('http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Luật Sư Trực Tuyến',
  },
  robots: { index: true, follow: true },
}

/**
 * Mobile viewport handling for the new Chrome (Android edge-to-edge) and Safari
 * (iOS 26 floating address bar) behaviours:
 * - viewportFit: 'cover' lets the page extend under the browser/system bars and
 *   exposes the env(safe-area-inset-*) values our fixed elements pad against.
 * - interactiveWidget: 'resizes-content' makes the on-screen keyboard shrink the
 *   layout viewport (Chrome/Firefox) so form CTAs aren't hidden behind it.
 * Full-height/fixed UI uses dynamic viewport units (dvh/svh) instead of vh so it
 * tracks the collapsing toolbar instead of being occluded by it.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${lora.variable} ${jetBrainsMono.variable}`}
    >
      <body className="flex min-h-[100svh] flex-col">
        <JsonLd data={[organizationJsonLd(SITE_URL), websiteJsonLd(SITE_URL)]} />
        <MotionProvider>
          <SiteHeader />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
          <FloatingCta />
        </MotionProvider>
      </body>
    </html>
  )
}
