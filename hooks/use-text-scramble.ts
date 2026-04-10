"use client"

import { useEffect, useState } from "react"

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

interface UseTextScrambleProps {
  text: string
  duration?: number
}

export function useTextScramble({ text, duration = 2000 }: UseTextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(true)

  useEffect(() => {
    const chars = SCRAMBLE_CHARS
    let frame = 0
    const totalFrames = 30

    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames

      const scrambled = text.split("").map((char, i) => {
        if (char === " ") return " "
        if (i / text.length > progress) {
          return chars[Math.floor(Math.random() * chars.length)]
        }
        return char
      }).join("")

      setDisplayText(scrambled)

      if (frame >= totalFrames) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, duration / totalFrames)

    return () => clearInterval(interval)
  }, [text, duration])

  return { displayText, isScrambling }
}