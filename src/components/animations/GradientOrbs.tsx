'use client'

/**
 * Three slowly-drifting radial gradient orbs as background decoration.
 * Parameterized for site colors — pass brand hex codes via props.
 *
 * Requires the keyframes orb-drift-1, orb-drift-2, orb-drift-3 in your
 * global CSS (see footer of this file for the snippet to add to globals.css).
 *
 * @example
 *   <section className="relative">
 *     <GradientOrbs primary="#1A9DB0" secondary="#3D5A80" />
 *     <div className="relative z-10">...content...</div>
 *   </section>
 */
interface GradientOrbsProps {
  /** Top-right large orb color (e.g., site's primary brand color) */
  primary?: string
  /** Bottom-left orb color (typically a darker complement) */
  secondary?: string
  /** Center accent orb color (defaults to primary) */
  accent?: string
  className?: string
}

export default function GradientOrbs({
  primary = '#C8A864',
  secondary = '#3D5A80',
  accent,
  className = '',
}: GradientOrbsProps) {
  const accentColor = accent ?? primary

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Primary orb top-right */}
      <div
        className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${primary} 0%, transparent 70%)`,
          animation: 'orb-drift-1 20s ease-in-out infinite',
        }}
      />
      {/* Secondary orb bottom-left */}
      <div
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${secondary} 0%, transparent 70%)`,
          animation: 'orb-drift-2 25s ease-in-out infinite',
        }}
      />
      {/* Accent orb center */}
      <div
        className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 60%)`,
          animation: 'orb-drift-3 30s ease-in-out infinite',
        }}
      />
    </div>
  )
}

/*
Add this to your site's globals.css (or a layout-level <style> tag):

@keyframes orb-drift-1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-30px, 40px); }
}
@keyframes orb-drift-2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(40px, -30px); }
}
@keyframes orb-drift-3 {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(calc(-50% + 30px), calc(-50% - 20px)); }
}
*/
