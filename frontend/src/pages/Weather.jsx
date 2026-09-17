import {
  CloudRain,
  Droplets,
  Gauge,
  MapPin,
  Search,
  Thermometer,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import { getWeatherDashboard } from "../services/api";

function safeText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => safeText(item)).join(", ");
  }

  if (typeof value === "object") {
    if (value.prediction !== undefined) {
      return safeText(value.prediction);
    }

    if (value.message !== undefined) {
      return safeText(value.message);
    }

    if (value.advice !== undefined) {
      return safeText(value.advice);
    }

    if (value.reason !== undefined) {
      return safeText(value.reason);
    }

    return Object.entries(value)
      .map(([key, val]) => `${key}: ${safeText(val)}`)
      .join(" • ");
  }

  return String(value);
}

function renderCrop(crop, index) {
  if (typeof crop === "string" || typeof crop === "number") {
    return (
      <div key={`${crop}-${index}`} className="rounded-xl bg-mist p-4">
        <span className="font-semibold text-forest-800">{String(crop)}</span>
      </div>
    );
  }

  if (crop && typeof crop === "object") {
    return (
      <div
        key={`${crop.crop || "crop"}-${index}`}
        className="rounded-xl bg-mist p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold text-forest-800">
            {safeText(crop.crop) || "Recommended crop"}
          </span>

          {crop.suitability ? (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600">
              {safeText(crop.suitability)}
            </span>
          ) : null}
        </div>

        {crop.reason ? (
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            {safeText(crop.reason)}
          </p>
        ) : null}
      </div>
    );
  }

  return null;
}

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Nagpur");
  const [searchCity, setSearchCity] = useState("Nagpur");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadWeather(cityName = city) {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getWeatherDashboard(trimmedCity);

      console.log("WEATHER DASHBOARD RESPONSE:", data);

      setWeather(data);
      setCity(trimmedCity);
    } catch (err) {
      console.error("Weather loading error:", err);
      setError(err.message || "Failed to load weather information.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    loadWeather(searchCity);
  }

  useEffect(() => {
    loadWeather("Nagpur");
  }, []);

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
          onClick={() => loadWeather(city)}
          disabled={loading}
          className="w-fit rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* City Search */}
      <Card>
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label
              htmlFor="weather-city"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Enter city
            </label>

            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

              <input
                id="weather-city"
                type="text"
                value={searchCity}
                onChange={(event) => setSearchCity(event.target.value)}
                placeholder="Enter city name, e.g. Umred"
                className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-forest-600 focus:ring-1 focus:ring-forest-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !searchCity.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-forest-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-forest-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Search className="h-4 w-4" />
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </Card>

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
              onClick={() => loadWeather(searchCity)}
              className="mt-4 rounded-xl bg-forest-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-forest-900"
            >
              Try Again
            </button>
          </div>
        </Card>
      ) : !weather ? (
        <Card className="flex min-h-64 items-center justify-center text-center">
          <div>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-forest-800">
              <CloudRain className="h-7 w-7" />
            </div>

            <h3 className="mt-4 font-semibold text-stone-900">
              No weather information available
            </h3>

            <p className="mt-2 max-w-md text-sm text-stone-500">
              There is currently no weather information available from the
              backend.
            </p>
          </div>
        </Card>
      ) : (
        <>
          {/* Main weather */}
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="bg-gradient-to-br from-forest-900 to-forest-800 text-white">
              <p className="flex items-center gap-2 text-sm text-emerald-100">
                <MapPin className="h-4 w-4" />
                {safeText(weather.location) || city}
              </p>

              <p className="mt-6 text-6xl font-extrabold tracking-tight">
                {safeText(weather.weather?.temperature) || "N/A"}°
              </p>

              <p className="mt-1 text-lg text-emerald-100">
                {safeText(weather.weather?.condition) ||
                  "Condition unavailable"}
              </p>

              <p className="mt-2 text-sm text-emerald-200/80">
                {safeText(weather.location) || city}
              </p>
            </Card>

            {/* Weather metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <Droplets className="mb-3 h-5 w-5 text-forest-700" />

                <p className="text-xs text-stone-500">Humidity</p>

                <p className="text-xl font-bold">
                  {weather.weather?.humidity != null
                    ? `${safeText(weather.weather.humidity)}%`
                    : "N/A"}
                </p>
              </Card>

              <Card>
                <CloudRain className="mb-3 h-5 w-5 text-forest-700" />

                <p className="text-xs text-stone-500">Rainfall</p>

                <p className="text-xl font-bold">
                  {weather.weather?.rainfall != null
                    ? `${safeText(weather.weather.rainfall)} mm`
                    : "N/A"}
                </p>
              </Card>

              <Card>
                <Wind className="mb-3 h-5 w-5 text-forest-700" />

                <p className="text-xs text-stone-500">Wind speed</p>

                <p className="text-xl font-bold">
                  {weather.weather?.wind_speed != null
                    ? `${safeText(weather.weather.wind_speed)} km/h`
                    : "N/A"}
                </p>
              </Card>

              <Card>
                <Gauge className="mb-3 h-5 w-5 text-forest-700" />

                <p className="text-xs text-stone-500">Pressure</p>

                <p className="text-xl font-bold">
                  {safeText(weather.weather?.pressure) || "N/A"}
                </p>
              </Card>
            </div>
          </div>

          {/* Weather prediction */}
          {weather.ml_prediction ? (
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
                    {safeText(weather.ml_prediction)}
                  </p>
                </div>
              </div>
            </Card>
          ) : null}

          {/* Recommended crops */}
          {Array.isArray(weather.recommended_crops) &&
          weather.recommended_crops.length > 0 ? (
            <Card>
              <h3 className="font-semibold text-stone-900">
                Recommended Crops
              </h3>

              <div className="mt-4 space-y-3">
                {weather.recommended_crops.map((crop, index) =>
                  renderCrop(crop, index),
                )}
              </div>
            </Card>
          ) : null}

          {/* Alerts */}
          {weather.alerts ? (
            <Card>
              <h3 className="font-semibold text-stone-900">Weather Alerts</h3>

              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {safeText(weather.alerts)}
              </p>
            </Card>
          ) : null}

          {/* Irrigation */}
          {weather.irrigation ? (
            <Card>
              <h3 className="font-semibold text-stone-900">
                Irrigation Advice
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {safeText(weather.irrigation)}
              </p>
            </Card>
          ) : null}

          {/* Farmer advice */}
          {weather.farmer_advice ? (
            <Card>
              <h3 className="font-semibold text-stone-900">Farmer Advice</h3>

              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {safeText(weather.farmer_advice)}
              </p>
            </Card>
          ) : null}
        </>
      )}
    </div>
  );
}
