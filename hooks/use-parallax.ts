"use client"

import { useEffect, useState } from "react"

interface UseParallaxProps {
  speed?: number
}

export function useParallax({ speed = 0.5 }: UseParallaxProps = {}) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return offset
}