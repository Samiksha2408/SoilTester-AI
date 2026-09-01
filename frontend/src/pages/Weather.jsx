import { CloudRain, Droplets, MapPin, Thermometer, Wind } from "lucide-react"
import Card from "../components/ui/Card"
import { weatherData } from "../data/mockData"

export default function Weather() {
  const { current, forecast, location } = weatherData

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Weather</h2>
        <p className="mt-1 text-stone-500">
          Demo forecast for planning irrigation and top-dressing. Replace `weatherData` or `getWeather()` later.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="bg-gradient-to-br from-forest-900 to-forest-800 text-white">
          <p className="flex items-center gap-2 text-sm text-emerald-100">
            <MapPin className="h-4 w-4" />
            {location}
          </p>
          <p className="mt-6 text-6xl font-extrabold tracking-tight">{current.temperatureC}°</p>
          <p className="mt-1 text-lg text-emerald-100">{current.condition}</p>
          <p className="mt-2 text-sm text-emerald-200/80">Feels like {current.feelsLikeC}°C · Demo dataset</p>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <Droplets className="mb-3 h-5 w-5 text-forest-700" />
            <p className="text-xs text-stone-500">Humidity</p>
            <p className="text-xl font-bold">{current.humidity}%</p>
          </Card>
          <Card>
            <CloudRain className="mb-3 h-5 w-5 text-forest-700" />
            <p className="text-xs text-stone-500">Rain probability</p>
            <p className="text-xl font-bold">{current.rainProbability}%</p>
          </Card>
          <Card>
            <Wind className="mb-3 h-5 w-5 text-forest-700" />
            <p className="text-xs text-stone-500">Wind speed</p>
            <p className="text-xl font-bold">{current.windKmh} km/h</p>
          </Card>
          <Card>
            <Thermometer className="mb-3 h-5 w-5 text-forest-700" />
            <p className="text-xs text-stone-500">Location</p>
            <p className="text-sm font-bold leading-snug">{location}</p>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">5-Day Forecast</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {forecast.map((day) => (
            <Card key={day.date} className="text-center">
              <p className="font-semibold text-stone-900">{day.day}</p>
              <p className="text-xs text-stone-400">{day.date}</p>
              <p className="mt-3 text-2xl font-bold text-forest-800">{day.high}°</p>
              <p className="text-xs text-stone-500">Low {day.low}°</p>
              <p className="mt-2 text-sm text-stone-600">{day.condition}</p>
              <p className="mt-1 text-xs text-stone-400">Rain {day.rain}%</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
