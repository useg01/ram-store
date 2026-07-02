import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getProducts } from "../services/productService";

const TYPES = ["Todos", "DDR4", "DDR5"];

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("relevancia");

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch(() => {
        if (active)
          setError(
            "No se pudo conectar con el servidor de datos. Verifica que JSON Server esté activo en el puerto 3001."
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    let result = [...products];

    if (typeFilter !== "Todos") {
      result = result.filter((product) => product.type === typeFilter);
    }

    if (search.trim() !== "") {
      const query = search.trim().toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
      );
    }

    if (sortBy === "precio-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "precio-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "velocidad") result.sort((a, b) => b.speedMhz - a.speedMhz);

    return result;
  }, [products, typeFilter, search, sortBy]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-trace-400">
        Catálogo
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-mist-100">
        Memorias RAM disponibles
      </h1>
      <p className="mt-2 max-w-xl text-sm text-mist-500">
        Filtra por generación, busca por nombre o marca, y ordena según lo
        que más te importe: precio o velocidad.
      </p>

      {/* Controles de filtro */}
      <div className="mt-8 flex flex-col gap-4 rounded-lg border border-graphite-700 bg-graphite-800 p-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre o marca..."
          aria-label="Buscar productos"
          className="w-full rounded-md border border-graphite-600 bg-graphite-900 px-4 py-2 text-sm text-mist-100 placeholder:text-mist-500 focus:border-trace-500 md:max-w-xs"
        />

        <div className="flex flex-wrap items-center gap-2">
          {TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                typeFilter === type
                  ? "bg-trace-500 text-graphite-950"
                  : "border border-graphite-600 text-mist-300 hover:border-trace-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Ordenar productos"
          className="rounded-md border border-graphite-600 bg-graphite-900 px-3 py-2 font-mono text-xs text-mist-100 focus:border-trace-500"
        >
          <option value="relevancia">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="velocidad">Velocidad (MHz)</option>
        </select>
      </div>

      {/* Resultados */}
      <div className="mt-10">
        {loading && <Loader label="Cargando catálogo..." />}

        {!loading && error && <EmptyState title="Error de conexión" description={error} />}

        {!loading && !error && visibleProducts.length === 0 && (
          <EmptyState
            title="No encontramos módulos con esos filtros"
            description="Prueba con otro término de búsqueda o cambia el tipo seleccionado."
          />
        )}

        {!loading && !error && visibleProducts.length > 0 && (
          <>
            <p className="mb-4 font-mono text-xs text-mist-500">
              {visibleProducts.length} resultado(s)
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
