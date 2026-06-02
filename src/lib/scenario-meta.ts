/**
 * Pure, server-safe display helpers for scenario metadata (urgency + outcome).
 * Used by cards, the archive filter, and the scenario detail header so the
 * vocabulary stays consistent everywhere.
 */

export type Urgency = 'low' | 'medium' | 'high'
export type Outcome = 'negotiation' | 'lawsuit' | 'mediation' | 'mixed'

export const URGENCY_META: Record<Urgency, { label: string; tone: string }> = {
  low: { label: 'Tham khảo', tone: 'olive' },
  medium: { label: 'Cần hành động', tone: 'primary' },
  high: { label: 'Khẩn cấp', tone: 'alert' },
}

export const OUTCOME_META: Record<Outcome, { label: string }> = {
  negotiation: { label: 'Thương lượng' },
  lawsuit: { label: 'Khởi kiện' },
  mediation: { label: 'Hòa giải' },
  mixed: { label: 'Kết hợp nhiều hướng' },
}

/** Maps a tone keyword to its CSS custom property color. */
export function toneVar(tone: string): string {
  switch (tone) {
    case 'olive':
      return 'var(--color-accent)'
    case 'alert':
    case 'rust':
      return 'var(--color-alert)'
    case 'clay':
    case 'secondary':
      return 'var(--color-secondary)'
    default:
      return 'var(--color-primary)'
  }
}

export function urgencyMeta(level?: string | null) {
  if (!level || !(level in URGENCY_META)) return null
  return URGENCY_META[level as Urgency]
}

export function outcomeMeta(type?: string | null) {
  if (!type || !(type in OUTCOME_META)) return null
  return OUTCOME_META[type as Outcome]
}
