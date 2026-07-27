function RecentReports() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Recent Soil Reports</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Report ID</th>
            <th>Crop</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="py-3">#1001</td>
            <td>Wheat</td>
            <td>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Healthy
              </span>
            </td>
            <td>25 Jul 2026</td>
          </tr>

          <tr className="border-b">
            <td className="py-3">#1002</td>
            <td>Rice</td>
            <td>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                Moderate
              </span>
            </td>
            <td>24 Jul 2026</td>
          </tr>

          <tr>
            <td className="py-3">#1003</td>
            <td>Cotton</td>
            <td>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                Poor
              </span>
            </td>
            <td>23 Jul 2026</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RecentReports;
