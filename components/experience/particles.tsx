"use client"

import { useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial } from "three"
import { curve } from "@/lib/path"
import { clamp, world } from "@/lib/world"
import { pal } from "./state"

function scatter(count: number, rMin: number, rMax: number) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const c = curve.getPoint(Math.random())
    const r = rMin + Math.pow(Math.random(), 0.65) * (rMax - rMin)
    const a = Math.random() * Math.PI * 2
    out[i * 3] = c.x + Math.cos(a) * r
    out[i * 3 + 1] = c.y + Math.sin(a) * r * 0.7
    out[i * 3 + 2] = c.z + (Math.random() - 0.5) * 6
  }
  return out
}

const dustVert = /* glsl */ `
attribute float aSeed;
uniform float uTime, uPx, uVel;
varying float vA;
void main(){
  vec3 p = position;
  p.y += sin(uTime*.2+aSeed*30.)*.25;
  p.x += cos(uTime*.17+aSeed*20.)*.25;
  vec4 mv = modelViewMatrix*vec4(p,1.);
  gl_Position = projectionMatrix*mv;
  float size = (.6+aSeed*1.4)*uPx*(1.+abs(uVel)*.5)*(14./max(-mv.z,.1));
  gl_PointSize = clamp(size,1.,14.);
  vA = smoothstep(90.,8.,-mv.z)*(.35+.65*fract(aSeed*7.+uTime*.15));
}
`
const dustFrag = /* glsl */ `
precision highp float;
uniform vec3 uCol;
varying float vA;
void main(){
  float d = length(gl_PointCoord-.5);
  gl_FragColor = vec4(uCol*1.6, smoothstep(.5,0.,d)*vA);
}
`
const streakVert = /* glsl */ `
attribute float aEnd;
uniform float uLen;
varying float vA;
void main(){
  vec3 p = position;
  p.z -= aEnd*uLen;
  vec4 mv = modelViewMatrix*vec4(p,1.);
  gl_Position = projectionMatrix*mv;
  vA = (1.-aEnd)*smoothstep(70.,6.,-mv.z)*min(abs(uLen)*.35,1.);
}
`
const streakFrag = /* glsl */ `
precision highp float;
uniform vec3 uCol;
varying float vA;
void main(){ gl_FragColor = vec4(uCol*2., vA); }
`

export function Particles({ lowPower }: { lowPower: boolean }) {
  const dustCount = lowPower ? 1400 : 3200
  const streakCount = lowPower ? 220 : 520

  const dust = useMemo(() => {
    const geo = new BufferGeometry()
    geo.setAttribute("position", new BufferAttribute(scatter(dustCount, 2.4, 16), 3))
    geo.setAttribute("aSeed", new BufferAttribute(Float32Array.from({ length: dustCount }, Math.random), 1))
    const mat = new ShaderMaterial({
      vertexShader: dustVert,
      fragmentShader: dustFrag,
      uniforms: { uTime: { value: 0 }, uPx: { value: 1 }, uVel: { value: 0 }, uCol: { value: new Color() } },
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    return { geo, mat }
  }, [dustCount])

  const streaks = useMemo(() => {
    const base = scatter(streakCount, 3, 11)
    const pos = new Float32Array(streakCount * 6)
    const end = new Float32Array(streakCount * 2)
    for (let i = 0; i < streakCount; i++) {
      pos.set(base.subarray(i * 3, i * 3 + 3), i * 6)
      pos.set(base.subarray(i * 3, i * 3 + 3), i * 6 + 3)
      end[i * 2 + 1] = 1
    }
    const geo = new BufferGeometry()
    geo.setAttribute("position", new BufferAttribute(pos, 3))
    geo.setAttribute("aEnd", new BufferAttribute(end, 1))
    const mat = new ShaderMaterial({
      vertexShader: streakVert,
      fragmentShader: streakFrag,
      uniforms: { uLen: { value: 0 }, uCol: { value: new Color() } },
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    return { geo, mat }
  }, [streakCount])

  useFrame(({ gl }, dt) => {
    const du = dust.mat.uniforms
    du.uTime.value += Math.min(dt, 0.05)
    du.uVel.value = world.vel
    du.uPx.value = gl.getPixelRatio()
    du.uCol.value.copy(pal[2])
    const su = streaks.mat.uniforms
    su.uLen.value = clamp(world.vel * 5, -14, 14)
    su.uCol.value.copy(pal[2])
  })

  return (
    <>
      <points geometry={dust.geo} material={dust.mat} frustumCulled={false} />
      <lineSegments geometry={streaks.geo} material={streaks.mat} frustumCulled={false} />
    </>
  )
}
