"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Group, MeshBasicMaterial, Quaternion, Vector3 } from "three"
import { curve, tOf } from "@/lib/path"
import { world } from "@/lib/world"
import { pal } from "./state"

const COUNT = 30

/** Arcs strung along the camera path between the hero and the stack chapter. */
export function Tunnel() {
  const group = useRef<Group>(null)
  const material = useMemo(
    () => new MeshBasicMaterial({ transparent: true, opacity: 0.38, toneMapped: false }),
    [],
  )
  const rings = useMemo(() => {
    const z = new Vector3(0, 0, 1)
    const start = tOf(0.8)
    const end = tOf(3.4)
    return Array.from({ length: COUNT }, (_, i) => {
      const t = start + ((end - start) * i) / (COUNT - 1)
      const pos = curve.getPoint(t)
      const tangent = curve.getTangent(t)
      const quat = new Quaternion().setFromUnitVectors(z, tangent)
      return {
        pos,
        quat,
        radius: 5.2 + ((i * 37) % 11) * 0.28,
        arc: Math.PI * (1.1 + ((i * 53) % 9) / 10),
        spin: (i % 2 ? 1 : -1) * (0.05 + ((i * 17) % 7) * 0.012),
        phase: i * 0.7,
      }
    })
  }, [])

  useFrame((_, dt) => {
    material.color.copy(pal[2])
    const g = group.current
    if (!g) return
    g.children.forEach((child, i) => {
      child.children[0].rotation.z += rings[i].spin * Math.min(dt, 0.05) * (1 + Math.abs(world.vel) * 3)
    })
  })

  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <group key={i} position={r.pos} quaternion={r.quat}>
          <mesh rotation={[0, 0, r.phase]} scale={r.radius}>
            <torusGeometry args={[1, 0.0028, 6, 200, r.arc]} />
            <primitive object={material} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  )
}
