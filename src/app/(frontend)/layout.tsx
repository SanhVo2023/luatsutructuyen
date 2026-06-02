import type { Metadata } from 'next'
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

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${lora.variable} ${jetBrainsMono.variable}`}
    >
      <body className="flex flex-col min-h-screen">
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
