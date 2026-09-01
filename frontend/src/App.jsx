import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AppLayout from "./components/dashboard/AppLayout"
import { AppProvider } from "./context/AppContext"
import AIAssistant from "./pages/AIAssistant"
import CropRecommendation from "./pages/CropRecommendation"
import Dashboard from "./pages/Dashboard"
import FertilizerPlan from "./pages/FertilizerPlan"
import Landing from "./pages/Landing"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"
import SoilAnalysis from "./pages/SoilAnalysis"
import Weather from "./pages/Weather"

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/soil-analysis" element={<SoilAnalysis />} />
            <Route path="/crop-recommendation" element={<CropRecommendation />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/fertilizer-plan" element={<FertilizerPlan />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
