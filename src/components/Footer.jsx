import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-graphite-700 bg-graphite-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-mist-100">
            Racktrace<span className="text-trace-400">RAM</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-mist-500">
            Memorias RAM DDR4 y DDR5 seleccionadas para gaming, creación de
            contenido y estaciones de trabajo.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-mist-500">
            Navegación
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="text-mist-300 hover:text-trace-400">Inicio</Link></li>
            <li><Link to="/nosotros" className="text-mist-300 hover:text-trace-400">Nosotros</Link></li>
            <li><Link to="/catalogo" className="text-mist-300 hover:text-trace-400">Catálogo</Link></li>
            <li><Link to="/contacto" className="text-mist-300 hover:text-trace-400">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-mist-500">
            Contacto
          </p>
          <ul className="mt-3 space-y-2 text-sm text-mist-300">
            <li>ventas@racktraceram.com</li>
            <li>+51 999 123 456</li>
            <li>Lima, Perú</li>
          </ul>
        </div>
      </div>

      <div className="circuit-divider mx-6" />

      <p className="px-6 py-5 text-center font-mono text-xs text-mist-500">
        © {year} RacktraceRAM — Proyecto académico AP3 · JavaScript Avanzado
      </p>
    </footer>
  );
}
