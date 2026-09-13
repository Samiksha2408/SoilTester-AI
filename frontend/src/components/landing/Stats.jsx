import { FlaskConical, Leaf, Sprout, ScanSearch } from "lucide-react";

const capabilities = [
  {
    icon: FlaskConical,
    number: "01",
    title: "Understand",
    text: "Analyze soil health, nutrients and pH.",
  },
  {
    icon: Leaf,
    number: "02",
    title: "Choose",
    text: "Find crops suited to your farm conditions.",
  },
  {
    icon: Sprout,
    number: "03",
    title: "Plan",
    text: "Build practical fertilizer recommendations.",
  },
  {
    icon: ScanSearch,
    number: "04",
    title: "Protect",
    text: "Detect plant diseases from crop images.",
  },
];

export default function Stats() {
  return (
    <section className="px-4 pb-6 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-stone-200 bg-white shadow-[var(--shadow-card)]">
        <div className="grid divide-y divide-stone-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="group flex items-start gap-4 px-5 py-6 sm:px-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-forest-800 transition group-hover:bg-forest-900 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-emerald-600">
                      {item.number}
                    </span>

                    <h3 className="text-sm font-bold text-stone-900">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-1 text-xs leading-relaxed text-stone-500">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
