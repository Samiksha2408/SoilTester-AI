import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Sprout,
  CloudSun,
  User,
  LogOut,
  BarChart3,
} from "lucide-react";

function Sidebar() {
  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/soil-analysis",
      label: "Soil Analysis",
      icon: FileText,
    },
    {
      to: "/crop-recommendation",
      label: "Crop Recommendation",
      icon: Sprout,
    },
    {
      to: "/weather",
      label: "Weather",
      icon: CloudSun,
    },
    {
      to: "/soil-health",
      label: "Soil Health",
      icon: BarChart3,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <div className="w-72 shrink-0 min-h-screen bg-green-700 text-white px-6 py-8 flex flex-col">
      {/* Logo */}
      <h1 className="text-4xl font-bold px-2">SmartAgriAI</h1>

      {/* Navigation */}
      <nav className="mt-12 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 w-full px-4 py-3 rounded-xl
                text-lg font-medium whitespace-nowrap transition-all
                ${
                  isActive
                    ? "bg-black/20 text-white shadow-md"
                    : "hover:bg-green-700/40 hover:text-green-100"
                }`
              }
            >
              <Icon size={24} className="shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-8">
        <button
          className="flex items-center gap-4 w-full px-4 py-3
                     rounded-xl text-lg font-medium
                     hover:bg-red-500/20 hover:text-red-200
                     transition-all"
        >
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
