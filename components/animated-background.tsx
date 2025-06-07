"use client"

import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  darkMode: boolean
}

export function AnimatedBackground({ darkMode }: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${darkMode ? "bg-white/10" : "bg-gray-300/30"}`}
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Subtle gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/5 to-blue-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Subtle smoke effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div
          className={`w-[800px] h-[800px] ${darkMode ? "bg-gradient-conic from-blue-900/5 via-purple-900/5 to-pink-900/5" : "bg-gradient-conic from-blue-100/20 via-purple-100/20 to-pink-100/20"} rounded-full blur-3xl`}
        />
      </motion.div>
    </div>
  )
}
