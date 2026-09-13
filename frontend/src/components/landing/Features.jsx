import {
  ArrowUpRight,
  FlaskConical,
  Leaf,
  ScanSearch,
  Sprout,
} from "lucide-react";

const features = [
  {
    icon: FlaskConical,
    number: "01",
    title: "Soil Analysis",
    description:
      "Understand your soil through key readings like pH, nitrogen, phosphorus and potassium.",
    className: "lg:col-span-2",
    visual: "soil",
  },
  {
    icon: Leaf,
    number: "02",
    title: "Crop Recommendation",
    description:
      "Discover crops that better match your soil conditions and farming goals.",
    className: "lg:col-span-1",
    visual: "crop",
  },
  {
    icon: Sprout,
    number: "03",
    title: "Fertilizer Planning",
    description:
      "Turn soil information into clearer fertilizer recommendations and application guidance.",
    className: "lg:col-span-1",
    visual: "fertilizer",
  },
  {
    icon: ScanSearch,
    number: "04",
    title: "Plant Disease Detection",
    description:
      "Upload a crop image and get an AI-powered disease prediction with practical guidance.",
    className: "lg:col-span-2",
    visual: "disease",
  },
];

function SoilVisual() {
  return (
    <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-stone-600">
          Latest soil analysis
        </span>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-forest-700">
          Healthy
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Value label="pH" value="6.47" />
        <Value label="Nitrogen" value="49.96" />
        <Value label="Phosphorus" value="33.96" />
        <Value label="Potassium" value="29.93" />
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-[9px] text-stone-400">
          <span>Soil health</span>
          <span className="font-semibold text-forest-700">87/100</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-emerald-100">
          <div className="h-full w-[87%] rounded-full bg-forest-700" />
        </div>
      </div>
    </div>
  );
}

function CropVisual() {
  return (
    <div className="mt-8 rounded-2xl bg-forest-900 p-5 text-white">
      <p className="text-[10px] text-emerald-200">Recommended crop</p>

      <div className="mt-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Leaf className="h-5 w-5 text-emerald-300" />
        </div>

        <div>
          <p className="text-xl font-bold">Mango</p>
          <p className="text-[9px] text-emerald-200/70">
            Based on available farm data
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-[9px] text-emerald-100/60">Recommendation</span>
        <span className="text-[9px] font-semibold text-emerald-200">
          AI-assisted
        </span>
      </div>
    </div>
  );
}

function FertilizerVisual() {
  return (
    <div className="mt-8 space-y-2 rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <div className="flex items-center justify-between rounded-xl bg-white px-3 py-3">
        <span className="text-[10px] text-stone-500">Nitrogen</span>
        <span className="text-[10px] font-semibold text-stone-800">
          Based on soil
        </span>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-white px-3 py-3">
        <span className="text-[10px] text-stone-500">Phosphorus</span>
        <span className="text-[10px] font-semibold text-stone-800">
          Soil-aware
        </span>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-white px-3 py-3">
        <span className="text-[10px] text-stone-500">Application</span>
        <span className="text-[10px] font-semibold text-forest-700">
          Planned
        </span>
      </div>
    </div>
  );
}

function DiseaseVisual() {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
      <div className="flex min-h-[150px] items-center justify-center rounded-2xl bg-emerald-50">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-emerald-300">
          <ScanSearch className="h-8 w-8 text-forest-700" />

          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-forest-800 text-[9px] font-bold text-white">
            AI
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-4">
        <p className="text-[9px] uppercase tracking-wider text-stone-400">
          Detection result
        </p>

        <p className="mt-2 text-base font-bold text-stone-900">Plant disease</p>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
          <div className="h-full w-[90%] rounded-full bg-forest-700" />
        </div>

        <p className="mt-2 text-[9px] text-stone-500">
          Image-based prediction with recommendations
        </p>
      </div>
    </div>
  );
}

function Value({ label, value }) {
  return (
    <div className="rounded-xl bg-white px-2.5 py-3">
      <p className="text-[8px] uppercase text-stone-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-stone-800">{value}</p>
    </div>
  );
}

function FeatureVisual({ type }) {
  if (type === "soil") return <SoilVisual />;
  if (type === "crop") return <CropVisual />;
  if (type === "fertilizer") return <FertilizerVisual />;
  return <DiseaseVisual />;
}

export default function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-forest-700">
            What you can do
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
            From soil data to smarter farm decisions
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600">
            SmartAgriAI brings the most important farming insights together in
            one simple workspace.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className={`group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${feature.className}`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-forest-800">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-stone-300">
                    {feature.number}
                    <ArrowUpRight className="h-3.5 w-3.5 text-stone-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest-700" />
                  </div>
                </div>

                {/* Text */}
                <div className="mt-6 max-w-lg">
                  <h3 className="text-xl font-bold text-stone-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-stone-500">
                    {feature.description}
                  </p>
                </div>

                {/* Mini product visual */}
                <FeatureVisual type={feature.visual} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
