import {
  ArrowRight,
  BarChart3,
  FlaskConical,
  Leaf,
  Search,
  Sprout,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Soft background glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-lime-200/25 blur-3xl" />

      {/* Browser / product frame */}
      <div className="relative overflow-hidden rounded-[26px] border border-stone-200 bg-white shadow-[0_25px_70px_rgba(15,91,53,0.14)]">
        {/* Top browser bar */}
        <div className="flex h-10 items-center gap-2 border-b border-stone-200 bg-stone-50/90 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />

          <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-[9px] text-stone-400 shadow-sm">
            app.smartagriai.com/dashboard
          </div>
        </div>

        {/* Mini application */}
        <div className="grid grid-cols-[100px_1fr] bg-[#f5f7f5]">
          {/* Mini sidebar */}
          <aside className="border-r border-stone-200 bg-white px-2.5 py-4">
            <div className="mb-5 flex items-center gap-2 px-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-forest-900 text-white">
                <Leaf className="h-3.5 w-3.5" />
              </div>

              <div className="hidden sm:block">
                <p className="text-[8px] font-bold text-stone-900">
                  SmartAgriAI
                </p>
                <p className="text-[6px] text-stone-400">Smarter farming</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="rounded-lg bg-forest-900 px-2 py-2 text-[8px] font-semibold text-white">
                Dashboard
              </div>

              {["Crop", "Weather", "Fertilizer", "Reports", "Disease"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-lg px-2 py-2 text-[8px] text-stone-500"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </aside>

          {/* Main dashboard */}
          <div className="min-w-0">
            {/* Dashboard header */}
            <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
              <div>
                <p className="text-[13px] font-bold text-stone-900">
                  Dashboard
                </p>
                <p className="text-[7px] text-stone-400">
                  Farm intelligence workspace
                </p>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-6 w-28 items-center gap-1.5 rounded-md border border-stone-200 bg-stone-50 px-2">
                  <Search className="h-3 w-3 text-stone-400" />
                  <span className="text-[7px] text-stone-400">
                    Search pages
                  </span>
                </div>

                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-stone-200 bg-white text-[8px] font-bold text-forest-800">
                  F
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="space-y-3 p-4">
              <div>
                <p className="text-[18px] font-bold tracking-tight text-stone-900">
                  Good Afternoon 👋
                </p>
                <p className="mt-0.5 text-[8px] text-stone-400">
                  Here's your farm intelligence overview.
                </p>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-4 gap-2">
                <MiniStat icon={FlaskConical} label="Soil Reports" value="1" />

                <MiniStat icon={Leaf} label="Recommended Crop" value="mango" />

                <MiniStat icon={BarChart3} label="Expected Yield" value="N/A" />

                <MiniStat icon={Wallet} label="Fertilizer" value="N/A" />
              </div>

              {/* Analysis + recommendation */}
              <div className="grid gap-2.5 sm:grid-cols-2">
                <PreviewCard
                  icon={FlaskConical}
                  title="Latest Soil Analysis"
                  subtitle="Data from your latest soil report"
                >
                  <div className="grid grid-cols-4 gap-1.5">
                    <MiniValue label="PH" value="6.47" />
                    <MiniValue label="N" value="49.96" />
                    <MiniValue label="P" value="33.96" />
                    <MiniValue label="K" value="29.93" />
                  </div>
                </PreviewCard>

                <PreviewCard
                  icon={Leaf}
                  title="Latest Recommendations"
                  subtitle="Your latest crop and fertilizer recommendations"
                >
                  <div className="space-y-1.5">
                    <RecommendationRow label="Crop" value="mango" />
                    <RecommendationRow
                      label="Fertilizer"
                      value="No recommendation"
                    />
                    <RecommendationRow label="Confidence" value="N/A" />
                  </div>
                </PreviewCard>
              </div>

              {/* Recent reports */}
              <div className="rounded-xl border border-stone-200 bg-white">
                <div className="flex items-center justify-between border-b border-stone-100 px-3 py-2.5">
                  <div>
                    <p className="text-[10px] font-semibold text-stone-900">
                      Recent reports
                    </p>
                    <p className="text-[7px] text-stone-400">
                      Your latest soil reports
                    </p>
                  </div>

                  <span className="text-[8px] font-semibold text-forest-700">
                    View all
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 px-3 py-2.5">
                  <div>
                    <p className="text-[6px] uppercase text-stone-400">
                      Report
                    </p>
                    <p className="mt-1 text-[8px] font-medium text-stone-800">
                      Soil test
                    </p>
                  </div>

                  <div>
                    <p className="text-[6px] uppercase text-stone-400">Date</p>
                    <p className="mt-1 text-[8px] text-stone-600">9/11/2026</p>
                  </div>

                  <div>
                    <p className="text-[6px] uppercase text-stone-400">
                      Soil health
                    </p>
                    <p className="mt-1 text-[8px] font-semibold text-forest-700">
                      87/100
                    </p>
                  </div>

                  <div>
                    <p className="text-[6px] uppercase text-stone-400">
                      Status
                    </p>
                    <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[7px] font-medium text-forest-700">
                      Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview label */}
        <div className="absolute right-4 top-14 rounded-full border border-emerald-100 bg-white/95 px-3 py-1.5 text-[9px] font-semibold text-forest-800 shadow-sm">
          Product Preview
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-2.5">
      <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-forest-800">
        <Icon className="h-3 w-3" />
      </div>

      <p className="text-[7px] text-stone-400">{label}</p>

      <p className="mt-0.5 truncate text-[11px] font-bold text-stone-900">
        {value}
      </p>
    </div>
  );
}

