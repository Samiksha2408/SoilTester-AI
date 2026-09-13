import { ArrowUpRight, Leaf, Sprout, TestTube2 } from "lucide-react";

const scenarios = [
  {
    tag: "Before planting",
    title: "What should I grow?",
    description:
      "Get crop recommendations based on your soil, location and target yield.",
    icon: Sprout,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
  },
  {
    tag: "After soil testing",
    title: "What is my soil telling me?",
    description:
      "Understand pH, nutrients and soil health with simple, useful insights.",
    icon: TestTube2,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=85",
  },
  {
    tag: "When something looks wrong",
    title: "What is happening to my crop?",
    description:
      "Upload a plant image, detect possible disease and get recommended actions.",
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function WhyChoose() {
  return (
    <section
      id="about"
      className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">
              Built for real farms
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Built around the moments
              <span className="text-forest-700"> that matter.</span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-stone-500 lg:ml-auto lg:text-lg">
            Whether you're planning your next crop, checking your soil or
            spotting a problem, SmartAgriAI gives you the right information at
            the right time.
          </p>
        </div>

        {/* Scenario cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;

            return (
              <article
                key={scenario.title}
                className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <img
                    src={scenario.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                  {/* Scenario tag */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur-sm">
                    <Icon className="h-3.5 w-3.5 text-forest-700" />
                    {scenario.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-stone-900">
                        {scenario.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-6 text-stone-500 sm:text-base">
                        {scenario.description}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-400 transition duration-300 group-hover:border-forest-700 group-hover:bg-forest-700 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom connection */}
        <div className="mt-6 flex flex-col gap-4 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-forest-700 shadow-sm">
              <Leaf className="h-4 w-4" />
            </div>

            <p className="text-sm font-medium text-stone-700">
              One workspace for the decisions that come next.
            </p>
          </div>

          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest-700">
            Soil · Crops · Fertilizer · Plant Health
          </span>
        </div>
      </div>
    </section>
  );
}
