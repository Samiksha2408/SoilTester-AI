import { Check, LoaderCircle } from "lucide-react"

export default function LoadingState({ steps, activeIndex, title = "Working" }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist">
          <LoaderCircle className="h-5 w-5 animate-spin text-forest-700" />
        </span>
        <div>
          <p className="text-sm font-semibold text-stone-900">{title}</p>
          <p className="text-sm text-stone-500">Demo analysis in progress</p>
        </div>
      </div>
      <ol className="space-y-3">
        {steps.map((step, index) => {
          const done = index < activeIndex
          const active = index === activeIndex
          return (
            <li key={step} className="flex items-center gap-3 text-sm">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  done
                    ? "bg-forest-700 text-white"
                    : active
                      ? "border border-forest-600 text-forest-700"
                      : "border border-stone-200 text-stone-400"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : <span className="text-[11px]">{index + 1}</span>}
              </span>
              <span className={active ? "font-medium text-stone-900" : "text-stone-500"}>{step}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
