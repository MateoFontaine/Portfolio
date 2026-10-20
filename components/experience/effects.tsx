"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing"
import type { ChromaticAberrationEffect } from "postprocessing"
import { Vector2 } from "three"
import { world } from "@/lib/world"

export function Effects({ lowPower }: { lowPower: boolean }) {
  const aberration = useRef<ChromaticAberrationEffect>(null)

  useFrame(() => {
    const a = aberration.current
    if (!a) return
    const v = Math.min(Math.abs(world.vel), 3)
    a.offset.set(0.0004 + v * 0.0011, 0.0002 + v * 0.0007)
  })

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom mipmapBlur intensity={lowPower ? 0.7 : 0.95} luminanceThreshold={0.42} luminanceSmoothing={0.3} radius={0.72} />
      <ChromaticAberration ref={aberration} offset={new Vector2(0.0004, 0.0002)} radialModulation modulationOffset={0.25} />
    </EffectComposer>
  )
}
