"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { caseStudies, type CaseStudy } from "@/data/case-studies"
import { world } from "@/lib/world"

function Project({ project, index }: { project: CaseStudy; index: number }) {
  const left = index % 2 === 1
  const total = String(caseStudies.length).padStart(2, "0")

  return (
    <section
      id={`proyecto-${index + 1}`}
      data-chapter
      data-label={project.title}
      className={`relative flex min-h-[125vh] items-end px-6 pb-16 md:min-h-[120vh] md:items-center md:px-12 md:pb-0 ${
        left ? "md:justify-end" : ""
      }`}
    >
      <article
        className="project-panel glass w-full rounded-3xl p-6 md:max-w-[34rem] md:p-9"
        onPointerEnter={() => (world.hover = index)}
        onPointerLeave={() => (world.hover = -1)}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="mono-label text-brand">
            {String(index + 1).padStart(2, "0")} / {total}
          </span>
          <ul className="flex flex-wrap justify-end gap-1.5">
            {project.technologies.map((t) => (
              <li key={t} className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] text-mist">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="font-display text-4xl font-bold leading-none tracking-[-0.03em] md:text-5xl">{project.title}</h3>
        <p className="mt-3 text-brand">{project.tagline}</p>

        <dl className="mt-7 space-y-5 text-[15px] leading-relaxed text-mist">
          {[
            ["Problema", project.problem],
            ["Enfoque", project.approach],
            ["Resultado", project.result],
          ].map(([term, text]) => (
            <div key={term} className={term === "Enfoque" ? "hidden md:block" : undefined}>
              <dt className="mono-label mb-1.5 text-white">{term}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-brand hover:text-white"
            >
              Ver sitio
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              Código
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </article>
    </section>
  )
}

export function Work() {
  const intro = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-title",
        { xPercent: 18 },
        {
          xPercent: -28,
          ease: "none",
          scrollTrigger: { trigger: intro.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      )
      gsap.utils.toArray<HTMLElement>(".project-panel").forEach((panel) => {
        gsap.from(panel, {
          y: 90,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: panel, start: "top 85%" },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div ref={intro} className="relative flex h-[70vh] flex-col justify-center overflow-hidden">
        <p className="mono-label mb-4 px-6 md:px-12">[04] Proyectos</p>
        <h2
          className="work-title whitespace-nowrap font-display text-[clamp(6rem,24vw,24rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em] text-transparent"
          style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.55)" }}
        >
          Trabajo seleccionado
        </h2>
        <p className="mt-6 max-w-lg px-6 text-lg text-mist md:px-12">
          Proyectos donde transformé requerimientos en productos funcionales.
        </p>
      </div>
      {caseStudies.map((project, i) => (
        <Project key={project.id} project={project} index={i} />
      ))}
    </>
  )
}
