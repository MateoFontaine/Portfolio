"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show cursor on desktop (screen width > 768px)
    const isDesktop = window.innerWidth > 768
    if (!isDesktop) return

    setIsVisible(true)

    let animationFrameId: number

    const updatePosition = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth updates
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
        // Trail follows with delay (will be updated in separate effect)
        setTrailPosition((prev) => ({
          x: prev.x + (e.clientX - prev.x) * 0.15,
          y: prev.y + (e.clientY - prev.y) * 0.15,
        }))
      })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Hide cursor on mobile
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="cursor-dot"
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      {/* Trail cursor outline */}
      <div
        className="cursor-outline"
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
        }}
      />
    </>
  )
}