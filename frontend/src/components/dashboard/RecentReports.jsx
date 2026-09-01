import { Link } from "react-router-dom"
import { reports } from "../../data/mockData"
import Badge from "../ui/Badge"

export default function RecentReports() {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-semibold text-stone-900">Recent reports</h2>
          <p className="text-sm text-stone-500">Demo records for presentation</p>
        </div>
        <Link to="/reports" className="text-sm font-semibold text-forest-700 hover:text-forest-900">
          View all
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full text-left text-sm">
          <thead className="border-y border-stone-100 bg-mist/70 text-xs uppercase tracking-wide text-stone-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Report</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Soil Health</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((row) => (
              <tr key={row.id} className="border-b border-stone-100 last:border-0">
                <td className="px-6 py-3.5">
                  <p className="font-medium text-stone-800">{row.name}</p>
                  <p className="text-xs text-stone-400">{row.type}</p>
                </td>
                <td className="px-4 py-3.5 text-stone-600">{row.date}</td>
                <td className="px-4 py-3.5 font-semibold text-forest-800">{row.soilHealth}/100</td>
                <td className="px-4 py-3.5">
                  <Badge tone={row.status === "Ready" ? "green" : "slate"}>{row.status}</Badge>
                </td>
                <td className="px-6 py-3.5">
                  <Link to="/reports" className="font-semibold text-forest-700">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
