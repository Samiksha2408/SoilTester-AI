import { createContext, useContext, useMemo, useState } from "react"
import { demoUser } from "../data/mockData"

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [language, setLanguage] = useState("en")
  const [profile, setProfile] = useState(demoUser)
  const [notificationsOn, setNotificationsOn] = useState({
    weather: true,
    reports: true,
    tips: false,
  })

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      profile,
      setProfile,
      notificationsOn,
      setNotificationsOn,
    }),
    [language, profile, notificationsOn]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider")
  }
  return ctx
}
