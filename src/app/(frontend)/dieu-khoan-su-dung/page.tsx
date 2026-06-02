import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/queries'
import { PageContent } from '@/components/ui/PageContent'
import { Breadcrumb, breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('dieu-khoan-su-dung')
  return {
    title: page?.meta?.title ?? page?.title ?? 'Điều khoản sử dụng',
    description: page?.meta?.description ?? undefined,
    alternates: { canonical: '/dieu-khoan-su-dung' },
  }
}

export default async function TermsPage() {
  const page = await getPageBySlug('dieu-khoan-su-dung')
  if (!page || page.status !== 'published') notFound()

  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: page.title, href: '/dieu-khoan-su-dung' },
  ]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
      <section className="border-b border-[color:var(--color-hairline)]">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14 lg:px-8">
          <Breadcrumb items={crumbs} />
          <p className="kicker mt-6">Pháp lý</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-[color:var(--color-ink)] md:text-4xl">
            {page.title}
          </h1>
        </div>
      </section>
      <PageContent body={page.content ?? ''} />
    </>
  )
}
