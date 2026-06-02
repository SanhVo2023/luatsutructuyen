// Pass-through root layout. The actual <html>/<body> chrome is provided by:
//   - src/app/(frontend)/layout.tsx — public site (loads globals.css, fonts, header, footer)
//   - src/app/(payload)/layout.tsx  — Payload admin (its own isolated styling)
// Keeps Tailwind preflight and site fonts out of the /admin tree.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
