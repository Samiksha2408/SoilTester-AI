import {
  CloudSun,
  FileText,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Sprout,
  Wheat,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useApp } from "../../context/AppContext";
import Logo from "../ui/Logo";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/soil-analysis", label: "Soil Analysis", icon: FlaskConical },
  { to: "/crop-recommendation", label: "Crop Recommendation", icon: Wheat },
  { to: "/weather", label: "Weather", icon: CloudSun },
  { to: "/fertilizer-plan", label: "Fertilizer Plan", icon: Sprout },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/ai-assistant", label: "AI Assistant", icon: MessageSquare },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { logout } = useApp();

  function handleLogout() {
    logout();
    onClose?.();
    navigate("/");
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-stone-900/40 lg:hidden"
          aria-label="Close sidebar"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-svh w-72 max-w-[85vw] shrink-0 flex-col border-r border-stone-200 bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:max-w-none lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Logo to="/dashboard" />

          <button
            type="button"
            className="rounded-lg p-2 text-stone-500 lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-forest-800 text-white shadow-sm"
                      : "text-stone-600 hover:bg-mist hover:text-forest-900"
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-stone-100 px-3 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
