import { useEffect, useState } from "react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Disclaimer from "../components/ui/Disclaimer";
import Input, { Select } from "../components/ui/Input";
import { getReports, recommendCrop } from "../services/api";

const initialForm = {
  soilReportId: "",
  temperature: "25",
  humidity: "60",
  rainfall: "100",
};

export default function CropRecommendation() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState(initialForm);

  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    setLoadingReports(true);
    setError("");

    try {
      const data = await getReports();
      const reportList = Array.isArray(data) ? data : [];

      setReports(reportList);

      if (reportList.length > 0) {
        setForm((current) => ({
          ...current,
          soilReportId: String(reportList[0].id),
        }));
      }
    } catch (err) {
      setError(err.message || "Failed to load soil reports.");
    } finally {
      setLoadingReports(false);
    }
  }

  function update(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function recommend(event) {
    event.preventDefault();

    setError("");
    setResult(null);

    if (!form.soilReportId) {
      setError("Please select a soil report.");
      return;
    }

    const payload = {
      soil_report_id: Number(form.soilReportId),
      temperature: Number(form.temperature),
      humidity: Number(form.humidity),
      rainfall: Number(form.rainfall),
    };

    const numericFields = [
      ["Temperature", payload.temperature],
      ["Humidity", payload.humidity],
      ["Rainfall", payload.rainfall],
    ];

    const invalidField = numericFields.find(
      ([, value]) => !Number.isFinite(value),
    );

    if (invalidField) {
      setError(`Please enter a valid value for ${invalidField[0]}.`);
      return;
    }

    setLoadingRecommendation(true);

    try {
      const data = await recommendCrop(payload);
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to get crop recommendation.");
    } finally {
      setLoadingRecommendation(false);
    }
  }

  function resetForm() {
    setForm({
      ...initialForm,
      soilReportId: reports.length > 0 ? String(reports[0].id) : "",
    });

    setResult(null);
    setError("");
  }

  const selectedReport = reports.find(
    (report) => String(report.id) === String(form.soilReportId),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-stone-900">
          Crop Recommendation
        </h2>

        <p className="mt-1 text-stone-500">
          Get a crop recommendation using your saved soil report and current
          environmental conditions.
        </p>
      </div>

      {/* Error */}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <form
        onSubmit={recommend}
        className="grid gap-6 lg:grid-cols-[1fr_1.1fr]"
      >
        {/* Form */}
        <Card>
          <div className="space-y-4">
            <Select
              label="Soil Report"
              value={form.soilReportId}
              onChange={(event) => update("soilReportId", event.target.value)}
              disabled={loadingReports || reports.length === 0}
            >
              {loadingReports ? (
                <option value="">Loading soil reports...</option>
              ) : reports.length === 0 ? (
                <option value="">No soil reports available</option>
              ) : (
                reports.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.report_name} — {report.soil_type || "Unknown soil"}
                  </option>
                ))
              )}
            </Select>

            {selectedReport ? (
              <div className="rounded-xl bg-mist px-4 py-3 text-sm">
                <p className="font-medium text-stone-800">
                  Selected soil report
                </p>

                <p className="mt-1 text-stone-500">
                  pH: {selectedReport.ph ?? "N/A"} · Soil:{" "}
                  {selectedReport.soil_type || "Not specified"}
                </p>
              </div>
            ) : null}

            <Input
              label="Temperature (°C)"
              type="number"
              step="0.1"
              value={form.temperature}
              onChange={(event) => update("temperature", event.target.value)}
              placeholder="e.g. 25"
            />

            <Input
              label="Humidity (%)"
              type="number"
              step="0.1"
              value={form.humidity}
              onChange={(event) => update("humidity", event.target.value)}
              placeholder="e.g. 60"
            />

            <Input
              label="Rainfall (mm)"
              type="number"
              step="0.1"
              value={form.rainfall}
              onChange={(event) => update("rainfall", event.target.value)}
              placeholder="e.g. 100"
            />
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button
              type="submit"
              disabled={
                loadingReports || loadingRecommendation || reports.length === 0
              }
            >
              {loadingRecommendation ? "Recommending..." : "Recommend Crop"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={resetForm}
              disabled={loadingRecommendation}
            >
              Reset
            </Button>
          </div>
        </Card>

        {/* Result */}
        <div>
          {loadingRecommendation ? (
            <Card className="flex min-h-64 items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mist">
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-forest-800" />
                </div>

                <h3 className="mt-4 font-semibold text-stone-900">
                  Getting crop recommendation...
                </h3>

                <p className="mt-2 text-sm text-stone-500">
                  Sending your soil and environmental data to the AI
                  recommendation service.
                </p>
              </div>
            </Card>
          ) : !result ? (
            <Card className="flex min-h-64 items-center justify-center text-center">
              <div>
                <h3 className="font-semibold text-stone-900">
                  Ready for recommendation
                </h3>

                <p className="mt-2 max-w-sm text-sm text-stone-500">
                  Select a soil report and enter the environmental conditions to
                  generate a crop recommendation.
                </p>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-stone-900">
                  AI Recommendation
                </h3>

                <Badge>Live result</Badge>
              </div>

              <p className="mt-4 text-3xl font-bold text-forest-800">
                {result.crop_name || "Crop not available"}
              </p>

              <p className="mt-1 text-sm text-stone-500">
                {result.season || "Season not available"}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-stone-500">Confidence</dt>

                  <dd className="font-semibold">
                    {result.confidence_score != null
                      ? `${result.confidence_score}%`
                      : "N/A"}
                  </dd>
                </div>

                <div>
                  <dt className="text-stone-500">Expected yield</dt>

                  <dd className="font-semibold">
                    {result.expected_yield != null
                      ? `${result.expected_yield} tons/acre`
                      : "N/A"}
                  </dd>
                </div>

                <div>
                  <dt className="text-stone-500">Water requirement</dt>

                  <dd className="font-semibold">
                    {result.water_requirement || "N/A"}
                  </dd>
                </div>

                <div>
                  <dt className="text-stone-500">Growth duration</dt>

                  <dd className="font-semibold">
                    {result.growth_duration_days != null
                      ? `${result.growth_duration_days} days`
                      : "N/A"}
                  </dd>
                </div>
              </dl>

              {result.recommendation_reason ? (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-stone-800">
                    Why this crop?
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {result.recommendation_reason}
                  </p>
                </div>
              ) : null}

              <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-forest-900">
                Recommendation generated successfully using your saved soil
                report and environmental conditions.
              </div>

              <Disclaimer />
            </Card>
          )}
        </div>
      </form>
    </div>
  );
}
