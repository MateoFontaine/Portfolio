"use client"

import { useLayoutEffect, useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import { Color, Group, ShaderMaterial, SRGBColorSpace, Texture } from "three"
import { caseStudies } from "@/data/case-studies"
import { KEYS, PROJECT_START } from "@/lib/path"
import { damp, world } from "@/lib/world"
import { planeFrag, planeVert } from "./shaders"
import { pal } from "./state"

/** 0 → 1 → 0 triangle wave */
const pingPong = (x: number) => {
  const p = x % 2
  return p < 1 ? p : 2 - p
}
const smooth = (x: number) => x * x * (3 - 2 * x)

function ProjectPlane({ index, image }: { index: number; image: string }) {
  const narrow = useThree((s) => s.size.width < 768)
  const tex = useTexture(image) as Texture
  const group = useRef<Group>(null)
  const play = useRef(0)
  const chapter = PROJECT_START + index
  const key = KEYS[chapter]
  const side = index % 2 === 0 ? 1 : -1

  const w = narrow ? 3.3 : 5.0
  const h = w * 0.5
  const x = narrow ? key.x : key.x + side * 3.4
  const y = narrow ? key.y + 1.5 : key.y + 0.1
  const baseRot = narrow ? 0 : -side * 0.24

  useLayoutEffect(() => {
    tex.colorSpace = SRGBColorSpace
    tex.anisotropy = 8
    tex.needsUpdate = true
  }, [tex])

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: planeVert,
        fragmentShader: planeFrag,
        transparent: true,
        uniforms: {
          uTex: { value: tex },
          uTexAspect: { value: (tex.image as HTMLImageElement).width / (tex.image as HTMLImageElement).height },
          uPlaneAspect: { value: 2 },
          uTime: { value: 0 },
          uVel: { value: 0 },
          uActive: { value: 0 },
          uHover: { value: 0 },
          uScroll: { value: 0 },
          uC: { value: new Color() },
        },
      }),
    [tex],
  )

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const u = material.uniforms
    u.uTime.value += dt
    u.uVel.value = world.vel
    u.uPlaneAspect.value = w / h
    u.uActive.value = damp(u.uActive.value, 1 - Math.min(Math.abs(world.chapterPos - chapter), 1), 6, dt)
    u.uHover.value = damp(u.uHover.value, world.hover === index ? 1 : 0, 8, dt)

    // hovering (or, on touch, being the active chapter) scrolls the captured site
    const playing = world.hover === index || (narrow && u.uActive.value > 0.8)
    if (playing) play.current += dt
    else if (u.uScroll.value < 0.01) play.current = 0
    u.uScroll.value = damp(u.uScroll.value, playing ? smooth(pingPong(play.current * 0.09)) : 0, playing ? 3 : 2.5, dt)
    u.uC.value.copy(pal[2])

    const g = group.current
    if (!g) return
    g.visible = Math.abs(world.chapterPos - chapter) < 1.6
    g.rotation.y = damp(g.rotation.y, baseRot + world.mouse.sx * 0.1, 4, dt)
    g.rotation.x = damp(g.rotation.x, -world.mouse.sy * 0.07, 4, dt)
    g.position.y = y + Math.sin(u.uTime.value * 0.6 + index) * 0.08
  })

  return (
    <group ref={group} position={[x, y, key.z - 8]}>
      <mesh>
        <planeGeometry args={[w, h, 32, 16]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}

export function Gallery() {
  return (
    <>
      {caseStudies.map((project, i) => (
        <ProjectPlane key={project.id} index={i} image={project.preview ?? project.image} />
      ))}
    </>
  )
}
