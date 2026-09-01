const steps = [
  { n: "01", title: "Upload Your Data", text: "Add a soil report or enter NPK, pH and field details." },
  { n: "02", title: "AI Analyzes Your Farm", text: "The workspace scores nutrients, season fit and cost signals." },
  { n: "03", title: "Get Smart Recommendations", text: "See crop, fertilizer splits and warnings in plain language." },
  { n: "04", title: "Make Better Decisions", text: "Download a plan, revisit reports, and update farm context over time." },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-mist/80 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-forest-700">How it works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
            From soil numbers to a field plan
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.n} className="relative">
              {index < steps.length - 1 ? (
                <div className="absolute left-[28px] top-14 hidden h-px w-[calc(100%+24px)] bg-emerald-200 lg:block" />
              ) : null}
              <div className="relative rounded-2xl border border-stone-200 bg-white p-6">
                <p className="text-sm font-bold text-forest-700">{step.n}</p>
                <h3 className="mt-3 text-lg font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
