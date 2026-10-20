"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { introGate, measureAnchors, world } from "@/lib/world"

/** Lenis smooth scrolling + pointer tracking, synced with the GSAP ticker. */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    world.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const lenis = new Lenis({ lerp: world.reduced ? 1 : 0.085, wheelMultiplier: 0.9 })
    world.lenis = lenis
    // hold the page still while the loader is on screen
    if (!introGate.open) lenis.stop()
    introGate.on(() => lenis.start())

    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onPointer = (e: PointerEvent) => {
      world.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      world.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", onPointer, { passive: true })

    measureAnchors()
    const refresh = () => measureAnchors()
    ScrollTrigger.addEventListener("refresh", refresh)
    const ro = new ResizeObserver(() => ScrollTrigger.refresh())
    ro.observe(document.body)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      ro.disconnect()
      ScrollTrigger.removeEventListener("refresh", refresh)
      window.removeEventListener("pointermove", onPointer)
      gsap.ticker.remove(tick)
      lenis.destroy()
      world.lenis = null
    }
  }, [])

  return null
}
