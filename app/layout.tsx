import type { Metadata, Viewport } from "next"
import "@fontsource/space-grotesk/400.css"
import "@fontsource/space-grotesk/500.css"
import "@fontsource/space-grotesk/700.css"
import "@fontsource/jetbrains-mono/500.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mateo Fontaine | Founder de Devoys",
  description: "Transformo requerimientos en productos que funcionan.",
  keywords: "desarrollador, frontend, React, Next.js, Supabase, Node.js, IA, Devoys, portfolio, proyectos, tecnología",
  authors: [{ name: "Mateo Fontaine" }],
  openGraph: {
    title: "Mateo Fontaine | Founder de Devoys",
    description: "Transformo requerimientos en productos que funcionan.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0C1120",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
