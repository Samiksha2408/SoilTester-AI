import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Sprout,
  CloudSun,
  User,
  LogOut,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-green-700 text-white fixed left-0 top-0 p-6">
      <h1 className="text-3xl font-bold mb-12">SmartAgriAI</h1>

      <nav className="space-y-6">
        <div className="flex items-center gap-3 cursor-pointer hover:text-green-200">
          <LayoutDashboard size={22} />
          Dashboard
        </div>

        <Link
          to="/soil-analysis"
          className="flex items-center gap-3 hover:text-green-200"
        >
          <FileText size={22} />
          Soil Analysis
        </Link>

        <Link
          to="/crop-recommendation"
          className="flex items-center gap-3 hover:text-green-200"
        >
          <Sprout size={22} />
          Crop Recommendation
        </Link>

        <div className="flex items-center gap-3 cursor-pointer hover:text-green-200">
          <CloudSun size={22} />
          Weather
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-green-200">
          <User size={22} />
          Profile
        </div>
      </nav>

      <div className="absolute bottom-8 flex items-center gap-3 cursor-pointer hover:text-red-300">
        <LogOut size={22} />
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
