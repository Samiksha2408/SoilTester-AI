import { useEffect, useState } from "react";
import { Beaker, Leaf, TestTube, TrendingUp, Wallet } from "lucide-react";

import RecentReports from "../components/dashboard/RecentReports";
import StatCard from "../components/dashboard/StatCard";
import Card from "../components/ui/Card";
import { getReports } from "../services/api";
import { getCropRecommendations } from "../services/api";
import { getFertilizerRecommendations } from "../services/api";
import { useApp } from "../context/AppContext";

function greeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";

  return "Good Evening";
}

function getLatest(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return [...items].sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();

    return dateB - dateA;
  })[0];
}

export default function Dashboard() {
  const { profile } = useApp();

  const [reports, setReports] = useState([]);
  const [cropRecommendations, setCropRecommendations] = useState([]);
  const [fertilizerRecommendations, setFertilizerRecommendations] = useState(
    [],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      setError("");

      const [reportsData, cropsData, fertilizersData] = await Promise.all([
        getReports(),
        getCropRecommendations(),
        getFertilizerRecommendations(),
      ]);

      setReports(Array.isArray(reportsData) ? reportsData : []);
      setCropRecommendations(Array.isArray(cropsData) ? cropsData : []);
      setFertilizerRecommendations(
        Array.isArray(fertilizersData) ? fertilizersData : [],
      );
    } catch (err) {
      console.error("Dashboard data error:", err);
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  const latestReport = getLatest(reports);
  const latestCrop = getLatest(cropRecommendations);
  const latestFertilizer = getLatest(fertilizerRecommendations);

  const recommendedCrop = latestCrop?.crop_name || "N/A";

  const estimatedYield =
    latestCrop?.expected_yield !== null &&
    latestCrop?.expected_yield !== undefined
      ? String(latestCrop.expected_yield)
      : "N/A";

  const fertilizerName = latestFertilizer?.fertilizer_name || "N/A";

  const latestPH =
    latestReport?.ph !== null && latestReport?.ph !== undefined
      ? String(latestReport.ph)
      : "N/A";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          {greeting()} 👋
        </h2>

        <p className="mt-1 text-stone-500">
          Here&apos;s your farm intelligence overview.
        </p>

        <p className="mt-2 text-xs text-stone-400">
          {profile?.full_name
            ? `Welcome back, ${profile.full_name}.`
            : "Your latest agricultural data at a glance."}
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={TestTube}
          label="Soil Reports"
          value={loading ? "..." : String(reports.length)}
          hint="Total reports"
        />

        <StatCard
          icon={Leaf}
          label="Recommended Crop"
          value={loading ? "..." : recommendedCrop}
          hint="Latest recommendation"
        />

        <StatCard
          icon={TrendingUp}
          label="Expected Yield"
          value={loading ? "..." : estimatedYield}
          hint="Latest crop recommendation"
        />

        <StatCard
          icon={Wallet}
          label="Fertilizer"
          value={loading ? "..." : fertilizerName}
          hint="Latest recommendation"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3">
              <Beaker className="h-5 w-5 text-forest-700" />
            </div>

            <div>
              <h3 className="font-semibold text-stone-900">
                Latest Soil Analysis
              </h3>

              <p className="text-sm text-stone-500">
                Data from your latest soil report
              </p>
            </div>
          </div>

          {loading ? (
            <p className="mt-6 text-sm text-stone-500">Loading soil data...</p>
          ) : latestReport ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric label="pH" value={latestPH} />

              <Metric label="Nitrogen" value={latestReport.nitrogen ?? "N/A"} />

              <Metric
                label="Phosphorus"
                value={latestReport.phosphorus ?? "N/A"}
              />

              <Metric
                label="Potassium"
                value={latestReport.potassium ?? "N/A"}
              />
            </div>
          ) : (
            <p className="mt-6 text-sm text-stone-500">
              No soil reports available yet.
            </p>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3">
              <Leaf className="h-5 w-5 text-forest-700" />
            </div>

            <div>
              <h3 className="font-semibold text-stone-900">
                Latest Recommendations
              </h3>

              <p className="text-sm text-stone-500">
                Your latest crop and fertilizer recommendations
              </p>
            </div>
          </div>

          {loading ? (
            <p className="mt-6 text-sm text-stone-500">
              Loading recommendations...
            </p>
          ) : (
            <div className="mt-6 space-y-3">
              <RecommendationRow
                label="Crop"
                value={latestCrop?.crop_name || "No recommendation"}
              />

              <RecommendationRow
                label="Fertilizer"
                value={latestFertilizer?.fertilizer_name || "No recommendation"}
              />

              <RecommendationRow
                label="Application"
                value={latestFertilizer?.application_method || "N/A"}
              />

              <RecommendationRow
                label="Confidence"
                value={
                  latestCrop?.confidence_score ??
                  latestFertilizer?.confidence_score ??
                  "N/A"
                }
              />
            </div>
          )}
        </Card>
      </div>

      <RecentReports />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl bg-stone-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-stone-900">{value}</p>
    </div>
  );
}

function RecommendationRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-stone-50 px-4 py-3">
      <span className="text-sm text-stone-500">{label}</span>

      <span className="text-right text-sm font-semibold text-stone-900">
        {value}
      </span>
    </div>
  );
}
