"use client"

import { useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Color, ShaderMaterial, Vector2, Vector3 } from "three"
import { world } from "@/lib/world"
import { backdropFrag, backdropVert } from "./shaders"
import { pal } from "./state"

export function Backdrop({ lowPower }: { lowPower: boolean }) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: backdropVert,
        fragmentShader: backdropFrag,
        defines: { OCT: lowPower ? 3 : 4 },
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uVel: { value: 0 },
          uMouse: { value: new Vector2() },
          uRes: { value: new Vector2(1, 1) },
          uBase: { value: new Color("#0C1120") },
          uC1: { value: new Vector3() },
          uC2: { value: new Vector3() },
          uC3: { value: new Vector3() },
        },
        depthTest: false,
        depthWrite: false,
      }),
    [lowPower],
  )

  useFrame(({ size }, dt) => {
    const u = material.uniforms
    u.uTime.value += Math.min(dt, 0.05) * (world.reduced ? 0.2 : 1)
    u.uScroll.value = world.chapterPos
    u.uVel.value = world.vel
    u.uMouse.value.set(world.mouse.sx, world.mouse.sy)
    u.uRes.value.set(size.width, size.height)
    u.uC1.value.set(pal[0].r, pal[0].g, pal[0].b)
    u.uC2.value.set(pal[1].r, pal[1].g, pal[1].b)
    u.uC3.value.set(pal[2].r, pal[2].g, pal[2].b)
  })

  return (
    <mesh frustumCulled={false} renderOrder={-100}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}
