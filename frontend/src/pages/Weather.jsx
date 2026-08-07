function Weather() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">🌤 Weather Dashboard</h1>

        {/* Hero Weather Card */}

        <div className="bg-gradient-to-r from-sky-500 to-cyan-400 rounded-3xl shadow-xl text-white p-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl opacity-90">Nagpur, Maharashtra</p>

              <h2 className="text-6xl font-bold mt-3">29°C</h2>

              <p className="text-2xl mt-3">☀️ Sunny</p>

              <p className="mt-2 opacity-90">Feels like 31°C</p>
            </div>

            <div className="text-7xl">☀️</div>
          </div>
        </div>

        {/* Weather Metrics */}

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
            <div className="text-4xl">💧</div>

            <p className="text-gray-500 mt-3">Humidity</p>

            <h2 className="text-3xl font-bold mt-2">68%</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
            <div className="text-4xl">🌧</div>

            <p className="text-gray-500 mt-3">Rain Chance</p>

            <h2 className="text-3xl font-bold mt-2">20%</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
            <div className="text-4xl">💨</div>

            <p className="text-gray-500 mt-3">Wind Speed</p>

            <h2 className="text-3xl font-bold mt-2">14 km/h</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
            <div className="text-4xl">☀️</div>

            <p className="text-gray-500 mt-3">UV Index</p>

            <h2 className="text-3xl font-bold mt-2">Moderate</h2>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">📅 5-Day Forecast</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <p className="font-semibold">Saturday</p>
              <p className="text-3xl">☀️</p>
              <p className="font-bold text-xl">30°C</p>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <p className="font-semibold">Sunday</p>
              <p className="text-3xl">🌧</p>
              <p className="font-bold text-xl">27°C</p>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <p className="font-semibold">Monday</p>
              <p className="text-3xl">⛅</p>
              <p className="font-bold text-xl">29°C</p>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <p className="font-semibold">Tuesday</p>
              <p className="text-3xl">🌤</p>
              <p className="font-bold text-xl">31°C</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-semibold">Wednesday</p>
              <p className="text-3xl">🌦</p>
              <p className="font-bold text-xl">28°C</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-3xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            🤖 AI Farming Advisory
          </h2>

          <p className="text-gray-700 leading-8">
            Weather conditions are favorable for cotton cultivation over the
            next five days. Rain probability remains low, making this a suitable
            period for fertilizer application and irrigation planning.
          </p>

          <div className="mt-5 bg-green-600 text-white rounded-xl p-4 font-semibold">
            ✅ Recommendation: Apply NPK fertilizer within the next 48 hours for
            optimal crop growth.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
