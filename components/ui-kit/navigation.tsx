"use client"

import { useEffect, useRef, useState } from "react"
import { chapterLabels, goTo, world } from "@/lib/world"

const LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyecto-1", label: "Trabajo" },
  { id: "contacto", label: "Contacto" },
]

/** Top bar, scroll progress, chapter HUD and the mobile menu. */
export function Navigation() {
  const [open, setOpen] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const hudIndex = useRef<HTMLSpanElement>(null)
  const hudLabel = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    let labels: string[] = []
    let last = -1
    const loop = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const scroll = world.lenis?.scroll ?? window.scrollY
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scroll / max : 0})`
      if (!labels.length) labels = chapterLabels()
      const idx = Math.round(world.chapterPos)
      if (idx !== last && labels[idx]) {
        last = idx
        if (hudIndex.current) hudIndex.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(labels.length).padStart(2, "0")}`
        if (hudLabel.current) hudLabel.current.textContent = labels[idx]
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open)
    if (open) world.lenis?.stop()
    else world.lenis?.start()
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // wait a tick so the scroll lock is released before scrolling
    requestAnimationFrame(() => goTo(id))
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault()
            go("inicio")
          }}
          className="font-display text-xl font-bold tracking-tight"
          aria-label="Ir al inicio"
        >
          MF<span className="text-brand">.</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-ink/40 p-1.5 backdrop-blur-md md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault()
                go(l.id)
              }}
              className="rounded-full px-4 py-2 text-sm text-mist transition-colors hover:bg-white hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-white/15 bg-ink/40 backdrop-blur-md md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span className={`h-px w-5 bg-white transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-white transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[55] flex flex-col justify-center gap-2 bg-ink/95 px-8 backdrop-blur-xl transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => {
              e.preventDefault()
              go(l.id)
            }}
            className="flex items-baseline gap-4 font-display text-5xl font-bold tracking-tight"
          >
            <span className="mono-label">0{i + 1}</span>
            {l.label}
          </a>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-white/5">
        <div ref={bar} className="h-full origin-left bg-brand" style={{ transform: "scaleX(0)" }} />
      </div>

      <div className="pointer-events-none fixed bottom-6 left-6 z-40 hidden items-center gap-3 md:flex md:left-12">
        <span ref={hudIndex} className="mono-label text-white">01 / 01</span>
        <span className="h-px w-8 bg-white/30" />
        <span ref={hudLabel} className="mono-label" />
      </div>
    </>
  )
}
