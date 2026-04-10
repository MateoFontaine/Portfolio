"use client"

import { useRef, useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const isMobile = useIsMobile()

  // Disable magnetic effect on mobile (touch devices)
  if (isMobile) {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    )
  }

  useEffect(() => {
    const button = ref.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) +
        Math.pow(e.clientY - centerY, 2)
      )

      const actionRadius = 100

      if (distance < actionRadius) {
        const magnetStrength = (actionRadius - distance) / actionRadius * 10
        const angleX = ((e.clientX - centerX) / rect.width) * magnetStrength
        const angleY = ((e.clientY - centerY) / rect.height) * magnetStrength
        setPosition({ x: angleX, y: angleY })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <button
      ref={ref}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      {...props}
    >
      {children}
    </button>
  )
}