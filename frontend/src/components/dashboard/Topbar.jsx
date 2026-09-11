import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const pages = [
  {
    name: "Dashboard",
    path: "/dashboard",
    keywords: "dashboard home overview",
  },
  {
    name: "Crop Recommendation",
    path: "/crop-recommendation",
    keywords: "crop recommendation crops",
  },
  {
    name: "Weather",
    path: "/weather",
    keywords: "weather temperature rainfall forecast",
  },
  {
    name: "Fertilizer Plan",
    path: "/fertilizer-plan",
    keywords: "fertilizer fertilizer plan nutrients",
  },
  {
    name: "Reports",
    path: "/reports",
    keywords: "reports soil report analysis",
  },
  {
    name: "AI Assistant",
    path: "/ai-assistant",
    keywords: "ai assistant chatbot agriculture",
  },
  {
    name: "Settings",
    path: "/settings",
    keywords: "settings profile preferences",
  },
];

const titles = {
  "/dashboard": "Dashboard",
  "/crop-recommendation": "Crop Recommendation",
  "/weather": "Weather",
  "/fertilizer-plan": "Fertilizer Plan",
  "/reports": "Reports",
  "/ai-assistant": "AI Assistant",
  "/settings": "Settings",
};

export default function Topbar({ onMenu }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { profile } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  const title = titles[pathname] || "SmartAgriAI";

  const fullName = profile?.full_name || "Farmer";
  const firstLetter = fullName.charAt(0).toUpperCase();

  const filteredPages =
    search.trim().length === 0
      ? []
      : pages.filter((page) => {
          const query = search.toLowerCase().trim();

          return (
            page.name.toLowerCase().includes(query) ||
            page.keywords.toLowerCase().includes(query)
          );
        });

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setSearchOpen(true);
  }

  function handlePageSelect(path) {
    navigate(path);
    setSearch("");
    setSearchOpen(false);
  }

  function handleSearchKeyDown(event) {
    if (event.key === "Escape") {
      setSearch("");
      setSearchOpen(false);
      return;
    }

    if (event.key === "Enter" && filteredPages.length > 0) {
      handlePageSelect(filteredPages[0].path);
    }
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-stone-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      {/* Left: menu + page title */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200 lg:hidden"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-stone-900 sm:text-lg">
            {title}
          </h1>

          <p className="hidden truncate text-xs text-stone-500 sm:block">
            Farm intelligence workspace
          </p>
        </div>
      </div>

      {/* Right: search + notifications + profile */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Search */}
        <div ref={searchRef} className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            onFocus={() => {
              if (search.trim()) {
                setSearchOpen(true);
              }
            }}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search pages"
            aria-label="Search pages"
            className="w-52 rounded-xl border border-stone-200 bg-mist py-2 pl-9 pr-9 text-sm outline-none transition focus:border-forest-600 focus:bg-white lg:w-64"
          />

          {search ? (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSearchOpen(false);
              }}
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}

          {searchOpen && search.trim() ? (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-lg">
              {filteredPages.length > 0 ? (
                <div>
                  <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-stone-400">
                    Pages
                  </p>

                  {filteredPages.map((page) => (
                    <button
                      key={page.path}
                      type="button"
                      onClick={() => handlePageSelect(page.path)}
                      className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-stone-700 hover:bg-mist hover:text-forest-800"
                    >
                      <Search className="mr-2.5 h-4 w-4 text-stone-400" />
                      {page.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-4 text-center">
                  <p className="text-sm font-medium text-stone-700">
                    No pages found
                  </p>

                  <p className="mt-1 text-xs text-stone-400">
                    Try reports, weather, crop or settings.
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 transition hover:bg-stone-50"
            onClick={() => setNotificationsOpen((current) => !current)}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell className="h-4 w-4" />
          </button>

          {notificationsOpen ? (
            <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg">
              <div className="border-b border-stone-100 px-4 py-3">
                <p className="text-sm font-semibold text-stone-900">
                  Notifications
                </p>

                <p className="mt-0.5 text-xs text-stone-500">
                  Your latest SmartAgriAI alerts
                </p>
              </div>

              <div className="px-4 py-8 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100">
                  <Bell className="h-4 w-4 text-stone-400" />
                </div>

                <p className="text-sm font-medium text-stone-700">
                  No new notifications
                </p>

                <p className="mt-1 text-xs text-stone-400">
                  You&apos;re all caught up.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* User profile */}
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-stone-200 py-1.5 pl-1.5 pr-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-800 text-xs font-bold text-white">
            {firstLetter}
          </span>

          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-xs font-semibold text-stone-800">
              {fullName}
            </span>

            <span className="block truncate text-[11px] capitalize text-stone-500">
              {profile?.role || ""}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
