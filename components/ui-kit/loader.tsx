"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { introGate, sceneReady, world } from "@/lib/world"

const MIN_MS = 1600
const MAX_MS = 7000

/** Full-screen counter that waits for the WebGL scene, then lifts like a curtain. */
export function Loader() {
  const root = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const start = performance.now()
    const state = { value: 0 }
    let finished = false

    const render = () => {
      if (counter.current) counter.current.textContent = String(Math.round(state.value)).padStart(3, "0")
      if (bar.current) bar.current.style.transform = `scaleX(${state.value / 100})`
    }

    // creep towards 90% while loading, jump to 100% when the scene is ready
    const creep = gsap.to(state, { value: 90, duration: 4, ease: "power2.out", onUpdate: render })

    const finish = () => {
      if (finished) return
      finished = true
      creep.kill()
      gsap
        .timeline()
        .to(state, { value: 100, duration: 0.5, ease: "power2.inOut", onUpdate: render })
        .to(root.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut", delay: 0.15 })
        .add(() => {
          introGate.fire()
          gsap.to(world, { intro: 1, duration: 2.4, ease: "expo.out" })
        }, "-=0.55")
        .set(root.current, { display: "none" })
    }

    sceneReady.on(() => {
      const wait = Math.max(MIN_MS - (performance.now() - start), 0)
      window.setTimeout(finish, wait)
    })
    const fallback = window.setTimeout(finish, MAX_MS)

    return () => {
      creep.kill()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 md:p-10">
      <div className="flex items-center justify-between">
        <span className="mono-label">Mateo Fontaine</span>
        <span className="mono-label">Portfolio ’{String(new Date().getFullYear()).slice(2)}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-display text-[clamp(5rem,22vw,18rem)] font-bold leading-[0.8] tracking-[-0.05em]">
          <span ref={counter}>000</span>
        </span>
        <span className="mono-label mb-2 hidden sm:block">Cargando experiencia</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <div ref={bar} className="h-full origin-left bg-brand" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  )
}
