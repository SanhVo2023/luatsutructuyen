'use client'

import type { ReactNode } from 'react'

/**
 * Infinite horizontal ticker. Renders its children twice so the loop is
 * seamless (the CSS keyframe translates -50%). Pauses on hover; the
 * `animate-marquee` keyframe is disabled under prefers-reduced-motion (globals.css).
 *
 * @example
 *   <Marquee>
 *     <span>20+ năm kinh nghiệm</span><Dot /><span>100+ tình huống</span>...
 *   </Marquee>
 */
export default function Marquee({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
