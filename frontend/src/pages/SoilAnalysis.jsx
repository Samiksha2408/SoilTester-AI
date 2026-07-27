import { useState } from "react";
function SoilAnalysis() {
  const [file, setFile] = useState(null);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Soil Analysis</h1>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">Upload Soil Report</h2>

        <label className="border-2 border-dashed border-green-400 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition">
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <p className="text-5xl">📄</p>

          <h3 className="text-xl font-semibold mt-4">Upload Soil Report</h3>

          <p className="text-gray-500 mt-2">
            Click here to upload a PDF or Image
          </p>
        </label>
        {file && (
          <p className="mt-4 text-green-700 font-medium">
            Selected File: {file.name}
          </p>
        )}

        <button
          onClick={() => {
            if (!file) {
              alert("Please upload a soil report first.");
              return;
            }

            alert("Soil report uploaded successfully!");
          }}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          Analyze Soil
        </button>
      </div>
    </div>
  );
}

export default SoilAnalysis;
