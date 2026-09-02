import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/dashboard/AppLayout";
import { AppProvider, useApp } from "./context/AppContext";

import AIAssistant from "./pages/AIAssistant";
import CropRecommendation from "./pages/CropRecommendation";
import Dashboard from "./pages/Dashboard";
import FertilizerPlan from "./pages/FertilizerPlan";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import SoilAnalysis from "./pages/SoilAnalysis";
import Weather from "./pages/Weather";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected application */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/soil-analysis" element={<SoilAnalysis />} />
            <Route
              path="/crop-recommendation"
              element={<CropRecommendation />}
            />
            <Route path="/weather" element={<Weather />} />
            <Route path="/fertilizer-plan" element={<FertilizerPlan />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Unknown route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
