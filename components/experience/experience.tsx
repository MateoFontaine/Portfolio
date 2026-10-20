"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerformanceMonitor } from "@react-three/drei"
import { clamp, sceneReady, world } from "@/lib/world"
import { KEYS } from "@/lib/path"
import { Backdrop } from "./backdrop"
import { Core } from "./core"
import { Effects } from "./effects"
import { Gallery } from "./gallery"
import { Orbit } from "./orbit"
import { Particles } from "./particles"
import { Portal } from "./portal"
import { Rig } from "./rig"
import { Tunnel } from "./tunnel"

/** Fires `sceneReady` once the suspended assets resolved and a frame was drawn. */
function Ready() {
  useFrame(() => sceneReady.fire())
  return null
}

function HeroCore({ narrow }: { narrow: boolean }) {
  const k = KEYS[0]
  return (
    <Core
      chapter={0}
      position={narrow ? [k.x, k.y + 1.9, 0] : [k.x + 2.7, k.y + 0.1, 0]}
      scale={narrow ? 0.62 : 1}
    />
  )
}

export default function Experience() {
  const [narrow, setNarrow] = useState(false)
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    const update = () => setNarrow(window.innerWidth < 768)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const lowPower = narrow || dpr < 1.2
  const maxDpr = useMemo(() => clamp(window.devicePixelRatio || 1, 1, narrow ? 1.5 : 1.75), [narrow])

  return (
    <Canvas
      flat
      dpr={Math.min(dpr, maxDpr)}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      camera={{ fov: 50, near: 0.1, far: 300, position: [0, 0, 22] }}
    >
      <PerformanceMonitor onDecline={() => setDpr((d) => Math.max(1, d - 0.25))} />
      <Rig />
      <Backdrop lowPower={lowPower} />
      <Suspense fallback={null}>
        <HeroCore narrow={narrow} />
        <Tunnel />
        <Orbit />
        <Gallery />
        <Portal />
        <Particles lowPower={lowPower} />
        <Ready />
      </Suspense>
      <Effects lowPower={lowPower} />
    </Canvas>
  )
}
