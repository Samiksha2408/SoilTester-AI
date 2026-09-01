import { Bell, Menu, Search } from "lucide-react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { demoNotifications } from "../../data/mockData"
import { useApp } from "../../context/AppContext"

const titles = {
  "/dashboard": "Dashboard",
  "/soil-analysis": "Soil Analysis",
  "/crop-recommendation": "Crop Recommendation",
  "/weather": "Weather",
  "/fertilizer-plan": "Fertilizer Plan",
  "/reports": "Reports",
  "/ai-assistant": "AI Assistant",
  "/settings": "Settings",
}

export default function Topbar({ onMenu }) {
  const { pathname } = useLocation()
  const { profile } = useApp()
  const [open, setOpen] = useState(false)
  const title = titles[pathname] || "SmartAgriAI"

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-stone-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 lg:hidden"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-stone-900 sm:text-lg">{title}</h1>
          <p className="hidden truncate text-xs text-stone-500 sm:block">Farm intelligence workspace</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <label className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            placeholder="Search pages"
            className="w-52 rounded-xl border border-stone-200 bg-mist py-2 pl-9 pr-3 text-sm outline-none focus:border-forest-600 lg:w-64"
          />
        </label>
        <div className="relative">
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-forest-600" />
          </button>
          {open ? (
            <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-stone-200 bg-white p-3 shadow-lg">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">Demo alerts</p>
              {demoNotifications.map((item) => (
                <div key={item.id} className="rounded-xl px-2 py-2 hover:bg-mist">
                  <p className="text-sm font-medium text-stone-800">{item.title}</p>
                  <p className="text-xs text-stone-500">{item.body}</p>
                  <p className="mt-1 text-[11px] text-stone-400">{item.time}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-stone-200 py-1.5 pl-1.5 pr-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-800 text-xs font-bold text-white">
            {profile.name.slice(0, 1)}
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-xs font-semibold text-stone-800">{profile.name}</span>
            <span className="block truncate text-[11px] text-stone-500">{profile.role}</span>
          </span>
        </div>
      </div>
    </header>
  )
}