function PreviewCard({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-3">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-forest-800">
          <Icon className="h-3.5 w-3.5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[9px] font-semibold text-stone-900">
            {title}
          </p>

          <p className="truncate text-[6px] text-stone-400">{subtitle}</p>
        </div>
      </div>

      {children}
    </div>
  );
}

function MiniValue({ label, value }) {
  return (
    <div className="rounded-lg bg-stone-50 px-2 py-2">
      <p className="text-[6px] uppercase text-stone-400">{label}</p>
      <p className="mt-0.5 text-[9px] font-bold text-stone-800">{value}</p>
    </div>
  );
}

function RecommendationRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-stone-50 px-2.5 py-2">
      <span className="text-[7px] text-stone-400">{label}</span>
      <span className="max-w-[90px] truncate text-[7px] font-semibold text-stone-800">
        {value}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:pt-20"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_at_top,_rgba(20,83,45,0.09),_transparent_62%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Main hero content */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-forest-800 shadow-sm">
            <Sprout className="h-3.5 w-3.5" />
            AI-powered farm intelligence
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-forest-950 sm:text-5xl lg:text-[60px] lg:leading-[1.05]">
            Know Your Soil.
            <br />
            <span className="text-forest-700">Farm Smarter.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
            Analyze your soil, discover suitable crops, plan fertilizers and
            protect your plants with AI-powered insights built for smarter
            farming decisions.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <a href="#features">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Explore Features
              </Button>
            </a>
          </div>
        </div>

        {/* Product preview */}
        <div className="mt-14 sm:mt-16">
          <DashboardPreview />
        </div>

        {/* Small supporting line */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-400">
          <span>Soil analysis</span>
          <span className="hidden h-1 w-1 rounded-full bg-stone-300 sm:block" />
          <span>Crop recommendations</span>
          <span className="hidden h-1 w-1 rounded-full bg-stone-300 sm:block" />
          <span>Fertilizer planning</span>
          <span className="hidden h-1 w-1 rounded-full bg-stone-300 sm:block" />
          <span>Plant disease detection</span>
        </div>
      </div>
    </section>
  );
}
