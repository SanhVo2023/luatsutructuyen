/**
 * Server-rendered JSON-LD script tag. Use directly in any Server Component.
 * Accepts a JSON-LD object (or array of objects); serializes safely.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
