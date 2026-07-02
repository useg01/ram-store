import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `font-mono text-sm tracking-wide transition-colors ${
      isActive ? "text-trace-400" : "text-mist-300 hover:text-mist-100"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-graphite-700 bg-graphite-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-trace-500 font-display text-sm font-bold text-graphite-950">
            R
          </span>
          <span className="font-display text-lg font-semibold text-mist-100">
            Racktrace<span className="text-trace-400">RAM</span>
          </span>
        </NavLink>

        {/* Navegación escritorio */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClasses} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botón menú móvil */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-graphite-600 text-mist-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menú de navegación"
          aria-expanded={open}
        >
          <span className="font-mono text-lg">{open ? "×" : "≡"}</span>
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-graphite-700 bg-graphite-900 px-6 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={linkClasses}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
              >
                <span className="block py-2">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
