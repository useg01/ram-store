import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getProductById } from "../services/productService";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        if (active) setProduct(data);
      })
      .catch(() => {
        if (active) setError("No se encontró el producto solicitado.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <Loader label="Cargando ficha técnica..." />;

  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <EmptyState
          title="Producto no disponible"
          description={error ?? "El producto que buscas no existe."}
        />
        <div className="mt-6 text-center">
          <Link to="/catalogo" className="font-mono text-sm text-trace-400 hover:underline">
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const specs = [
    { label: "Marca", value: product.brand },
    { label: "Tipo", value: product.type },
    { label: "Capacidad total", value: `${product.capacityGb} GB` },
    { label: "Configuración", value: `Kit ${product.kit}` },
    { label: "Velocidad", value: `${product.speedMhz} MHz` },
    { label: "Latencia CAS", value: `CL${product.casLatency}` },
    { label: "Voltaje", value: `${product.voltage} V` },
    { label: "Stock", value: product.stock > 0 ? `${product.stock} unidades` : "Agotado" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <Link to="/catalogo" className="font-mono text-xs text-trace-400 hover:underline">
        ← Volver al catálogo
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-graphite-700 bg-graphite-900">
          <img
            src={product.image}
            alt={`Memoria RAM ${product.brand} ${product.name}`}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-mist-500">
            {product.brand}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-mist-100">
            {product.name}
          </h1>
          <p className="mt-4 text-sm text-mist-300">{product.description}</p>

          <p className="mt-6 font-display text-3xl font-semibold text-trace-400">
            S/ {product.price.toFixed(2)}
          </p>

          <Button
            variant="primary"
            className="mt-5 w-full md:w-auto"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Sin stock" : "Añadir al carrito"}
          </Button>

          {/* Ficha técnica estilo datasheet */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg border border-graphite-700 bg-graphite-800 p-5 font-mono text-sm">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-xs uppercase tracking-wider text-mist-500">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-mist-100">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
