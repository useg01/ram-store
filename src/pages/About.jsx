const steps = [
  {
    title: "Selección",
    text: "Evaluamos cada kit por estabilidad a XMP/EXPO, no solo por velocidad anunciada.",
  },
  {
    title: "Verificación",
    text: "Probamos cada lote con MemTest86 antes de sumarlo al inventario.",
  },
  {
    title: "Entrega",
    text: "Empaque antiestático y guía de instalación incluida en cada envío.",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-trace-400">
        Nosotros
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-mist-100 md:text-4xl">
        Vendemos memoria RAM como si fuéramos nosotros los que la instalamos.
      </h1>
      <p className="mt-5 text-mist-300">
        RacktraceRAM nació de la frustración de comprar un kit "compatible"
        que terminaba corriendo por debajo de su velocidad anunciada. Por eso
        cada ficha de producto en nuestro catálogo muestra exactamente lo que
        importa: capacidad, frecuencia, latencia CAS y voltaje, tal como
        aparece impreso en la etiqueta del módulo.
      </p>

      <div className="circuit-divider my-12" />

      <h2 className="font-display text-xl font-semibold text-mist-100">
        Nuestro proceso
      </h2>
      <ol className="mt-6 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-lg border border-graphite-700 bg-graphite-800 p-5"
          >
            <span className="font-mono text-xs text-trace-400">
              PASO {index + 1}
            </span>
            <p className="mt-2 font-display font-semibold text-mist-100">
              {step.title}
            </p>
            <p className="mt-2 text-sm text-mist-500">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="circuit-divider my-12" />

      <h2 className="font-display text-xl font-semibold text-mist-100">
        Proyecto académico
      </h2>
      <p className="mt-4 text-sm text-mist-500">
        Este sitio fue desarrollado como proyecto final del curso JavaScript
        Avanzado, aplicando React, React Router DOM, Tailwind CSS, JSON
        Server y consumo de servicios REST mediante Fetch API.
      </p>
    </div>
  );
}
