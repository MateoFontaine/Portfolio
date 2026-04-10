"use client"

import { Github, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-6 px-4 bg-[#0C1120] border-t border-[#1E293B]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#64748B] text-sm">
          © {currentYear} Mateo Fontaine. Co-fundador de{" "}
          <a
            href="https://devoys.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3A82FF] hover:text-[#60A5FA] transition-colors"
          >
            Devoys
          </a>
          .
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/MateoFontaine"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#64748B] hover:text-[#A1A1AA] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/mateo-fontaine-b6a1b4238/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#64748B] hover:text-[#A1A1AA] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
