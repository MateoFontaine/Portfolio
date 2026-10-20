"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

/** Dot + trailing ring. It grows over anything interactive and is off on touch. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    document.documentElement.classList.add("has-cursor")

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" })
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" })
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" })
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" })

    const move = (e: PointerEvent) => {
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
      gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3, overwrite: "auto" })
    }
    const over = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement).closest("a, button, [data-cursor]")
      gsap.to(ring.current, { scale: hit ? 1.9 : 1, duration: 0.4, ease: "power3.out", overwrite: "auto" })
      gsap.to(dot.current, { scale: hit ? 0.4 : 1, duration: 0.3, overwrite: "auto" })
    }
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 })

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerover", over, { passive: true })
    document.addEventListener("pointerleave", leave)
    return () => {
      document.documentElement.classList.remove("has-cursor")
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerover", over)
      document.removeEventListener("pointerleave", leave)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference">
      <div ref={ring} className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-white opacity-0" />
      <div ref={dot} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-white opacity-0" />
    </div>
  )
}
