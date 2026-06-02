import { getCachedCategories } from '@/lib/queries'
import { HeaderClient } from './HeaderClient'

const UTILITY_SLUGS = ['co-nen-kien-khong', 'can-chuan-bi-gi']

export async function SiteHeader() {
  const categories = await getCachedCategories()
  const scenarioCategories = categories.filter((c) => !UTILITY_SLUGS.includes(c.slug))
  const utilityCategories = categories.filter((c) => UTILITY_SLUGS.includes(c.slug))

  const now = new Date()
  const dateLabel = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(now)

  return (
    <HeaderClient
      scenarioCategories={scenarioCategories.map((c) => ({ slug: c.slug, name: c.name }))}
      utilityCategories={utilityCategories.map((c) => ({ slug: c.slug, name: c.name }))}
      dateLabel={dateLabel}
    />
  )
}
