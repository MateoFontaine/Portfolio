"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Mail } from "lucide-react"
import { Magnetic } from "@/components/ui-kit/magnetic"

const EMAIL = "mateofontaine7@gmail.com"

export function Contact() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(".contact-line > span", {
        yPercent: 115,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      })
      gsap.from(".contact-fade", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="contacto"
      data-chapter
      data-label="Contacto"
      className="relative flex min-h-svh flex-col justify-end px-6 pb-10 pt-32 md:px-12"
    >
      <p className="mono-label contact-fade mb-6">[05] Contacto</p>
      <h2 className="font-display text-[clamp(3.4rem,14vw,14rem)] font-bold uppercase leading-[0.84] tracking-[-0.045em]">
        <span className="contact-line block overflow-hidden pb-[0.06em]">
          <span className="block">Hablemos</span>
        </span>
      </h2>
      <p className="contact-fade mt-6 max-w-md text-lg text-mist">¿Tenés un proyecto en mente? Escribime y conversamos.</p>

      <div className="contact-fade mt-8 flex flex-col items-start gap-6">
        <a
          href={`mailto:${EMAIL}`}
          className="group inline-flex items-center gap-3 font-display text-[clamp(1.3rem,3.4vw,2.6rem)] font-medium tracking-tight"
        >
          <Mail className="h-[0.8em] w-[0.8em] text-brand" />
          <span className="link-underline">{EMAIL}</span>
          <ArrowUpRight className="h-[0.8em] w-[0.8em] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>

        <div className="flex flex-wrap gap-3">
          <Magnetic href="https://github.com/MateoFontaine" variant="ghost" external>
            GitHub
          </Magnetic>
          <Magnetic href="https://www.linkedin.com/in/mateo-fontaine-b6a1b4238/" variant="ghost" external>
            LinkedIn
          </Magnetic>
          <Magnetic href="https://devoys.com.ar" variant="ghost" external>
            Devoys
          </Magnetic>
        </div>
      </div>

      <footer className="contact-fade mt-16 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <p className="mono-label">
          © {new Date().getFullYear()} Mateo Fontaine · Founder de{" "}
          <a href="https://devoys.com.ar" target="_blank" rel="noopener noreferrer" className="text-brand">
            Devoys
          </a>
        </p>
        <p className="mono-label">Next.js · Three.js · GSAP</p>
      </footer>
    </section>
  )
}
