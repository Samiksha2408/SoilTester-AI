import { createContext, useContext, useMemo, useState, useEffect } from "react";

import { getCurrentUser } from "../services/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const [profile, setProfile] = useState({
    name: "Loading...",
    role: "",
    farmName: "",
    location: "",
    fieldSizeAcres: 0,
  });

  const [notificationsOn, setNotificationsOn] = useState({
    weather: true,
    reports: true,
    tips: false,
  });

  // Authentication
  const [token, setToken] = useState(
    () => localStorage.getItem("access_token") || null,
  );
  useEffect(() => {
    if (!token) return;

    getCurrentUser()
      .then((user) => {
        console.log("CURRENT USER FROM BACKEND:", user);

        setProfile({
          name: user.full_name,
          email: user.email,
          role: user.role,
          farmName: user.farm_name || "",
          location: user.address || "",
          fieldSizeAcres: user.field_size_acres || 0,
        });
      })
      .catch((error) => {
        console.error("Failed to load user profile:", error);
      });
  }, [token]);

  function login(accessToken) {
    localStorage.setItem("access_token", accessToken);
    setToken(accessToken);
  }

  function logout() {
    localStorage.removeItem("access_token");
    setToken(null);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,

      profile,
      setProfile,

      notificationsOn,
      setNotificationsOn,

      // Authentication
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [language, profile, notificationsOn, token],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }

  return ctx;
}
