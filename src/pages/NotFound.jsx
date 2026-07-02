import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <p className="font-mono text-sm text-trace-400">ERROR · MODULE_NOT_FOUND</p>
      <h1 className="mt-4 font-display text-6xl font-bold text-mist-100">404</h1>
      <p className="mt-4 text-mist-500">
        Buscamos esta ranura en cada slot del sitio y no encontramos ningún
        módulo instalado en esta dirección.
      </p>
      <Link to="/" className="mt-8">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}
