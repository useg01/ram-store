import { Link } from "react-router-dom";


export default function ProductCard({ product }) {
  const {
    id,
    name,
    brand,
    type,
    capacityGb,
    kit,
    speedMhz,
    casLatency,
    price,
    stock,
    image,
  } = product;

  const lowStock = stock > 0 && stock <= 8;
  const outOfStock = stock === 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-graphite-700 bg-graphite-800 transition-colors hover:border-trace-500">
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite-900">
        <img
          src={image}
          alt={`Memoria RAM ${brand} ${name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-graphite-950/80 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-trace-400">
          {type}
        </span>
        {(lowStock || outOfStock) && (
          <span
            className={`absolute right-3 top-3 rounded px-2 py-1 font-mono text-[11px] uppercase tracking-wider ${
              outOfStock
                ? "bg-graphite-950/80 text-mist-500"
                : "bg-amber-400 text-graphite-950"
            }`}
          >
            {outOfStock ? "Agotado" : `Últimas ${stock}`}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-mist-500">
            {brand}
          </p>
          <h3 className="font-display text-lg font-semibold text-mist-100">
            {name}
          </h3>
        </div>

        {/* Franja de especificaciones, tipo etiqueta de datasheet */}
        <dl className="grid grid-cols-3 gap-2 rounded-md border border-graphite-600 bg-graphite-900 px-3 py-2 font-mono text-[11px] text-mist-300">
          <div>
            <dt className="text-mist-500">CAP</dt>
            <dd className="text-mist-100">{capacityGb}GB</dd>
          </div>
          <div>
            <dt className="text-mist-500">MHZ</dt>
            <dd className="text-mist-100">{speedMhz}</dd>
          </div>
          <div>
            <dt className="text-mist-500">CL</dt>
            <dd className="text-mist-100">{casLatency}</dd>
          </div>
        </dl>
        <p className="font-mono text-[11px] text-mist-500">Kit {kit}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="font-display text-xl font-semibold text-mist-100">
            S/ {price.toFixed(2)}
          </p>
          <Link
            to={`/catalogo/${id}`}
            className="font-mono text-xs text-trace-400 underline-offset-4 hover:underline"
          >
            Ver ficha →
          </Link>
        </div>
      </div>
    </article>
  );
}
