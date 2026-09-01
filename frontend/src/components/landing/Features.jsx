import {
  CloudSun,
  FileSpreadsheet,
  FlaskConical,
  MessageSquare,
  Sprout,
  TrendingUp,
  Wallet,
  Wheat,
} from "lucide-react"
import Card from "../ui/Card"

const features = [
  {
    icon: FlaskConical,
    title: "Soil Analysis",
    description: "Read N, P, K, pH and organic matter from a report or manual entry, then score soil health.",
  },
  {
    icon: Wheat,
    title: "Crop Recommendation",
    description: "Match soil, season, field size and yield goals to a practical crop suggestion.",
  },
  {
    icon: Sprout,
    title: "Fertilizer Planning",
    description: "Split basal and top-dress applications with quantities in kg/ha and simple timing.",
  },
  {
    icon: CloudSun,
    title: "Weather Insights",
    description: "See current conditions and a 5-day outlook structured for later live weather APIs.",
  },
  {
    icon: TrendingUp,
    title: "Yield Prediction",
    description: "Estimate production from demo field context so planning conversations stay grounded.",
  },
  {
    icon: Wallet,
    title: "Cost Estimation",
    description: "Review input costs and lower-cost options such as compost alongside bagged fertilizer.",
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description: "Ask farming questions in a clean chat that can later connect to your team’s model API.",
  },
  {
    icon: FileSpreadsheet,
    title: "Smart Reports",
    description: "Keep soil and crop notes together, ready for CSV or PDF export when the backend lands.",
  },
]

export default function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-forest-700">Features</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
            Everything You Need for Smarter Farming
          </h2>
          <p className="mt-3 text-stone-600">
            One workspace for soil, crops, nutrients, weather and cost — designed for a final-year demo and
            real API integration later.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} hover>
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-forest-800">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-stone-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
