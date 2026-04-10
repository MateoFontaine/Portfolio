export interface CaseStudy {
  id: number
  title: string
  tagline: string
  problem: string
  approach: string
  result: string
  technologies: string[]
  github?: string
  demo?: string
  image: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Marmolería Dodera",
    tagline: "Catálogo digital para negocio de mármol y piedra",
    problem:
      "Un negocio familiar de marmolería necesitaba mostrar sus productos y proyectos de manera profesional. Los clientes potenciales no tenían forma clara de ver el trabajo realizado ni contactar directamente.",
    approach:
      "Desarrollé un sitio web moderno con Next.js y TailwindCSS que presenta un catálogo visual de proyectos y materiales. Implementé una estructura clara que permite navegar entre diferentes categorías de productos y ver trabajos anteriores.",
    result:
      "Sitio funcional que permite a la marmolería mostrar su trabajo de forma profesional y atraer nuevos clientes. Carga rápida y diseño responsivo para acceso desde cualquier dispositivo.",
    technologies: ["Next.js", "TailwindCSS", "TypeScript"],
    github: "https://github.com/MateoFontaine/MarmoleriaDodera",
    demo: "https://marmoleriadodera.com/",
    image: "/dodera.jpeg",
  },
  {
    id: 2,
    title: "Experiencias Allona",
    tagline: "Plataforma web para hostería boutique en Pinamar",
    problem:
      "Una hostería en Pinamar buscaba mejorar su visibilidad online para alquiler de espacios para eventos recreativos y artísticos. Necesitaban un canal directo para reservas que evitara intermediarios.",
    approach:
      "Creé un sitio web que destaca la experiencia única de la hostería, mostrando instalaciones y actividades disponibles. Implementé un enlace directo a WhatsApp para facilitar reservas inmediatas y comunicación personalizada.",
    result:
      "Canal de reservas eficiente vía WhatsApp que conecta directamente a interesados con el equipo de la hostería. Diseño atractivo que transmite la esencia del lugar.",
    technologies: ["Next.js", "TailwindCSS", "TypeScript"],
    github: "https://github.com/MateoFontaine/ExperienciasAllona",
    demo: "https://experienciasallona.netlify.app/",
    image: "/ExperienciasAllona.jpeg",
  },
  {
    id: 3,
    title: "IamPaw",
    tagline: "Sistema de identificación para mascotas con códigos QR",
    problem:
      "Los dueños de mascotas no tenían una forma fácil de compartir información médica importante ni facilitar que sus animales encuentren su hogar si se pierden.",
    approach:
      "Desarrollé un sistema innovador de chapitas con códigos QR que, al escanearlos, muestran un perfil digital completo de la mascota: datos de contacto, información médica, y más. El proyecto incluye Astro.build para una experiencia rápida.",
    result:
      "Sistema funcional que busca darle 'voz' a las mascotas. Permite que cualquier persona que encuentre una mascota pueda contactar rápidamente a su dueño o acceder a información vital.",
    technologies: ["Astro.build", "TailwindCSS", "QR Codes", "TypeScript"],
    github: "https://github.com/MateoFontaine/Iam",
    demo: "https://iampaw.com.ar/",
    image: "/Logo.jpg",
  },
]
