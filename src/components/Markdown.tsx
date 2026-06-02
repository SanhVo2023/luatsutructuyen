/**
 * <Markdown> — canonical Server Component for rendering article body content
 * in Phase 2+ sites. Pairs with the Payload `code` field with `language: 'markdown'`
 * (see shared-assets/PAYLOAD_SETUP_SPEC.md §1.5).
 *
 * Copy this file verbatim into each Phase 2+ site at `src/components/Markdown.tsx`.
 *
 * Phase 1 sites use Lexical richText and do NOT use this component — they have
 * their own LexicalRenderer.
 *
 * npm install dependencies (add to site's package.json):
 *   react-markdown remark-gfm rehype-slug rehype-autolink-headings
 *
 * Supported markdown subset (also documented in MARKDOWN_FORMAT_REFERENCE.md):
 *   - ATX headings (## H2, ### H3)        — auto-anchored via rehype-slug
 *   - Bold (**x**), italic (*x*), inline code (`x`)
 *   - Links [text](url)                    — external links auto get target=_blank rel=noopener
 *   - Ordered/unordered lists, blockquotes, horizontal rules
 *   - GFM tables, task lists, strikethrough
 *   - Images ![alt](url)                   — hand off to next/image; URL must be R2-hosted
 *
 * Disallowed:
 *   - Raw HTML inside markdown body (rejected at importer step; ignore here)
 *   - MDX / JSX components
 *   - Setext headings (=== / ---) — use ATX only
 */

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import Image from 'next/image'
import Link from 'next/link'

type MarkdownProps = {
  children: string
  className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return (
    <div
      className={
        className ??
        'prose prose-lg max-w-none prose-headings:font-heading prose-a:text-accent prose-img:rounded-lg'
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
        components={{
          a: ({ href, children }) => {
            if (!href) return <>{children}</>
            const external = /^https?:\/\//i.test(href) && !href.startsWith(siteUrl)
            if (external) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              )
            }
            return <Link href={href}>{children}</Link>
          },
          img: ({ src, alt }) => {
            if (!src || typeof src !== 'string') return null
            return (
              <Image
                src={src}
                alt={alt ?? ''}
                width={1200}
                height={675}
                sizes="(max-width: 768px) 100vw, 720px"
                className="w-full h-auto"
              />
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
