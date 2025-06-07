"use client"

import { motion } from "framer-motion"

interface AboutSectionProps {
  darkMode: boolean
}

export function AboutSection({ darkMode }: AboutSectionProps) {
  return (
    <section id="about" className={`py-20 px-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Sobre mí
          </h2>
          <div className={`text-lg leading-relaxed space-y-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            <p>
              Soy Mateo Fontaine, estudiante de Ingeniería en Sistemas en UADE y un apasionado por la tecnología y el desarrollo de soluciones reales.
              Me motiva trabajar en proyectos que tengan impacto, desde el análisis de requerimientos hasta su implementación técnica. Disfruto entender a fondo una necesidad, estructurar un plan y llevarlo a la acción de manera ordenada y efectiva. <br /> <br />

              Más allá del código, me entusiasma todo el proceso: pensar la lógica detrás de una solución, definir etapas, coordinar tareas y ver cómo una idea se convierte en un producto funcional. Me gusta construir desde cero, combinando análisis, estrategia y tecnología.<br /> <br />

              Tengo experiencia trabajando en equipo, gestionando ideas y tomando decisiones técnicas alineadas con objetivos reales. Me considero autodidacta, curioso y con una fuerte iniciativa. Siempre estoy explorando herramientas que me permitan optimizar procesos y entregar mejores resultados.<br /> <br />

              Actualmente estoy enfocado en el desarrollo frontend con herramientas como React, Firebase, TailwindCSS y Git, pero mi interés va mucho más allá del código: me apasiona crear proyectos con propósito y estructura. <br /><br />
              🧠 Creo en el poder de la tecnología para potenciar nuestras capacidades. Por eso integro herramientas de inteligencia artificial en mi flujo de trabajo, lo que me permite resolver problemas más rápido, optimizar procesos y enfocarme en lo que realmente aporta valor a cada proyecto.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
