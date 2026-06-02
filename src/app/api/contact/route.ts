import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'

/**
 * Contact form intake. Two writes per submission:
 *   1. Local Payload `contact-submissions` collection — source of truth.
 *   2. Fire-and-forget mirror to CONTACT_HUB_URL (the workspace-wide GAS aggregator
 *      that consolidates all 21 sites' contact entries into one Sheet).
 *
 * The hub mirror must NEVER block the user — if it fails, we log and move on.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Định dạng không hợp lệ.' }, { status: 400 })
  }

  const { name, email, phone, scenarioSlug, matterType, message } = body as Record<string, string | undefined>

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Vui lòng cung cấp họ tên, email, và nội dung câu hỏi.' },
      { status: 400 },
    )
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'Email không hợp lệ.' }, { status: 400 })
  }
  if (message.length < 10) {
    return NextResponse.json({ error: 'Vui lòng mô tả tình huống cụ thể hơn (ít nhất 10 ký tự).' }, { status: 400 })
  }

  try {
    const payload = await getPayload()
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        phone: phone || undefined,
        scenarioSlug: scenarioSlug || undefined,
        matterType: (matterType as 'civil' | 'family' | 'land' | 'business' | 'criminal' | 'other' | undefined) || 'other',
        message,
        submittedAt: new Date().toISOString(),
        status: 'new',
      },
    })

    if (process.env.CONTACT_HUB_URL) {
      fetch(process.env.CONTACT_HUB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: 'luatsutructuyen.net',
          name,
          email,
          phone: phone || '',
          scenario_slug: scenarioSlug || '',
          matter_type: matterType || 'other',
          message,
          language: 'vi',
          locale: request.headers.get('accept-language') || '',
          user_agent: request.headers.get('user-agent') || '',
          source_url: request.headers.get('referer') || '',
        }),
      }).catch((err) => console.error('[contact] hub mirror failed:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] write failed:', err)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi câu hỏi. Vui lòng thử lại hoặc gọi 0903.419.479.' },
      { status: 500 },
    )
  }
}
