import { Inbox, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { createSoilReport, getReports } from "../services/api";

const filters = ["All", "Soil analysis"];

const initialForm = {
  report_name: "",
  soil_type: "",
  ph: "",
  nitrogen: "",
  phosphorus: "",
  potassium: "",
  organic_carbon: "",
  electrical_conductivity: "",
  moisture: "",
};

export default function Reports() {
  const [filter, setFilter] = useState("All");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    setLoading(true);
    setError("");

    try {
      const data = await getReports();
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaveError("");
    setSuccessMessage("");

    if (!form.report_name.trim()) {
      setSaveError("Please enter a report name.");
      return;
    }

    if (!form.soil_type.trim()) {
      setSaveError("Please enter the soil type.");
      return;
    }

    const payload = {
      report_name: form.report_name.trim(),
      soil_type: form.soil_type.trim(),
      ph: Number(form.ph),
      nitrogen: Number(form.nitrogen),
      phosphorus: Number(form.phosphorus),
      potassium: Number(form.potassium),
      organic_carbon: Number(form.organic_carbon),
      electrical_conductivity: Number(form.electrical_conductivity),
      moisture: Number(form.moisture),
    };

    const numericFields = [
      ["pH", payload.ph],
      ["Nitrogen", payload.nitrogen],
      ["Phosphorus", payload.phosphorus],
      ["Potassium", payload.potassium],
      ["Organic carbon", payload.organic_carbon],
      ["Electrical conductivity", payload.electrical_conductivity],
      ["Moisture", payload.moisture],
    ];

    const invalidField = numericFields.find(
      ([, value]) => !Number.isFinite(value),
    );

    if (invalidField) {
      setSaveError(`Please enter a valid value for ${invalidField[0]}.`);
      return;
    }

    setSaving(true);

    try {
      const createdReport = await createSoilReport(payload);

      setReports((current) => [createdReport, ...current]);
      setForm(initialForm);
      setShowForm(false);
      setSuccessMessage("Soil report created successfully.");

      // Refresh from backend so the list always matches the database.
      await loadReports();
    } catch (err) {
      setSaveError(err.message || "Failed to create soil report");
    } finally {
      setSaving(false);
    }
  }

  const rows = useMemo(() => {
    if (filter === "All") {
      return reports;
    }

    return reports.filter(
      (row) => row.soil_type != null && row.soil_type !== "",
    );
  }, [filter, reports]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Reports</h2>

          <p className="mt-1 text-stone-500">
            Create and manage your soil reports.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => {
            setShowForm((current) => !current);
            setSaveError("");
            setSuccessMessage("");
          }}
        >
          {showForm ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Close
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              New Report
            </>
          )}
        </Button>
      </div>

      {/* Success message */}
      {successMessage ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      ) : null}

      {/* Create report form */}
      {showForm ? (
        <Card>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-stone-900">
              Create Soil Report
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              Enter the soil test values to save a report to your account.
            </p>
          </div>

          {saveError ? (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {saveError}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic information */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-stone-800">
                Basic Information
              </h4>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="report_name"
                    className="mb-1.5 block text-sm font-medium text-stone-700"
                  >
                    Report Name
                  </label>

                  <input
                    id="report_name"
                    name="report_name"
                    type="text"
                    value={form.report_name}
                    onChange={handleChange}
                    placeholder="e.g. Farm Soil Test"
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-forest-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="soil_type"
                    className="mb-1.5 block text-sm font-medium text-stone-700"
                  >
                    Soil Type
                  </label>

                  <input
                    id="soil_type"
                    name="soil_type"
                    type="text"
                    value={form.soil_type}
                    onChange={handleChange}
                    placeholder="e.g. Black Soil"
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-forest-600"
                  />
                </div>
              </div>
            </div>

            {/* Soil values */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-stone-800">
                Soil Parameters
              </h4>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InputField
                  label="pH"
                  name="ph"
                  value={form.ph}
                  onChange={handleChange}
                  placeholder="e.g. 6.5"
                  step="0.01"
                />

                <InputField
                  label="Nitrogen"
                  name="nitrogen"
                  value={form.nitrogen}
                  onChange={handleChange}
                  placeholder="e.g. 40"
                  step="0.01"
                />

                <InputField
                  label="Phosphorus"
                  name="phosphorus"
                  value={form.phosphorus}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  step="0.01"
                />

                <InputField
                  label="Potassium"
                  name="potassium"
                  value={form.potassium}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  step="0.01"
                />

                <InputField
                  label="Organic Carbon"
                  name="organic_carbon"
                  value={form.organic_carbon}
                  onChange={handleChange}
                  placeholder="e.g. 0.75"
                  step="0.01"
                />

                <InputField
                  label="Electrical Conductivity"
                  name="electrical_conductivity"
                  value={form.electrical_conductivity}
                  onChange={handleChange}
                  placeholder="e.g. 1.2"
                  step="0.01"
                />

                <InputField
                  label="Moisture"
                  name="moisture"
                  value={form.moisture}
                  onChange={handleChange}
                  placeholder="e.g. 35"
                  step="0.01"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-stone-100 pt-5">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setSaveError("");
                }}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Report"}
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              filter === item
                ? "bg-forest-800 text-white"
                : "bg-white text-stone-600 ring-1 ring-stone-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Reports */}
      {loading ? (
        <Card className="flex flex-col items-center py-16 text-center">
          <h3 className="text-lg font-semibold">Loading reports...</h3>

          <p className="mt-2 text-sm text-stone-500">
            Fetching your reports from the server.
          </p>
        </Card>
      ) : error ? (
        <Card className="flex flex-col items-center py-16 text-center">
          <h3 className="text-lg font-semibold text-red-600">
            Unable to load reports
          </h3>

          <p className="mt-2 text-sm text-stone-500">{error}</p>

          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={loadReports}
          >
            Try Again
          </Button>
        </Card>
      ) : rows.length === 0 ? (
        <Card className="flex flex-col items-center py-16 text-center">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-forest-800">
            <Inbox className="h-7 w-7" />
          </span>

          <h3 className="text-lg font-semibold">No reports yet</h3>

          <p className="mt-2 max-w-md text-sm text-stone-500">
            Create your first soil report using the New Report button above.
          </p>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-wide text-stone-500">
                <tr>
                  <th className="px-6 py-3">Report</th>
                  <th className="px-4 py-3">Soil Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">pH</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-stone-100">
                    <td className="px-6 py-4">
                      <p className="font-medium text-stone-800">
                        {row.report_name}
                      </p>

                      <p className="text-xs text-stone-400">Report #{row.id}</p>
                    </td>

                    <td className="px-4 py-4 text-stone-600">
                      {row.soil_type || "Not specified"}
                    </td>

                    <td className="px-4 py-4 text-stone-600">
                      {row.created_at
                        ? new Date(row.created_at).toLocaleDateString()
                        : "Not available"}
                    </td>

                    <td className="px-4 py-4">
                      <Badge>{row.ph != null ? row.ph : "N/A"}</Badge>
                    </td>

                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled
                        title="PDF export will be available soon"
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
  );
}

function InputField({ label, name, value, onChange, placeholder, step }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-stone-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="number"
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-forest-600"
      />
    </div>
  );
}
