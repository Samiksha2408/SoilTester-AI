import { useEffect, useState } from "react";
import { Beaker, CheckCircle, Loader2 } from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input, { Select } from "../components/ui/Input";
import { getReports, getFertilizerPlan } from "../services/api";

function sortByLatest(reports) {
  if (!Array.isArray(reports)) {
    return [];
  }

  return [...reports].sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() -
      new Date(a.created_at || 0).getTime(),
  );
}

export default function FertilizerPlan() {
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    fertilizerName: "",
    fertilizerType: "",
    quantityPerAcre: "",
    applicationMethod: "",
    applicationTime: "",
    recommendationReason: "",
    confidenceScore: "",
    soilReportId: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadReports() {
      try {
        setLoadingReports(true);
        setError("");

        const data = await getReports();

        if (!ignore) {
          const reportList = sortByLatest(data);

          setReports(reportList);

          if (reportList.length > 0) {
            setForm((previous) => ({
              ...previous,
              soilReportId: String(reportList[0].id),
            }));
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error("Fertilizer soil reports error:", err);
          setError(err.message || "Failed to load soil reports.");
        }
      } finally {
        if (!ignore) {
          setLoadingReports(false);
        }
      }
    }

    loadReports();

    return () => {
      ignore = true;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");
    setResult(null);

    try {
      const payload = {
        fertilizer_name: form.fertilizerName,
        fertilizer_type: form.fertilizerType,
        quantity_per_acre: Number(form.quantityPerAcre),
        application_method: form.applicationMethod,
        application_time: form.applicationTime,
        recommendation_reason: form.recommendationReason,
        confidence_score: Number(form.confidenceScore),
        soil_report_id: Number(form.soilReportId),
      };

      const data = await getFertilizerPlan(payload);

      setResult(data);
      setSuccess("Fertilizer recommendation created successfully.");
    } catch (err) {
      console.error("Fertilizer recommendation error:", err);
      setError(err.message || "Failed to create fertilizer recommendation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Fertilizer Plan</h2>

        <p className="mt-1 text-stone-500">
          Create a fertilizer recommendation using your soil report.
        </p>
      </div>

      <Card>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3">
            <Beaker className="h-6 w-6 text-forest-700" />
          </div>

          <div>
            <h3 className="font-semibold text-stone-900">
              Fertilizer Recommendation
            </h3>

            <p className="text-sm text-stone-500">
              Enter the recommendation details below.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle className="h-4 w-4" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Select
              label="Soil Report"
              name="soilReportId"
              value={form.soilReportId}
              onChange={handleChange}
              disabled={loadingReports || reports.length === 0}
              required
            >
              <option value="">
                {loadingReports
                  ? "Loading reports..."
                  : reports.length === 0
                    ? "No soil reports available"
                    : "Select soil report"}
              </option>

              {reports.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.report_name || `Report #${report.id}`}
                </option>
              ))}
            </Select>

            <Input
              label="Fertilizer Name"
              name="fertilizerName"
              value={form.fertilizerName}
              onChange={handleChange}
              placeholder="e.g. Urea"
              required
            />

            <Input
              label="Fertilizer Type"
              name="fertilizerType"
              value={form.fertilizerType}
              onChange={handleChange}
              placeholder="e.g. Nitrogen"
              required
            />

            <Input
              label="Quantity per Acre"
              name="quantityPerAcre"
              type="number"
              step="any"
              min="0"
              value={form.quantityPerAcre}
              onChange={handleChange}
              placeholder="e.g. 50"
              required
            />

            <Input
              label="Application Method"
              name="applicationMethod"
              value={form.applicationMethod}
              onChange={handleChange}
              placeholder="e.g. Soil application"
              required
            />

            <Input
              label="Application Time"
              name="applicationTime"
              value={form.applicationTime}
              onChange={handleChange}
              placeholder="e.g. Before sowing"
              required
            />

            <Input
              label="Confidence Score"
              name="confidenceScore"
              type="number"
              step="any"
              min="0"
              max="1"
              value={form.confidenceScore}
              onChange={handleChange}
              placeholder="e.g. 0.85"
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Recommendation Reason"
                name="recommendationReason"
                value={form.recommendationReason}
                onChange={handleChange}
                placeholder="Explain why this fertilizer is recommended"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || loadingReports || reports.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Recommendation"
            )}
          </Button>
        </form>
      </Card>

      {result && (
        <Card>
          <h3 className="mb-5 text-lg font-semibold text-stone-900">
            Recommendation Result
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultItem label="Fertilizer" value={result.fertilizer_name} />

            <ResultItem label="Type" value={result.fertilizer_type} />

            <ResultItem
              label="Quantity per Acre"
              value={result.quantity_per_acre}
            />

            <ResultItem
              label="Application Method"
              value={result.application_method}
            />

            <ResultItem
              label="Application Time"
              value={result.application_time}
            />

            <ResultItem
              label="Confidence Score"
              value={result.confidence_score}
            />

            <div className="rounded-xl bg-stone-50 p-4 sm:col-span-2 lg:col-span-3">
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                Recommendation Reason
              </p>

              <p className="mt-1 text-sm text-stone-800">
                {result.recommendation_reason || "Not provided"}
              </p>
            </div>

            <ResultItem label="Soil Report ID" value={result.soil_report_id} />

            <ResultItem label="Recommendation ID" value={result.id} />
          </div>
        </Card>
      )}
    </div>
  );
}

function ResultItem({ label, value }) {
  return (
    <div className="rounded-xl bg-stone-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-stone-900">
        {value !== null && value !== undefined && value !== ""
          ? String(value)
          : "N/A"}
      </p>
    </div>
  );
}
