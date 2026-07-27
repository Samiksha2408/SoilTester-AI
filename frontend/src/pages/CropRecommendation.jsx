import { useState } from "react";
function CropRecommendation() {
  const [soilType, setSoilType] = useState("");
  const [fieldSize, setFieldSize] = useState("");
  const [season, setSeason] = useState("");
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
            if (!soilType || !fieldSize || !season) {
              alert("Please fill all the fields.");
              return;
            }

            console.log("Soil Type:", soilType);
            console.log("Field Size:", fieldSize);
            console.log("Season:", season);

            alert("Crop recommendation generated successfully!");
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          Recommend Crop
        </button>
      </div>
    </div>
  );
}

export default CropRecommendation;
