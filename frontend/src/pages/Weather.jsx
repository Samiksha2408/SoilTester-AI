import {
  CloudRain,
  Droplets,
  Gauge,
  MapPin,
  Thermometer,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import { getWeather } from "../services/api";

function sortByLatest(records) {
  if (!Array.isArray(records)) {
    return [];
  }

  return [...records].sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() -
      new Date(a.created_at || 0).getTime(),
  );
}

export default function Weather() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadWeather() {
    setLoading(true);
    setError("");

    try {
      const data = await getWeather();

      setRecords(sortByLatest(data));
    } catch (err) {
      console.error("Weather loading error:", err);
      setError(err.message || "Failed to load weather records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function fetchWeather() {
      try {
        setLoading(true);
        setError("");

        const data = await getWeather();

        if (!ignore) {
          setRecords(sortByLatest(data));
        }
      } catch (err) {
        if (!ignore) {
          console.error("Weather loading error:", err);
          setError(err.message || "Failed to load weather records.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      ignore = true;
    };
  }, []);

  const current = records[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Weather</h2>

          <p className="mt-1 text-stone-500">
            View weather conditions and predictions from the SmartAgriAI weather
            service.
          </p>
        </div>

        <button
          type="button"
          onClick={loadWeather}
          disabled={loading}
          className="w-fit rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        <Card className="flex min-h-64 items-center justify-center text-center">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mist">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-forest-800" />
            </div>

            <h3 className="mt-4 font-semibold text-stone-900">
              Loading weather...
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Fetching weather information from the server.
            </p>
          </div>
        </Card>
      ) : error ? (
        <Card className="flex min-h-64 items-center justify-center text-center">
          <div>
            <h3 className="font-semibold text-red-600">
              Unable to load weather
            </h3>

            <p className="mt-2 text-sm text-stone-500">{error}</p>

            <button
              type="button"
              onClick={loadWeather}
              className="mt-4 rounded-xl bg-forest-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-forest-900"
            >
              Try Again
            </button>
          </div>
        </Card>
      ) : records.length === 0 ? (
        <Card className="flex min-h-64 items-center justify-center text-center">
          <div>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-forest-800">
              <CloudRain className="h-7 w-7" />
            </div>

            <h3 className="mt-4 font-semibold text-stone-900">
              No weather records yet
            </h3>

            <p className="mt-2 max-w-md text-sm text-stone-500">
              There are currently no weather records available from the backend.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="bg-gradient-to-br from-forest-900 to-forest-800 text-white">
              <p className="flex items-center gap-2 text-sm text-emerald-100">
                <MapPin className="h-4 w-4" />
                {current.location || "Location unavailable"}
              </p>

              <p className="mt-6 text-6xl font-extrabold tracking-tight">
                {current.temperature ?? "N/A"}°
              </p>

              <p className="mt-1 text-lg text-emerald-100">
                {current.weather_condition || "Condition unavailable"}
              </p>

              <p className="mt-2 text-sm text-emerald-200/80">
                {current.district || ""}
                {current.district && current.state ? ", " : ""}
                {current.state || ""}
              </p>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <Droplets className="mb-3 h-5 w-5 text-forest-700" />

                <p className="text-xs text-stone-500">Humidity</p>

                <p className="text-xl font-bold">
                  {current.humidity != null ? `${current.humidity}%` : "N/A"}
                </p>
              </Card>

              <Card>
                <CloudRain className="mb-3 h-5 w-5 text-forest-700" />

                <p className="text-xs text-stone-500">Rainfall</p>

                <p className="text-xl font-bold">
                  {current.rainfall != null ? `${current.rainfall} mm` : "N/A"}
                </p>
              </Card>

              <Card>
                <Wind className="mb-3 h-5 w-5 text-forest-700" />

                <p className="text-xs text-stone-500">Wind speed</p>

                <p className="text-xl font-bold">
                  {current.wind_speed != null
                    ? `${current.wind_speed} km/h`
                    : "N/A"}
                </p>
              </Card>

              <Card>
                <Gauge className="mb-3 h-5 w-5 text-forest-700" />

                <p className="text-xs text-stone-500">Pressure</p>

                <p className="text-xl font-bold">
                  {current.pressure != null ? current.pressure : "N/A"}
                </p>
              </Card>
            </div>
          </div>

          {current.prediction ? (
            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-forest-800">
                  <Thermometer className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-stone-900">
                    Weather Prediction
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-stone-600">
                    {current.prediction}
                  </p>
                </div>
              </div>
            </Card>
          ) : null}

          {records.length > 1 ? (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-stone-900">
                Weather Records
              </h3>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {records.slice(1).map((record) => (
                  <Card key={record.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-stone-900">
                          {record.location || "Unknown location"}
                        </p>

                        <p className="mt-1 text-xs text-stone-400">
                          {record.district || ""}
                          {record.district && record.state ? ", " : ""}
                          {record.state || ""}
                        </p>
                      </div>

                      <CloudRain className="h-5 w-5 text-forest-700" />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-stone-500">Temperature</p>
                        <p className="font-semibold">
                          {record.temperature ?? "N/A"}°
                        </p>
                      </div>

                      <div>
                        <p className="text-stone-500">Humidity</p>
                        <p className="font-semibold">
                          {record.humidity != null
                            ? `${record.humidity}%`
                            : "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-stone-500">Rainfall</p>
                        <p className="font-semibold">
                          {record.rainfall != null
                            ? `${record.rainfall} mm`
                            : "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-stone-500">Wind</p>
                        <p className="font-semibold">
                          {record.wind_speed != null
                            ? `${record.wind_speed} km/h`
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    {record.weather_condition ? (
                      <p className="mt-4 text-sm text-stone-600">
                        {record.weather_condition}
                      </p>
                    ) : null}
                  </Card>
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
