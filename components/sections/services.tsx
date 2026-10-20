"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TiltCard } from "@/components/ui-kit/tilt-card"

const SERVICES = [
  {
    title: "Análisis de Requerimientos",
    description:
      "Entiendo la necesidad del cliente, estructuro el plan y defino alcances realistas antes de escribir código.",
  },
  {
    title: "Desarrollo End-to-End",
    description:
      "Construyo productos completos desde el diseño hasta la implementación técnica, sin perder de vista la experiencia del usuario.",
  },
  {
    title: "Trabajo con Clientes",
    description:
      "Me comunico de forma clara, escucho feedback y ajusto el rumbo cuando es necesario. El proyecto es de ambos.",
  },
  {
    title: "Gestión de Proyectos",
    description:
      "Coordino tareas, defino prioridades y entrego resultados en tiempo y forma. Sin excusas, con comunicación.",
  },
]

export function Services() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(".service", {
        y: 80,
        opacity: 0,
        rotateX: -12,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".service-grid", start: "top 80%" },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="como-trabajo"
      data-chapter
      data-label="Cómo trabajo"
      className="relative flex min-h-svh flex-col justify-center px-6 py-28 md:px-12"
    >
      <p className="mono-label mb-4">[02] Cómo trabajo</p>
      <h2 className="mb-12 max-w-3xl font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.035em]">
        No solo código.
        <br />
        <span className="text-mist">Todo lo que lo rodea.</span>
      </h2>

      <div className="service-grid grid gap-4 md:grid-cols-2 lg:max-w-5xl">
        {SERVICES.map((s, i) => (
          <TiltCard key={s.title} className="service glass rounded-2xl p-7">
            <span className="mono-label text-brand">0{i + 1}</span>
            <h3 className="mt-6 text-2xl font-bold tracking-tight">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-mist">{s.description}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
