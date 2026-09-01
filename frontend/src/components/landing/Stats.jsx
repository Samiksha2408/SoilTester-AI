const items = [
  { label: "Soil Analysis", detail: "NPK, pH and organic matter" },
  { label: "Crop Recommendations", detail: "Season and soil matched" },
  { label: "Fertilizer Planning", detail: "Stage-wise split doses" },
  { label: "AI Insights", detail: "Clear next-step guidance" },
]

export default function Stats() {
  return (
    <section className="px-4 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-stone-200 bg-white px-4 py-6 shadow-[var(--shadow-card)] sm:px-8">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
          Product capabilities
        </p>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-semibold text-forest-900">{item.label}</p>
              <p className="mt-1 text-sm text-stone-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
