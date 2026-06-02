'use client'

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const MATTER_OPTIONS = [
  { value: 'civil', label: 'Tranh chấp dân sự' },
  { value: 'family', label: 'Ly hôn / Gia đình' },
  { value: 'land', label: 'Đất đai / Nhà ở' },
  { value: 'business', label: 'Doanh nghiệp / Lao động' },
  { value: 'criminal', label: 'Hình sự' },
  { value: 'other', label: 'Khác' },
]

export function ContactForm({ scenarioSlug }: { scenarioSlug?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      matterType: String(fd.get('matterType') || 'other'),
      message: String(fd.get('message') || ''),
      scenarioSlug: scenarioSlug || undefined,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setStatus('error')
        setError(data.error || 'Không gửi được. Vui lòng thử lại.')
        return
      }
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Lỗi kết nối. Vui lòng thử lại hoặc gọi 0903.419.479.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex gap-4 rounded-lg border border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/5 p-8">
        <CheckCircle2 className="h-8 w-8 flex-shrink-0 text-[color:var(--color-accent)]" strokeWidth={1.75} />
        <div>
          <h2 className="font-display text-lg font-semibold text-[color:var(--color-ink)]">Đã nhận yêu cầu gọi lại</h2>
          <p className="mt-2 text-[color:var(--color-text-secondary)] leading-relaxed">
            Luật sư sẽ gọi lại cho bạn trong thời gian sớm nhất, trong giờ hành chính. Muốn nhanh hơn? Gọi ngay <strong>0903.419.479</strong>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Họ và tên" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Số điện thoại / Zalo" name="phone" type="tel" autoComplete="tel" />
        <SelectField label="Loại vấn đề" name="matterType" options={MATTER_OPTIONS} />
      </div>
      <TextareaField
        label="Mô tả tình huống"
        name="message"
        required
        rows={6}
        placeholder="Mô tả càng cụ thể càng tốt: việc gì đã xảy ra, các bên liên quan, ngày tháng quan trọng, các tài liệu bạn đang giữ…"
      />
      {error && (
        <p className="text-sm text-[color:var(--color-alert)]" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-primary)] px-6 py-3 font-medium text-white transition-colors hover:bg-[color:var(--color-alert)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Đang gửi…' : (<><Send className="w-4 h-4" /> Yêu cầu gọi lại</>)}
      </button>
      <p className="text-xs text-[color:var(--color-text-secondary)]">
        Bằng việc gửi, bạn đồng ý cho Apolo Lawyers liên hệ với bạn qua điện thoại hoặc email. Thông tin của bạn được bảo mật.
      </p>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-1.5">
        {label} {required && <span className="text-[color:var(--color-alert)]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="block w-full rounded-sm border border-[color:var(--color-hairline-strong)] bg-[color:var(--color-surface-strong)] px-4 py-2.5 text-[color:var(--color-ink)] focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
      />
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: Array<{ value: string; label: string }>
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-1.5">{label}</span>
      <select
        name={name}
        defaultValue="other"
        className="block w-full rounded-sm border border-[color:var(--color-hairline-strong)] bg-[color:var(--color-surface-strong)] px-4 py-2.5 text-[color:var(--color-ink)] focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextareaField({
  label,
  name,
  required,
  rows = 5,
  placeholder,
}: {
  label: string
  name: string
  required?: boolean
  rows?: number
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-1.5">
        {label} {required && <span className="text-[color:var(--color-alert)]">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="block w-full resize-y rounded-sm border border-[color:var(--color-hairline-strong)] bg-[color:var(--color-surface-strong)] px-4 py-3 text-[color:var(--color-ink)] focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
      />
    </label>
  )
}
