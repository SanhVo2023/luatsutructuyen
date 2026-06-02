import type { FieldHook } from 'payload'

const slugify = (input: string): string =>
  input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Auto-populate `slug` from the given source field when slug is empty or unchanged.
 * Drop in via `hooks.beforeChange: [autoSlug('title')]`.
 *
 * Use as a collection-level hook (not a field-level hook) so we can read sibling fields.
 */
export function autoSlug(sourceField: string) {
  return async ({ data, originalDoc }: Parameters<NonNullable<NonNullable<import('payload').CollectionBeforeChangeHook>>>[0]) => {
    if (!data) return data
    const incoming = (data as Record<string, unknown>).slug as string | undefined
    const source = (data as Record<string, unknown>)[sourceField] as string | undefined
    if (!incoming || incoming.trim() === '') {
      if (source) {
        ;(data as Record<string, unknown>).slug = slugify(source)
      }
    } else {
      ;(data as Record<string, unknown>).slug = slugify(incoming)
    }
    return data
  }
}

/**
 * Legacy field-level slug hook — kept around in case a collection needs a direct
 * field hook attachment. Prefer the collection-level `autoSlug()` above.
 */
export const slugifyFieldHook: FieldHook = ({ value, data }) => {
  if (typeof value === 'string' && value.trim() !== '') {
    return slugify(value)
  }
  const title = (data as Record<string, unknown> | undefined)?.title
  const name = (data as Record<string, unknown> | undefined)?.name
  const source = (typeof title === 'string' && title) || (typeof name === 'string' && name) || ''
  return source ? slugify(source) : value
}
