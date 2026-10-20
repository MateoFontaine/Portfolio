"use client"

import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { AdditiveBlending, Color, Group, MeshBasicMaterial, ShaderMaterial } from "three"
import { CONTACT_INDEX, KEYS } from "@/lib/path"
import { clamp, damp, world } from "@/lib/world"
import { portalFrag } from "./shaders"
import { pal } from "./state"

const vert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }
`

/** Swirling gate at the end of the path, behind the contact section. */
export function Portal() {
  const narrow = useThree((s) => s.size.width < 768)
  const group = useRef<Group>(null)
  const key = KEYS[CONTACT_INDEX]
  const ringMat = useMemo(() => new MeshBasicMaterial({ toneMapped: false }), [])
  const disc = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vert,
        fragmentShader: portalFrag,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPower: { value: 0 },
          uC1: { value: new Color() },
          uC2: { value: new Color() },
        },
      }),
    [],
  )

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const near = clamp(1 - (CONTACT_INDEX - world.chapterPos) / 1.2, 0, 1)
    const u = disc.uniforms
    u.uTime.value += dt
    u.uPower.value = damp(u.uPower.value, near, 3, dt)
    u.uC1.value.copy(pal[0])
    u.uC2.value.copy(pal[1])
    ringMat.color.copy(pal[2])
    const g = group.current
    if (g) {
      g.visible = near > 0.01
      g.rotation.z += dt * 0.15
      g.rotation.y = damp(g.rotation.y, world.mouse.sx * 0.25, 3, dt)
      g.rotation.x = damp(g.rotation.x, -world.mouse.sy * 0.2, 3, dt)
    }
  })

  return (
    <group ref={group} position={[narrow ? key.x : key.x + 3, narrow ? key.y + 1.6 : key.y, key.z - 13]} scale={narrow ? 0.62 : 1}>
      <mesh>
        <circleGeometry args={[3.6, 96]} />
        <primitive object={disc} attach="material" />
      </mesh>
      <mesh>
        <torusGeometry args={[3.6, 0.045, 12, 220]} />
        <primitive object={ringMat} attach="material" />
      </mesh>
      <mesh scale={1.18}>
        <torusGeometry args={[3.6, 0.008, 8, 220, Math.PI * 1.6]} />
        <primitive object={ringMat} attach="material" />
      </mesh>
      <mesh scale={1.36} rotation={[0, 0, 2]}>
        <torusGeometry args={[3.6, 0.006, 8, 220, Math.PI * 1.2]} />
        <primitive object={ringMat} attach="material" />
      </mesh>
    </group>
  )
}
