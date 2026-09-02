import { createContext, useContext, useMemo, useState } from "react";

import { demoUser } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const [profile, setProfile] = useState(demoUser);

  const [notificationsOn, setNotificationsOn] = useState({
    weather: true,
    reports: true,
    tips: false,
  });

  // Authentication
  const [token, setToken] = useState(
    () => localStorage.getItem("access_token") || null,
  );

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
