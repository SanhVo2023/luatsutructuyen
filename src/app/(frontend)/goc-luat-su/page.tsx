import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { listPosts } from '@/lib/queries'
import { postTopicLabel } from '@/lib/post-meta'
import { ArticleBanner } from '@/components/ui/ArticleBanner'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { CtaBlock } from '@/components/ui/CtaBlock'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'

// force-dynamic so the build never queries `posts` before the table exists.
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Góc Luật Sư — Phân tích & cảnh báo pháp lý',
  description:
    'Góc nhìn của luật sư Apolo: vì sao câu trả lời miễn phí trên mạng và AI có thể gây hại, và cách nhận biết khi nào bạn thật sự cần luật sư.',
  alternates: { canonical: '/goc-luat-su' },
}

export default async function BlogIndexPage() {
  const posts = await listPosts({ status: 'published', limit: 60 })
  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Góc Luật Sư', href: '/goc-luat-su' },
  ]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
      <PageHero
        crumbs={crumbs}
        kicker="Góc Luật Sư"
        title="Phân tích & cảnh báo từ luật sư thật"
        lead="Vì sao câu trả lời miễn phí trên mạng và AI có thể dẫn bạn đi sai đường — và khi nào bạn thật sự cần một luật sư có trách nhiệm."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StaggerReveal staggerDelay={0.07} className="contents">
              {posts.map((post) => {
                const topic = postTopicLabel(post.topic)
                return (
                  <Link
                    key={String(post.id)}
                    href={`/goc-luat-su/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl bg-[color:var(--color-surface-strong)] shadow-[0_1px_0_var(--color-hairline)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(27,23,20,0.14)]"
                  >
                    <ArticleBanner
                      seed={post.slug}
                      title={post.title}
                      label={topic}
                      titleAs="h2"
                      className="aspect-[16/10] rounded-xl transition-transform duration-500 group-hover:scale-[1.015]"
                      titleClassName="font-display text-base font-semibold leading-snug text-white line-clamp-3"
                    />
                    <div className="flex flex-1 flex-col gap-3 px-1.5 pb-1.5 pt-4">
                      <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-1 text-xs text-[color:var(--color-text-secondary)]">
                        {post.readingTime ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3 w-3" /> {post.readingTime} phút đọc
                          </span>
                        ) : post.publishedDate ? (
                          <span>{new Date(post.publishedDate).toLocaleDateString('vi-VN')}</span>
                        ) : (
                          <span />
                        )}
                        <ArrowUpRight className="h-4 w-4 text-[color:var(--color-primary)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </StaggerReveal>
          </div>
        ) : (
          <ScrollReveal>
            <div className="rounded-lg border border-dashed border-[color:var(--color-secondary)] bg-[color:var(--color-surface-strong)] p-12 text-center">
              <p className="text-[color:var(--color-text-secondary)]">
                Những bài viết đầu tiên đang được biên soạn. Quay lại sớm nhé.
              </p>
            </div>
          </ScrollReveal>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28 lg:px-8">
        <CtaBlock placement="page" />
      </section>
    </>
  )
}
