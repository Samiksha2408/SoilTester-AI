import {
  BarChart3,
  CheckCircle2,
  FlaskConical,
  Leaf,
  ShieldCheck,
} from "lucide-react";

function MiniDashboard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_50px_rgba(15,91,53,0.10)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
        <div>
          <p className="text-[10px] font-bold text-stone-900">
            Farm Intelligence
          </p>
          <p className="text-[7px] text-stone-400">
            Latest agricultural insights
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[7px] font-semibold text-forest-700">
          Updated
        </span>
      </div>

      {/* Body */}
      <div className="space-y-3 bg-[#f7f8f7] p-4">
        {/* Soil */}
        <div className="rounded-xl border border-stone-200 bg-white p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-forest-800">
              <FlaskConical className="h-3.5 w-3.5" />
            </div>

            <div>
              <p className="text-[9px] font-semibold text-stone-900">
                Soil Analysis
              </p>
              <p className="text-[6px] text-stone-400">Latest soil report</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {[
              ["pH", "6.47"],
              ["N", "49.96"],
              ["P", "33.96"],
              ["K", "29.93"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-stone-50 p-2">
                <p className="text-[6px] text-stone-400">{label}</p>
                <p className="mt-0.5 text-[9px] font-bold text-stone-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-forest-900 p-3 text-white">
            <Leaf className="h-4 w-4 text-emerald-300" />

            <p className="mt-3 text-[7px] text-emerald-200">Recommended crop</p>

            <p className="mt-1 text-base font-bold">Mango</p>

            <div className="mt-3 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-300" />
              <span className="text-[6px] text-emerald-100/70">
                Soil matched
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-3">
            <BarChart3 className="h-4 w-4 text-forest-700" />

            <p className="mt-3 text-[7px] text-stone-400">Soil health</p>

            <p className="mt-1 text-base font-bold text-stone-900">87/100</p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full w-[87%] rounded-full bg-forest-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-forest-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              One connected workspace
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
              See your farm data come together.
            </h2>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-600">
              From soil readings to crop recommendations, SmartAgriAI brings
              important farming information into one clear workspace.
            </p>

            <div className="mt-8 space-y-4">
              <Point
                icon={FlaskConical}
                title="Understand your soil"
                text="Review the important nutrient and pH values from your latest analysis."
              />

              <Point
                icon={Leaf}
                title="Explore better options"
                text="Use your farm information to guide crop and fertilizer decisions."
              />

              <Point
                icon={BarChart3}
                title="Keep decisions visible"
                text="See your latest analysis and recommendations without jumping between tools."
              />
            </div>
          </div>

          {/* Product visual */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-emerald-100/40 blur-3xl" />

            <div className="relative">
              <MiniDashboard />

              {/* Floating insight card */}
              <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_15px_40px_rgba(15,91,53,0.12)] sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                    <CheckCircle2 className="h-4 w-4 text-forest-700" />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold text-stone-900">
                      Soil report ready
                    </p>
                    <p className="mt-0.5 text-[8px] text-stone-400">
                      87/100 soil health
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Point({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-forest-800">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>

        <p className="mt-1 max-w-md text-sm leading-relaxed text-stone-500">
          {text}
        </p>
      </div>
    </div>
  );
}
