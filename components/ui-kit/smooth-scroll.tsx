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

    // always open on the hero, the loader is its curtain
    history.scrollRestoration = "manual"
    window.scrollTo(0, 0)

    const lenis = new Lenis({ lerp: world.reduced ? 1 : 0.085, wheelMultiplier: 0.9 })
    world.lenis = lenis
    // hold the page still while the loader is on screen (CSS also locks native scroll)
    if (!introGate.open) lenis.stop()
    introGate.on(() => {
      document.documentElement.classList.add("intro-done")
      if (world.lenis === lenis) lenis.start()
    })

    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onPointer = (e: PointerEvent) => {
      world.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      world.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onPress = (e: PointerEvent) => {
      if (world.reduced) return
      onPointer(e)
      world.click.x = (e.clientX / window.innerWidth) * 2 - 1
      world.click.y = -((e.clientY / window.innerHeight) * 2 - 1)
      world.click.age = 0
      world.kick = 1
    }
    // hard lock while the loader is up: CSS overflow alone still lets some inputs through
    const SCROLL_KEYS = new Set([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"])
    const block = (e: Event) => {
      if (!introGate.open) e.preventDefault()
    }
    const blockKeys = (e: KeyboardEvent) => {
      if (!introGate.open && SCROLL_KEYS.has(e.key)) e.preventDefault()
    }
    const holdTop = () => {
      if (!introGate.open && window.scrollY !== 0) window.scrollTo(0, 0)
    }
    window.addEventListener("wheel", block, { passive: false })
    window.addEventListener("touchmove", block, { passive: false })
    window.addEventListener("keydown", blockKeys)
    window.addEventListener("scroll", holdTop, { passive: true })
    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("pointerdown", onPress, { passive: true })

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
      window.removeEventListener("pointerdown", onPress)
      window.removeEventListener("wheel", block)
      window.removeEventListener("touchmove", block)
      window.removeEventListener("keydown", blockKeys)
      window.removeEventListener("scroll", holdTop)
      gsap.ticker.remove(tick)
      lenis.destroy()
      world.lenis = null
    }
  }, [])

  return null
}
