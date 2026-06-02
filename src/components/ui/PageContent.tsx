import { Markdown } from '@/components/Markdown'

/**
 * Wrapper around <Markdown> for editable static pages (privacy, terms, about).
 * Differs from scenario article rendering in that we don't add a TOC sidebar
 * and we use a narrower prose width tuned for legal copy.
 */
export function PageContent({ body }: { body: string }) {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
      <Markdown>{body}</Markdown>
    </div>
  )
}
