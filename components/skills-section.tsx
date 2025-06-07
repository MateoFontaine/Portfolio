"use client"

import { motion } from "framer-motion"
import { skillsData } from "@/data/skills-data"

interface SkillsSectionProps {
  darkMode: boolean
}

export function SkillsSection({ darkMode }: SkillsSectionProps) {
  return (
    <section className={`py-20 px-4 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Habilidades
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                rotateY: 15,
                transition: { duration: 0.3 },
              }}
              className={`group relative p-8 rounded-2xl ${
                darkMode ? "bg-gray-800/50" : "bg-gray-50/50"
              } backdrop-blur-sm border ${
                darkMode ? "border-gray-700/50" : "border-gray-200/50"
              } hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Efecto de brillo al hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                whileHover={{
                  translateX: "100%",
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              />

              {/* Contenido de la tarjeta */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <motion.div
                  className="mb-4"
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {skill.icon}
                </motion.div>

                <motion.h3
                  className={`text-sm font-medium text-center ${
                    darkMode ? "text-gray-300 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                  } transition-colors duration-300`}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill.name}
                </motion.h3>
              </div>

              {/* Borde animado */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                whileHover={{
                  borderColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
