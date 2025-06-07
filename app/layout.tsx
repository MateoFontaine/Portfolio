import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mateo Fontaine - Desarrollador Frontend",
  description:
    "Portfolio de Mateo Fontaine, desarrollador web especializado en React, Firebase y tecnologías modernas.",
  keywords: "desarrollador, frontend, React, Firebase, TailwindCSS, portfolio",
  authors: [{ name: "Mateo Fontaine" }],
  openGraph: {
    title: "Mateo Fontaine - Desarrollador Frontend",
    description:
      "Portfolio de Mateo Fontaine, desarrollador web especializado en React, Firebase y tecnologías modernas.",
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
