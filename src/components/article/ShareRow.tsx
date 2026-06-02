'use client'

import { useState } from 'react'
import { Facebook, Link2, Check, MessageCircle } from 'lucide-react'

/** Compact share rail for articles: copy-link + Facebook + Zalo. */
export default function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const enc = encodeURIComponent(url)
  const encTitle = encodeURIComponent(title)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const btn =
    'inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-hairline)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:border-[color:var(--color-primary)]/40 hover:text-[color:var(--color-primary)]'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[0.66rem] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        Chia sẻ
      </span>
      <button type="button" onClick={copy} className={btn} aria-label="Sao chép liên kết">
        {copied ? <Check className="h-3.5 w-3.5 text-[color:var(--color-accent)]" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? 'Đã chép' : 'Liên kết'}
      </button>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <Facebook className="h-3.5 w-3.5" /> Facebook
      </a>
      <a
        href={`https://zalo.me/share?u=${enc}&t=${encTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <MessageCircle className="h-3.5 w-3.5" /> Zalo
      </a>
    </div>
  )
}
