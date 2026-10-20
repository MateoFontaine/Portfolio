"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { introGate } from "@/lib/world"
import { Magnetic } from "@/components/ui-kit/magnetic"

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-line > span", { yPercent: 115 })
      gsap.set(".hero-fade", { opacity: 0, y: 28 })
      introGate.on(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(".hero-line > span", { yPercent: 0, duration: 1.6, stagger: 0.14 })
          .to(".hero-fade", { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, "-=1.1")
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="inicio"
      data-chapter
      data-label="Inicio"
      className="relative flex min-h-svh flex-col justify-end px-6 pb-24 pt-32 md:px-12 md:pb-20"
    >
      <h1 className="font-display text-[clamp(3.6rem,15.5vw,16rem)] font-bold uppercase leading-[0.82] tracking-[-0.045em]">
        <span className="hero-line block overflow-hidden pb-[0.06em]">
          <span className="block">Mateo</span>
        </span>
        <span className="hero-line block overflow-hidden pb-[0.06em]">
          <span className="block">Fontaine</span>
        </span>
      </h1>

      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="hero-fade max-w-xl">
          <p className="text-lg text-white md:text-xl">
            Founder de{" "}
            <a
              href="https://devoys.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-brand"
            >
              Devoys
            </a>
          </p>
          <p className="mt-2 text-xl text-mist md:text-2xl">Transformo requerimientos en productos que funcionan.</p>
        </div>

        <div className="hero-fade flex flex-wrap gap-3">
          <Magnetic to="proyecto-1">Ver proyectos</Magnetic>
          <Magnetic to="contacto" variant="ghost">
            Contactar
          </Magnetic>
        </div>
      </div>

      <div className="hero-fade absolute bottom-6 right-6 hidden items-center gap-3 md:flex md:right-12">
        <span className="mono-label">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-0 bg-white" style={{ animation: "scroll-cue 1.8s cubic-bezier(0.65,0,0.35,1) infinite" }} />
        </span>
      </div>
    </section>
  )
}
