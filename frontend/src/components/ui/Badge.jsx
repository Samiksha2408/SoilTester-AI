export default function Badge({ children, tone = "green", className = "" }) {
  const tones = {
    green: "bg-emerald-50 text-forest-800 border-emerald-100",
    amber: "bg-amber-50 text-amber-900 border-amber-100",
    red: "bg-red-50 text-red-800 border-red-100",
    slate: "bg-stone-100 text-stone-700 border-stone-200",
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
