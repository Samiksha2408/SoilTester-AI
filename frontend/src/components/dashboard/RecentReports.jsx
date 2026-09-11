import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import { getReports } from "../../services/api";

function formatDate(date) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString();
}

function getSoilHealth(report) {
  const ph = Number(report?.ph);

  if (!Number.isFinite(ph)) {
    return "N/A";
  }

  // Simple display score based on how close the pH is to neutral.
  const distance = Math.abs(ph - 7);
  const score = Math.max(0, Math.round(100 - distance * 25));

  return `${score}/100`;
}

export default function RecentReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadReports() {
      try {
        setLoading(true);
        setError("");

        const data = await getReports();

        if (!ignore) {
          const sortedReports = Array.isArray(data)
            ? [...data].sort(
                (a, b) =>
                  new Date(b.created_at || 0).getTime() -
                  new Date(a.created_at || 0).getTime(),
              )
            : [];

          setReports(sortedReports.slice(0, 5));
        }
      } catch (err) {
        if (!ignore) {
          console.error("Recent reports error:", err);
          setError(err.message || "Failed to load recent reports.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadReports();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-semibold text-stone-900">Recent reports</h2>
          <p className="text-sm text-stone-500">Your latest soil reports</p>
        </div>

        <Link
          to="/reports"
          className="text-sm font-semibold text-forest-700 hover:text-forest-900"
        >
          View all
        </Link>
      </div>

      {loading ? (
        <div className="px-6 py-8 text-sm text-stone-500">
          Loading reports...
        </div>
      ) : error ? (
        <div className="px-6 py-8 text-sm text-red-600">{error}</div>
      ) : reports.length === 0 ? (
        <div className="px-6 py-8 text-sm text-stone-500">
          No soil reports available yet.
        </div>
      ) : (
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
                <tr
                  key={row.id}
                  className="border-b border-stone-100 last:border-0"
                >
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-stone-800">
                      {row.report_name || "Soil Report"}
                    </p>

                    <p className="text-xs text-stone-400">
                      {row.soil_type || "Unknown soil type"}
                    </p>
                  </td>

                  <td className="px-4 py-3.5 text-stone-600">
                    {formatDate(row.created_at)}
                  </td>

                  <td className="px-4 py-3.5 font-semibold text-forest-800">
                    {getSoilHealth(row)}
                  </td>

                  <td className="px-4 py-3.5">
                    <Badge tone="green">Ready</Badge>
                  </td>

                  <td className="px-6 py-3.5">
                    <Link
                      to="/reports"
                      className="font-semibold text-forest-700"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
