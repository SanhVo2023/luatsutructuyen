import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #1e3a5f 0%, #0f1f33 100%)',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
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
    ),
    { ...size },
  )
}
