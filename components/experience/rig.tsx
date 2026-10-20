"use client"

import { useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { PerspectiveCamera, Vector3 } from "three"
import { chapterAt, clamp, damp, world } from "@/lib/world"
import { CHAPTER_N, curve } from "@/lib/path"
import { updatePalette } from "./state"

/** Drives the camera along the chapter path from scroll + pointer. */
export function Rig() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera
  const narrow = useThree((s) => s.size.width < 768)
  const v = useMemo(() => ({ pos: new Vector3(), ahead: new Vector3(), back: new Vector3(), look: new Vector3() }), [])

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const scroll = world.lenis?.scroll ?? window.scrollY

    const rawV = (scroll - world.lastScroll) / Math.max(dt, 1e-3) / window.innerHeight
    world.lastScroll = scroll
    world.vel = world.reduced ? 0 : damp(world.vel, clamp(rawV, -8, 8), 5, dt)
    world.chapterPos = damp(world.chapterPos, chapterAt(scroll), 10, dt)

    const m = world.mouse
    m.sx = damp(m.sx, m.x, 3.5, dt)
    m.sy = damp(m.sy, m.y, 3.5, dt)

    updatePalette(world.chapterPos)

    const t = clamp(world.chapterPos / (CHAPTER_N - 1), 0, 1)
    curve.getPoint(t, v.pos)
    curve.getPoint(Math.min(t + 0.004, 1), v.ahead)
    curve.getPoint(Math.max(t - 0.004, 0), v.back)
    v.ahead.sub(v.back).normalize()

    const intro = 1 - world.intro
    camera.position.copy(v.pos)
    camera.position.x += m.sx * 0.5
    camera.position.y += m.sy * 0.3
    camera.position.z += intro * intro * 14

    v.look.copy(v.pos).addScaledVector(v.ahead, 12)
    v.look.x += m.sx * 1.2
    v.look.y += m.sy * 0.8
    camera.lookAt(v.look)
    camera.rotateZ(-m.sx * 0.02 - world.vel * 0.004)

    const baseFov = narrow ? 64 : 50
    camera.fov = damp(camera.fov, baseFov + clamp(Math.abs(world.vel) * 5, 0, 14), 6, dt)
    camera.updateProjectionMatrix()
  })

  return null
}
