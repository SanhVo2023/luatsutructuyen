import type { Metadata } from 'next'
import { listCategories, listScenarios, type CategoryDoc } from '@/lib/queries'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { CtaBlock } from '@/components/ui/CtaBlock'
import ScenarioArchive from '@/components/ui/ScenarioArchive'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Tất cả tình huống pháp lý',
  description:
    'Thư viện đầy đủ các tình huống pháp lý có thật — lọc theo chủ đề, mức độ và hướng giải quyết. Đọc câu chuyện giống bạn và biết phải làm gì.',
  alternates: { canonical: '/tinh-huong' },
}

export default async function ArchivePage() {
  const [categories, scenarios] = await Promise.all([
    listCategories(),
    listScenarios({ limit: 200 }),
  ])

  const cats = categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name }))
  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tình huống', href: '/tinh-huong' },
  ]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
      <PageHero
        crumbs={crumbs}
        kicker="Thư viện tình huống"
        title="Tình huống pháp lý có thật"
        lead="Lọc theo chủ đề, mức độ khẩn cấp và hướng giải quyết để tìm nhanh câu chuyện gần với hoàn cảnh của bạn."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        {scenarios.length > 0 ? (
          <ScenarioArchive
            scenarios={scenarios}
            categories={cats.filter((c) =>
              scenarios.some((s) => (s.category as CategoryDoc)?.slug === c.slug),
            )}
          />
        ) : (
          <div className="rounded-lg border border-dashed border-[color:var(--color-secondary)] bg-[color:var(--color-surface-strong)] p-12 text-center">
            <p className="text-[color:var(--color-text-secondary)]">
              Các tình huống đầu tiên đang được biên soạn. Quay lại sớm nhé.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28 lg:px-8">
        <CtaBlock placement="page" />
      </section>
    </>
  )
}
