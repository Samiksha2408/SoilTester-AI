import { FileDown, Globe, LayoutDashboard, Sparkles, Wallet, Workflow } from "lucide-react"

const points = [
  { icon: Sparkles, title: "AI-powered insights", text: "Step-by-step analysis states so the recommendation path is visible." },
  { icon: LayoutDashboard, title: "Easy-to-use interface", text: "A calm SaaS layout that works on phones, tablets and desktops." },
  { icon: Globe, title: "Regional language support", text: "English, Hindi and Marathi selectors are ready for later localization." },
  { icon: Workflow, title: "Data-driven recommendations", text: "Plans are tied to soil values, crop guides and field size — not slogans." },
  { icon: Wallet, title: "Cost awareness", text: "Input estimates sit next to agronomy so trade-offs are obvious." },
  { icon: FileDown, title: "Downloadable reports", text: "Structured report list with export placeholders for PDF and CSV." },
]

export default function WhyChoose() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold text-forest-700">Why SmartAgriAI</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
            Built like a product, not a poster
          </h2>
          <p className="mt-4 text-stone-600">
            The platform is designed for a professional agriculture AI demo: clear dosing language, cost
            sheets, pH cautions, and an architecture teammates can wire to real APIs.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point) => {
            const Icon = point.icon
            return (
              <div key={point.title} className="rounded-2xl border border-stone-200 bg-white p-5">
                <Icon className="mb-3 h-5 w-5 text-forest-700" />
                <h3 className="font-semibold text-stone-900">{point.title}</h3>
                <p className="mt-1.5 text-sm text-stone-500">{point.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
