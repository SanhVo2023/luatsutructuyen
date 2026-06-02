import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock, CalendarDays } from 'lucide-react'
import { getPostBySlug, type MediaDoc, type AuthorDoc } from '@/lib/queries'
import { LTT } from '@/lib/imagery'
import { postTopicLabel } from '@/lib/post-meta'
import { Markdown } from '@/components/Markdown'
import { Breadcrumb, breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'
import { CtaBlock } from '@/components/ui/CtaBlock'
import { EDITORIAL_AUTHOR } from '@/config/apolo'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ReadingProgress from '@/components/article/ReadingProgress'
import ScrollSpyToc from '@/components/article/ScrollSpyToc'
import ShareRow from '@/components/article/ShareRow'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  const title = post.meta?.title ?? post.title
  const description = post.meta?.description ?? post.excerpt
  const hero = post.heroImage as MediaDoc | null
  const ogUrl = hero?.sizes?.og?.url ?? hero?.url ?? undefined
  return {
    title,
    description,
    alternates: { canonical: `/goc-luat-su/${post.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/goc-luat-su/${post.slug}`,
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function PostDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post || post.status !== 'published') notFound()

  const hero = post.heroImage as MediaDoc | null
  const heroUrl = hero?.sizes?.hero?.url ?? hero?.url ?? LTT.blogCover
  const heroAlt = hero?.alt ?? post.title
  const author = (post.author as AuthorDoc | null) ?? null
  const authorName = author?.name ?? EDITORIAL_AUTHOR.name
  const authorRole = author?.role ?? 'Đội ngũ biên tập pháp lý Apolo Lawyers'
  const topic = postTopicLabel(post.topic)
  const pageUrl = `${SITE_URL}/goc-luat-su/${post.slug}`

  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Góc Luật Sư', href: '/goc-luat-su' },
    { label: post.title, href: `/goc-luat-su/${post.slug}` },
  ]

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: heroUrl ? [heroUrl] : undefined,
    datePublished: post.publishedDate ?? undefined,
    author: { '@type': 'Organization', name: authorName, url: `${SITE_URL}/ve-chung-toi` },
    publisher: { '@type': 'Organization', name: 'Apolo Lawyers', url: 'https://www.apolo.com.vn' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  }

  return (
    <>
      <ReadingProgress />
      <JsonLd data={[breadcrumbJsonLd(crumbs, SITE_URL), articleJsonLd]} />

      <section className="border-b border-[color:var(--color-hairline)]">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14 lg:px-8">
          <Breadcrumb items={crumbs} />
          <ScrollReveal>
            {topic && <p className="kicker mt-7">{topic}</p>}
            <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-[color:var(--color-ink)] md:text-4xl lg:text-[3.1rem]">
              {post.title}
            </h1>
            <p className="pull-quote mt-5 text-lg leading-relaxed md:text-xl">{post.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[color:var(--color-hairline)] pt-5 font-mono text-[0.72rem] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              <span className="text-[color:var(--color-ink)]">{authorName}</span>
              {post.publishedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(post.publishedDate).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {post.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {post.readingTime} phút đọc
                </span>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <figure className="mx-auto mt-8 max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-[color:var(--color-hairline)] shadow-[0_20px_60px_rgba(27,23,20,0.12)]">
          <Image
            src={heroUrl}
            alt={heroAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>
      </figure>

      <article className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_240px] lg:px-8">
        <div className="min-w-0">
          <Markdown className="article-body prose prose-lg max-w-none">{post.content}</Markdown>

          <div className="mt-10 flex flex-col gap-5 rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-sm bg-[color:var(--color-ink)] font-display text-lg font-semibold text-[color:var(--color-secondary)]">
                {authorName.slice(0, 1)}
              </span>
              <div>
                <p className="font-display font-semibold text-[color:var(--color-ink)]">{authorName}</p>
                <p className="text-sm text-[color:var(--color-text-secondary)]">{authorRole}</p>
              </div>
            </div>
            <ShareRow url={pageUrl} title={post.title} />
          </div>

          <div className="mt-10">
            <CtaBlock placement="article-end" />
          </div>
        </div>

        {post.tocItems && post.tocItems.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <ScrollSpyToc items={post.tocItems} />
            </div>
          </aside>
        )}
      </article>
    </>
  )
}
