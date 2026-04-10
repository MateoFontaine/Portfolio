"use client";

import { Mail, Github, Linkedin } from "lucide-react";

const socialLinks = [
  {
    href: "mailto:mateofontaine7@gmail.com",
    label: "mateofontaine7@gmail.com",
    icon: Mail,
  },
  {
    href: "https://github.com/MateoFontaine",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/mateo-fontaine-b6a1b4238/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://devoys.com.ar",
    label: "Devoys",
    icon: null,
  },
];

export function Contact() {
  return (
    <section
      id="contacto"
      className="min-h-screen flex items-center justify-center bg-[#0C1120] px-4"
    >
      <div className="max-w-2xl w-full text-center">
        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Hablemos
        </h2>
        <p className="text-[#A1A1AA] text-lg mb-12 max-w-md mx-auto">
          ¿Tenés un proyecto en mente? Escribime y conversamos.
        </p>

        {/* Links de contacto */}
        <div className="flex flex-col items-center gap-4">
          {/* Email principal */}
          <a
            href="mailto:mateofontaine7@gmail.com"
            className="inline-flex items-center gap-3 px-6 py-4 bg-[#1E293B] hover:bg-[#334155] text-white rounded-lg transition-colors duration-200 group"
          >
            <Mail className="w-5 h-5 text-[#3B82FF]" />
            <span className="text-lg">mateofontaine7@gmail.com</span>
          </a>

          {/* Redes sociales */}
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://github.com/MateoFontaine"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E293B] hover:bg-[#334155] text-[#A1A1AA] hover:text-white rounded-lg transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/mateo-fontaine-b6a1b4238/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E293B] hover:bg-[#334155] text-[#A1A1AA] hover:text-white rounded-lg transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </a>

            <a
              href="https://devoys.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E293B] hover:bg-[#334155] text-[#A1A1AA] hover:text-white rounded-lg transition-colors duration-200"
            >
              <span className="text-sm font-medium">Devoys</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
