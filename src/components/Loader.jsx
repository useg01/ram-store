export default function Loader({ label = "Cargando datos..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-graphite-600 border-t-trace-400" />
      <p className="font-mono text-sm text-mist-500">{label}</p>
    </div>
  );
}
