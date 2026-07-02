import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getFeaturedProducts } from "../services/productService";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getFeaturedProducts()
      .then((data) => {
        if (active) setFeatured(data);
      })
      .catch(() => {
        if (active) setError("No se pudieron cargar los productos destacados.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-graphite-700">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-graphite-700)_1px,transparent_1px),linear-gradient(90deg,var(--color-graphite-700)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-trace-400">
            DDR4 · DDR5 · Kits duales y cuádruples
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-mist-100 md:text-6xl">
            La memoria correcta,
            <span className="text-trace-400"> a la frecuencia correcta.</span>
          </h1>
          <p className="mt-5 max-w-xl text-mist-300">
            Comparamos capacidad, velocidad y latencia por vos: encontrá el
            módulo exacto para tu placa madre, sin adivinar specs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/catalogo">
              <Button>Ver catálogo</Button>
            </Link>
            <Link to="/nosotros">
              <Button variant="outline">Cómo elegimos nuestros kits</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mist-500">
              Selección del inventario
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-mist-100">
              Módulos destacados
            </h2>
          </div>
          <Link to="/catalogo" className="hidden font-mono text-sm text-trace-400 hover:underline md:block">
            Ver todos →
          </Link>
        </div>

        <div className="mt-8">
          {loading && <Loader label="Consultando inventario..." />}
          {!loading && error && (
            <EmptyState title="Ups, algo falló" description={error} />
          )}
          {!loading && !error && featured.length === 0 && (
            <EmptyState
              title="Sin destacados por ahora"
              description="Vuelve pronto o revisa el catálogo completo."
            />
          )}
          {!loading && !error && featured.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Franja de confianza */}
      <section className="border-t border-graphite-700 bg-graphite-900">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-3">
          {[
            { label: "Garantía", value: "24 meses" },
            { label: "Módulos probados", value: "100% QA" },
            { label: "Envío a todo el país", value: "48-72h" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-display text-2xl font-bold text-trace-400">
                {item.value}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-mist-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
