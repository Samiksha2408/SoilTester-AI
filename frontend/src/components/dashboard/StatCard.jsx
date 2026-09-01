export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-forest-800">
        {Icon ? <Icon className="h-5 w-5" /> : null}
      </div>
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-stone-900">{value}</p>
      {hint ? <p className="mt-2 text-xs text-stone-400">{hint}</p> : null}
    </div>
  )
}
