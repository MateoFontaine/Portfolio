"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const STATEMENT: { text: string; href?: string }[] = [
  ..."Soy founder de".split(" ").map((text) => ({ text })),
  { text: "Devoys,", href: "https://devoys.com.ar" },
  ..."una empresa que desarrolla soluciones digitales. Más que escribir código, me dedico a entender problemas y transformarlos en productos que realmente funcionan."
    .split(" ")
    .map((text) => ({ text })),
]

export function About() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        })
        .fromTo(".word", { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: "none", duration: 1 })
        .fromTo(".about-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, ">-0.2")
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="sobre-mi" data-chapter data-label="Sobre mí" className="relative h-[240vh]">
      <div className="sticky top-0 flex min-h-svh flex-col justify-center px-6 py-24 md:px-12">
        <p className="mono-label mb-8">[01] Sobre mí</p>
        <p className="max-w-5xl font-display text-[clamp(1.8rem,4.4vw,4.2rem)] font-medium leading-[1.12] tracking-[-0.02em]">
          {STATEMENT.map((w, i) =>
            w.href ? (
              <span key={i} className="word inline-block pr-[0.25em]">
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="link-underline text-brand">
                  {w.text}
                </a>
              </span>
            ) : (
              <span key={i} className="word inline-block pr-[0.25em]">
                {w.text}
              </span>
            ),
          )}
        </p>
        <p className="about-sub mt-10 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
          Estudié Ingeniería en Sistemas en UADE, pero la mayor parte de lo que sé lo aprendí construyendo proyectos
          reales. Lo que me diferencia es que no solo desarrollo — también analizo, planifico, y me ocupo de que el
          resultado final sea exactamente lo que el cliente necesita.
        </p>
      </div>
    </section>
  )
}
