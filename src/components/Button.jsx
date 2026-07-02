const variants = {
  primary:
    "bg-trace-500 text-graphite-950 hover:bg-trace-400 focus-visible:outline-trace-400",
  outline:
    "border border-graphite-600 text-mist-100 hover:border-trace-500 hover:text-trace-400",
  amber:
    "bg-amber-400 text-graphite-950 hover:bg-amber-500",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-display text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
