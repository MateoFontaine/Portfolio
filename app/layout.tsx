import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mateo Fontaine | Co-fundador de Devoys",
  description:
    "Transformo requerimientos en productos que funcionan.",
  keywords: "desarrollador, frontend, React, Next.js, Firebase, Devoys, portfolio, proyectos, tecnología",
  authors: [{ name: "Mateo Fontaine" }],
  openGraph: {
    title: "Mateo Fontaine | Co-fundador de Devoys",
    description: "Transformo requerimientos en productos que funcionan.",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
