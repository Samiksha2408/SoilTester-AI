import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatsCard from "../components/dashboard/StatsCard";

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64">
        <Topbar />

        <div className="p-8">
          <div className="grid grid-cols-2 gap-6">
            <StatsCard title="Soil Health" value="92%" color="text-green-600" />

            <StatsCard title="Weather" value="28°C" color="text-blue-600" />

            <StatsCard
              title="Recommended Crop"
              value="Wheat"
              color="text-yellow-600"
            />

            <StatsCard
              title="Estimated Cost"
              value="₹15,000"
              color="text-purple-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
