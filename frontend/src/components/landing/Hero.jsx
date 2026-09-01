import { ArrowRight, CloudSun, Leaf, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import Badge from "../ui/Badge"
import Button from "../ui/Button"

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -left-6 -top-8 h-28 w-28 rounded-full bg-emerald-200/50 blur-2xl" />
      <div className="absolute -bottom-8 -right-4 h-32 w-32 rounded-full bg-lime-200/40 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-lift)] sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Farm intelligence</p>
            <p className="text-lg font-bold text-stone-900">Demo field overview</p>
          </div>
          <Badge>
            <Sparkles className="h-3.5 w-3.5" />
            Live demo
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-mist p-4">
            <p className="text-xs text-stone-500">Soil health</p>
            <p className="mt-1 text-2xl font-bold text-forest-800">82</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full w-[82%] rounded-full bg-forest-700" />
            </div>
          </div>
          <div className="rounded-2xl bg-forest-900 p-4 text-white">
            <p className="text-xs text-emerald-200">Recommended</p>
            <p className="mt-1 flex items-center gap-2 text-lg font-bold">
              <Leaf className="h-4 w-4 text-emerald-300" />
              Wheat
            </p>
            <p className="mt-2 text-xs text-emerald-100/80">Rabi · 4.2 t/acre</p>
          </div>
        </div>
        <div className="mt-3 rounded-2xl border border-stone-100 p-4">
          <div className="mb-3 flex items-center justify-between text-xs font-medium text-stone-500">
            <span>Nutrient balance</span>
            <span>N · P · K</span>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Nitrogen", w: "70%" },
              { label: "Phosphorus", w: "42%" },
              { label: "Potassium", w: "78%" },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex justify-between text-[11px] text-stone-500">
                  <span>{row.label}</span>
                </div>
                <div className="h-1.5 rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-forest-600" style={{ width: row.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-stone-600">
            <CloudSun className="h-4 w-4 text-amber-500" />
            28°C · Partly cloudy
          </div>
          <span className="text-xs font-semibold text-forest-700">Nashik demo</span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,_rgba(20,83,45,0.08),_transparent_60%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-up">
          <Badge className="mb-5">AI-Powered Smart Agriculture</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-forest-950 sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
            Smarter Farming Starts With Better Decisions
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
            SmartAgriAI helps farmers analyze soil, discover suitable crops, plan fertilizers and make
            data-driven farming decisions using AI-powered insights.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Explore Features
              </Button>
            </a>
          </div>
        </div>
        <div className="animate-fade-up delay-200">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
