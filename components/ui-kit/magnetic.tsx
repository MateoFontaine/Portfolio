"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"
import { goTo } from "@/lib/world"

interface MagneticProps {
  children: React.ReactNode
  href?: string
  /** id of a section to scroll to */
  to?: string
  variant?: "solid" | "ghost"
  className?: string
  external?: boolean
}

/** Pill button that leans towards the pointer. */
export function Magnetic({ children, href, to, variant = "solid", className = "", external }: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" })
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - (r.left + r.width / 2)) * 0.28)
      y((e.clientY - (r.top + r.height / 2)) * 0.4)
    }
    const leave = () => {
      x(0)
      y(0)
    }
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    return () => {
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    }
  }, [])

  const base =
    "group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-medium transition-colors duration-300"
  const look =
    variant === "solid"
      ? "bg-brand text-white hover:bg-white hover:text-ink"
      : "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink"

  return (
    <a
      ref={ref}
      href={href ?? `#${to}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={
        to
          ? (e) => {
              e.preventDefault()
              goTo(to)
            }
          : undefined
      }
      className={`${base} ${look} ${className}`}
    >
      {children}
      {external && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </a>
  )
}
