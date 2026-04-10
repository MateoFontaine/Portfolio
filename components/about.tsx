"use client"

const services = [
  {
    title: "Análisis de Requerimientos",
    description:
      "Entiendo la necesidad del cliente, estructuro el plan y defino alcances realistas antes de escribir código.",
  },
  {
    title: "Desarrollo End-to-End",
    description:
      "Construyo productos completos desde el diseño hasta la implementación técnica, sin perder de vista la experiencia del usuario.",
  },
  {
    title: "Trabajo con Clientes",
    description:
      "Me comunico de forma clara, escucho feedback y ajusto el rumbo cuando es necesario. El proyecto es de ambos.",
  },
  {
    title: "Gestión de Proyectos",
    description:
      "Coordino tareas, defino prioridades y entrego resultados en tiempo y forma. Sin excusas, con comunicación.",
  },
]

export function About() {
  return (
    <section
      id="sobre-mi"
      className="py-20 md:py-32 px-4 bg-[#0C1120]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-on-scroll">
            Sobre mí
          </h2>
          <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-3xl animate-on-scroll stagger-1">
            Soy co-fundador de{" "}
            <a
              href="https://devoys.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B82FF] hover:underline"
            >
              Devoys
            </a>
            , una empresa que desarrolla soluciones digitales. Más que escribir código, me dedico a entender problemas y transformarlos en productos que realmente funcionan.
          </p>
          <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-3xl mt-4 animate-on-scroll stagger-2">
            Estudié Ingeniería en Sistemas en UADE, pero la mayor parte de lo que sé lo aprendí construyendo proyectos reales. Lo que me diferencia es que no solo desarrollo — también analizo, planifico, y me ocupo de que el resultado final sea exactamente lo que el cliente necesita.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 animate-on-scroll">
            Cómo trabajo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-6 bg-[#1E293B] border border-[#334155] rounded-lg hover:border-[#3B82FF]/50 transition-colors duration-200 animate-on-scroll stagger-${index + 1}`}
              >
                <h4 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-[#A1A1AA] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-[#1E293B] border border-[#334155] rounded-lg animate-on-scroll stagger-5">
          <p className="text-[#A1A1AA] leading-relaxed">
            <span className="text-white font-medium">Stack técnico:</span>{" "}
            Next.js, React, TypeScript, TailwindCSS, Astro.build, Firebase,
            Git. Pero la herramienta es lo de menos — lo importante es saber
            cuándo y cómo usarla.
          </p>
        </div>
      </div>
    </section>
  )
}
