import { Sprout } from "lucide-react"
import { Link } from "react-router-dom"

export default function Logo({ to = "/", dark = false, compact = false }) {
  return (
    <Link to={to} className="inline-flex min-w-0 items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest-800 text-white shadow-sm">
        <Sprout className="h-5 w-5" />
      </span>
      {!compact ? (
        <span className="min-w-0">
          <span className={`block truncate text-[15px] font-bold tracking-tight ${dark ? "text-white" : "text-forest-950"}`}>
            SmartAgriAI
          </span>
          <span className={`hidden truncate text-[11px] sm:block ${dark ? "text-emerald-100/80" : "text-stone-500"}`}>
            Smarter Farming. Better Decisions.
          </span>
        </span>
      ) : null}
    </Link>
  )
}
