import { ImageResponse } from 'next/og'

export const alt = 'Luật Sư Trực Tuyến — Tình huống pháp lý đời thực'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f1f33 60%, #0a1626 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 96,
              height: 96,
              borderRadius: 22,
              background: 'rgba(201, 161, 74, 0.12)',
              border: '1px solid rgba(201, 161, 74, 0.4)',
            }}
          >
            <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
              <g
                stroke="#c9a14a"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M32 14 L32 46" />
                <path d="M16 22 L48 22" />
                <path d="M24 50 L40 50" />
                <path d="M16 22 L11 33 L21 33 Z" />
                <path d="M48 22 L43 33 L53 33 Z" />
              </g>
              <circle cx="32" cy="14" r="3" fill="#c9a14a" />
            </svg>
          </div>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#c9a14a',
            }}
          >
            Apolo Lawyers
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#ffffff',
            }}
          >
            Luật Sư Trực Tuyến
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              color: '#d6dde6',
            }}
          >
            Tình huống pháp lý đời thực
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            color: '#9fb0c4',
          }}
        >
          <div
            style={{
              width: 48,
              height: 4,
              borderRadius: 2,
              background: '#c9a14a',
            }}
          />
          luatsutructuyen.net
        </div>
      </div>
    ),
    { ...size },
  )
}
