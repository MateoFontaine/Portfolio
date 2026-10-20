"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Group, MeshBasicMaterial, ShaderMaterial, Vector3 } from "three"
import { damp, world } from "@/lib/world"
import { coreFrag, coreVert } from "./shaders"
import { pal } from "./state"

interface CoreProps {
  position: [number, number, number]
  scale?: number
  amp?: number
  freq?: number
  /** index of the chapter this object belongs to; it swells while active */
  chapter: number
  rings?: boolean
}

/** Liquid iridescent sphere that reacts to scroll velocity and the pointer. */
export function Core({ position, scale = 1, amp = 0.26, freq = 0.85, chapter, rings = true }: CoreProps) {
  const group = useRef<Group>(null)
  const ringMat = useMemo(() => new MeshBasicMaterial({ transparent: true, opacity: 0.55, toneMapped: false }), [])
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: coreVert,
        fragmentShader: coreFrag,
        uniforms: {
          uTime: { value: Math.random() * 10 },
          uAmp: { value: amp },
          uFreq: { value: freq },
          uGlow: { value: 0.6 },
          uC1: { value: new Vector3() },
          uC2: { value: new Vector3() },
          uC3: { value: new Vector3() },
        },
      }),
    [amp, freq],
  )

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const u = material.uniforms
    u.uTime.value += dt * (world.reduced ? 0.15 : 1)
    const energy = Math.min(Math.abs(world.vel) * 0.18, 0.5)
    u.uAmp.value = damp(u.uAmp.value, amp + energy, 5, dt)
    u.uC1.value.set(pal[0].r, pal[0].g, pal[0].b)
    u.uC2.value.set(pal[1].r, pal[1].g, pal[1].b)
    u.uC3.value.set(pal[2].r, pal[2].g, pal[2].b)
    ringMat.color.copy(pal[2])

    const g = group.current
    if (!g) return
    const near = 1 - Math.min(Math.abs(world.chapterPos - chapter), 1)
    const s = scale * (0.9 + near * 0.12)
    g.scale.setScalar(damp(g.scale.x, s, 4, dt))
    g.rotation.y += dt * 0.12 + world.vel * dt * 0.4
    g.rotation.x = damp(g.rotation.x, -world.mouse.sy * 0.35, 3, dt)
    g.rotation.z = damp(g.rotation.z, world.mouse.sx * 0.25, 3, dt)
  })

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[1.6, 160, 160]} />
        <primitive object={material} attach="material" />
      </mesh>
      {rings && (
        <>
          <mesh rotation={[1.2, 0.2, 0]}>
            <torusGeometry args={[2.5, 0.006, 8, 220]} />
            <primitive object={ringMat} attach="material" />
          </mesh>
          <mesh rotation={[0.4, 0.9, 0.3]}>
            <torusGeometry args={[2.9, 0.004, 8, 220, Math.PI * 1.4]} />
            <primitive object={ringMat} attach="material" />
          </mesh>
        </>
      )}
    </group>
  )
}
