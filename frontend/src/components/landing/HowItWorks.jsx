import { CheckCircle2, FlaskConical, Leaf, Sprout } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Sprout,
    title: "Add your farm data",
    description:
      "Enter your field details and provide the soil information available to you.",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Understand your soil",
    description:
      "Review important soil indicators such as pH, nitrogen, phosphorus and potassium.",
  },
  {
    number: "03",
    icon: Leaf,
    title: "Get smart recommendations",
    description:
      "Explore suitable crops and fertilizer guidance based on your farm information.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Make better decisions",
    description:
      "Use clear insights to plan your next farming decision with more confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-mist px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-lime-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">
            How it works
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-stone-900 sm:text-5xl">
            From farm data to better decisions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
            SmartAgriAI turns your farm information into simple, actionable
            insights through a straightforward four-step journey.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-emerald-200 lg:block" />

          <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="group relative flex h-full min-h-[330px] flex-col rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    {/* Number */}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-lg font-bold tracking-tight text-forest-800">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-950 text-white shadow-sm transition duration-300 group-hover:bg-forest-800">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-8 flex flex-1 flex-col">
                    <h3 className="max-w-[220px] text-xl font-semibold leading-snug tracking-tight text-stone-900">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-stone-500 sm:text-[15px]">
                      {step.description}
                    </p>

                    {/* Bottom step indicator */}
                    <div className="mt-auto flex items-center gap-2 pt-7 text-xs font-semibold uppercase tracking-[0.12em] text-forest-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      Step {step.number}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-3 rounded-2xl border border-emerald-100 bg-white px-5 py-4 text-center shadow-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-forest-700" />

          <p className="text-sm text-stone-600 sm:text-[15px]">
            One workspace to understand your farm and plan what comes next.
          </p>
        </div>
      </div>
    </section>
  );
}
