import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

/**
 * Revalidate one or more frontend paths after a Payload document is saved.
 * Use via `hooks.afterChange: [revalidateAfterChange((doc) => ['/', '/...'])]`.
 *
 * Wrapped in try/catch so a Next runtime error never breaks the admin save flow.
 */
export function revalidateAfterChange(
  resolvePaths: (doc: Record<string, unknown>) => string[],
): CollectionAfterChangeHook {
  return async ({ doc, operation }) => {
    if (operation !== 'create' && operation !== 'update') return doc
    try {
      const paths = resolvePaths(doc as Record<string, unknown>)
      for (const path of paths) {
        if (path) revalidatePath(path)
      }
    } catch (err) {
      console.error('[revalidate] failed:', err)
    }
    return doc
  }
}
