const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const token = localStorage.getItem("access_token");

  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;

    try {
      const errorData = await response.json();
      message = errorData.detail || message;
    } catch {
      // Keep default error message
    }

    throw new Error(message);
  }

  return response.json();
}

// ------------------------------------
// API status
// ------------------------------------

export function isApiConfigured() {
  return Boolean(API_BASE);
}

// ------------------------------------
// Authentication
// ------------------------------------

export function loginUser(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function registerUser(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function logoutUser() {
  return request("/auth/logout", {
    method: "POST",
  });
}

// ------------------------------------
// Soil Reports
// ------------------------------------

export function createSoilReport(payload) {
  return request("/soil-reports/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getReports() {
  return request("/soil-reports/");
}

export function getSoilReport(reportId) {
  return request(`/soil-reports/${reportId}`);
}

export function updateSoilReport(reportId, payload) {
  return request(`/soil-reports/${reportId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteSoilReport(reportId) {
  return request(`/soil-reports/${reportId}`, {
    method: "DELETE",
  });
}

// ------------------------------------
// Existing feature hooks
// ------------------------------------

export function analyzeSoil(payload) {
  return request("/soil/analyze", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function recommendCrop(payload) {
  return request("/crop-recommendation", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getWeather(payload) {
  const query = payload?.location
    ? `?location=${encodeURIComponent(payload.location)}`
    : "";

  return request(`/weather${query}`);
}

export function getFertilizerPlan(payload) {
  return request("/fertilizer-recommendation", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function sendAIMessage(payload) {
  return request("/chatbot", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
