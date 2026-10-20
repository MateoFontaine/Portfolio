import { TOOLS } from "@/data/stack"

const chip = "rounded-full border px-4 py-2 font-mono text-xs backdrop-blur-md"

export function Stack() {
  return (
    <section
      id="stack"
      data-chapter
      data-label="Stack"
      className="relative flex min-h-svh flex-col justify-end px-6 pb-20 pt-28 md:justify-center md:px-12 md:pb-0"
    >
      <p className="mono-label mb-4">[03] Stack técnico</p>
      <h2 className="max-w-xl font-display text-[clamp(2.2rem,5.2vw,4.8rem)] font-bold leading-[0.98] tracking-[-0.035em]">
        La herramienta es lo de menos.
      </h2>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
        Lo importante es saber cuándo y cómo usarla. La IA es parte de mi flujo: acelera la ejecución, el criterio sigue
        siendo mío.
      </p>

      <div className="mt-8 flex max-w-md flex-col gap-5">
        {[
          { label: "Desarrollo", items: TOOLS.filter((t) => !t.ai), style: "border-white/15 bg-ink/50" },
          { label: "IA", items: TOOLS.filter((t) => t.ai), style: "border-[#8fb8ff]/40 bg-[#8fb8ff]/10 text-[#8fb8ff]" },
        ].map((group) => (
          <div key={group.label}>
            <p className="mono-label mb-2">{group.label}</p>
            <ul className="flex flex-wrap gap-2" aria-label={group.label}>
              {group.items.map((t) => (
                <li key={t.name} className={`${chip} ${group.style}`}>
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
