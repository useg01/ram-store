export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-lg border border-dashed border-graphite-600 bg-graphite-900 px-6 py-12 text-center">
      <p className="font-display text-lg font-semibold text-mist-100">{title}</p>
      {description && (
        <p className="mx-auto mt-2 max-w-sm text-sm text-mist-500">{description}</p>
      )}
    </div>
  );
}
