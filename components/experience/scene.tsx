"use client"

import dynamic from "next/dynamic"

const Experience = dynamic(() => import("./experience"), { ssr: false })

/** Fixed full-screen WebGL layer rendered behind the page content. */
export function Scene() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-ink">
      <Experience />
    </div>
  )
}
