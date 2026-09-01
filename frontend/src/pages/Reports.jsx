import { Inbox } from "lucide-react"
import { useMemo, useState } from "react"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"
import { reports } from "../data/mockData"

const filters = ["All", "Soil analysis", "Crop recommendation", "Yield prediction"]

export default function Reports() {
  const [filter, setFilter] = useState("All")
  const rows = useMemo(
    () => (filter === "All" ? reports : reports.filter((r) => r.type === filter)),
    [filter]
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Reports</h2>
        <p className="mt-1 text-stone-500">Previous soil and crop notes stored as demo records.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              filter === item ? "bg-forest-800 text-white" : "bg-white text-stone-600 ring-1 ring-stone-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <Card className="flex flex-col items-center py-16 text-center">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-forest-800">
            <Inbox className="h-7 w-7" />
          </span>
          <h3 className="text-lg font-semibold">No reports in this view</h3>
          <p className="mt-2 max-w-md text-sm text-stone-500">
            When you run soil analysis or crop recommendation, summaries will appear here. PDF export will connect
            after the backend is ready.
          </p>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-wide text-stone-500">
                <tr>
                  <th className="px-6 py-3">Report</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Health</th>
                  <th className="px-6 py-3">Download</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-stone-100">
                    <td className="px-6 py-4">
                      <p className="font-medium">{row.name}</p>
                      <p className="text-xs text-stone-400">{row.id}</p>
                    </td>
                    <td className="px-4 py-4">{row.type}</td>
                    <td className="px-4 py-4">{row.date}</td>
                    <td className="px-4 py-4">
                      <Badge>{row.soilHealth}/100</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        title="PDF generation will be available when the backend is connected"
                      >
                        Download later
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
