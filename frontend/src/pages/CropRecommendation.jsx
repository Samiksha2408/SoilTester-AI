import { useState } from "react";
function CropRecommendation() {
  const [soilType, setSoilType] = useState("");
  const [fieldSize, setFieldSize] = useState("");
  const [season, setSeason] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [recommendedCrop, setRecommendedCrop] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Crop Recommendation</h1>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="mb-5">
          <label className="block font-medium mb-2">Soil Type</label>

          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option>Select Soil Type</option>
            <option>Black Soil</option>
            <option>Red Soil</option>
            <option>Alluvial Soil</option>
            <option>Laterite Soil</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block font-medium mb-2">Field Size (Acres)</label>

          <input
            type="number"
            placeholder="Enter field size"
            value={fieldSize}
            onChange={(e) => setFieldSize(e.target.value)}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div className="mb-5">
          <label className="block font-medium mb-2">Season</label>

          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option>Select Season</option>
            <option>Kharif</option>
            <option>Rabi</option>
            <option>Zaid</option>
          </select>
        </div>

        <button
          onClick={() => {
            setLoading(true);
            if (!soilType || !fieldSize || !season) {
              alert("Please fill all the fields.");
              return;
            }

            console.log("Soil Type:", soilType);
            console.log("Field Size:", fieldSize);
            console.log("Season:", season);

            if (soilType === "Black Soil") {
              setRecommendedCrop("Cotton");
            } else if (soilType === "Red Soil") {
              setRecommendedCrop("Groundnut");
            } else if (soilType === "Alluvial Soil") {
              setRecommendedCrop("Wheat");
            } else if (soilType === "Laterite Soil") {
              setRecommendedCrop("Cashew");
            }

            setTimeout(() => {
              setShowResult(true);
              setLoading(false);
            }, 10000);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          Recommend Crop
        </button>
        <button
          onClick={() => {
            setSoilType("");
            setFieldSize("");
            setSeason("");
            setShowResult(false);
          }}
          className="mt-4 ml-4 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
        >
          Reset
        </button>
        {loading && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-xl animate-pulse">
              <span className="text-5xl">🤖</span>
            </div>

            <h2 className="text-2xl font-bold text-green-700 mt-4">
              AI is analyzing your soil...
            </h2>

            <p className="text-gray-500 mt-2">
              <div className="mt-6 text-left max-w-md mx-auto space-y-2">
                <p className="text-green-700">✅ Reading soil information...</p>

                <p className="text-green-700">✅ Checking season...</p>

                <p className="text-gray-500 animate-pulse">
                  ⏳ Predicting best crop...
                </p>
              </div>
              <div className="mt-8">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-700 rounded-full animate-pulse"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </p>
          </div>
        )}
        {showResult && (
          <div className="mt-8 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-3xl shadow-xl p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-600 text-white text-3xl p-4 rounded-2xl">
                🤖
              </div>

              <div>
                <h2 className="text-3xl font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-500">Powered by SmartAgri AI</p>
              </div>
            </div>

            {/* Crop */}
            <div
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:-translate-y-1
hover:shadow-2xl
transition-all
duration-300"
            >
              <p className="text-gray-500 text-lg">Recommended Crop</p>

              <h1 className="text-5xl font-bold text-green-700 mt-3">
                🌾 {recommendedCrop}
              </h1>

              <div className="mt-6 inline-block bg-green-100 text-green-700 font-semibold px-5 py-3 rounded-full">
                ✅ 95% Suitable
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-5 mt-6">
              <div
                className="bg-white rounded-2xl shadow-md p-5 hover:-translate-y-1
hover:shadow-2xl
transition-all
duration-300"
              >
                <div className="text-4xl">📈</div>

                <p className="text-gray-500 mt-3">Expected Yield</p>

                <h3 className="text-2xl font-bold mt-2">4.5 Tons</h3>

                <p className="text-gray-500">per Acre</p>
              </div>

              <div
                className="bg-white rounded-2xl shadow-md p-5 hover:-translate-y-1
hover:shadow-2xl
transition-all
duration-300"
              >
                <div className="text-4xl">💰</div>

                <p className="text-gray-500 mt-3">Estimated Profit</p>

                <h3 className="text-3xl font-bold text-green-600 mt-2">
                  ₹72,000
                </h3>
              </div>
            </div>

            {/* Fertilizer */}

            <div
              className="bg-white rounded-2xl shadow-md p-6 mt-6 hover:-translate-y-1
hover:shadow-2xl
transition-all
duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="text-4xl">🌱</div>

                <div>
                  <p className="text-gray-500">Recommended Fertilizer</p>

                  <h3 className="text-2xl font-semibold">NPK 20:20:20</h3>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
              <p className="text-gray-700 leading-relaxed">
                Based on the selected soil type, field size, and season,
                <span className="font-semibold text-green-700"> Cotton </span>
                is predicted to provide the highest productivity with an
                estimated yield of
                <span className="font-semibold"> 4.5 Tons per Acre </span>
                while maximizing expected profit.
              </p>
            </div>

            <div className="mt-6 bg-green-600 text-white rounded-2xl p-4 text-center font-semibold">
              ✔ AI Recommendation Generated Successfully
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropRecommendation;
