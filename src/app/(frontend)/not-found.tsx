import Link from 'next/link'
import { Search } from 'lucide-react'
import { listCategories } from '@/lib/queries'
import { CategoryPill } from '@/components/ui/CategoryPill'

export default async function NotFound() {
  const categories = await listCategories()

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-primary)] font-medium">
        404 — Không tìm thấy
      </p>
      <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight text-[color:var(--color-text-primary)]">
        Tình huống bạn tìm không có ở đây
      </h1>
      <p className="pull-quote mt-6 text-xl text-[color:var(--color-text-secondary)] max-w-2xl mx-auto">
        “Có thể bạn đã đi nhầm đường — nhưng cũng có thể đây chính là lúc để hỏi luật sư trực tiếp.”
      </p>
      <p className="mt-6 text-[color:var(--color-text-secondary)]">
        Thử chọn một nhóm tình huống bên dưới, hoặc{' '}
        <Link href="/lien-he" className="text-[color:var(--color-primary)] font-medium underline-offset-4 hover:underline">
          gửi câu hỏi cho luật sư
        </Link>
        .
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
        {categories.slice(0, 6).map((c) => (
          <CategoryPill key={c.slug} category={c} />
        ))}
      </div>

      <Link
        href="/"
        className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[color:var(--color-primary)] text-white font-medium hover:bg-[color:var(--color-alert)] transition-colors"
      >
        <Search className="w-4 h-4" /> Về trang chủ
      </Link>
    </section>
  )
}
