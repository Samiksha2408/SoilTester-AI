import { Leaf, TestTube, TrendingUp, Wallet } from "lucide-react"
import RecentReports from "../components/dashboard/RecentReports"
import StatCard from "../components/dashboard/StatCard"
import { dashboardStats } from "../data/mockData"
import { useApp } from "../context/AppContext"

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

export default function Dashboard() {
  const { profile } = useApp()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          {greeting()} 👋
        </h2>
        <p className="mt-1 text-stone-500">Here&apos;s your farm intelligence overview.</p>
        <p className="mt-2 text-xs text-stone-400">
          Showing demo data for {profile.farmName}. Figures are illustrative, not live sensor readings.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={TestTube} label="Soil Health" value={`${dashboardStats.soilHealth}/100`} hint="Demo score" />
        <StatCard icon={Leaf} label="Recommended Crop" value={dashboardStats.recommendedCrop} hint="Rabi demo match" />
        <StatCard icon={TrendingUp} label="Estimated Yield" value={dashboardStats.estimatedYield} hint="Illustrative" />
        <StatCard icon={Wallet} label="Estimated Cost" value={dashboardStats.estimatedCost} hint="Per acre, demo" />
      </div>
      <RecentReports />
    </div>
  )
}
