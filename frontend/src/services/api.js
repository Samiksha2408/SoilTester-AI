/**
 * Future backend hooks for SmartAgriAI.
 * Leave VITE_API_BASE_URL unset until the team API is ready.
 * UI pages currently render from src/data/mockData.js — these
 * functions must not be treated as successful live calls.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || ""

async function request(path, options = {}) {
  if (!API_BASE) {
    return {
      connected: false,
      message: "Backend API is not configured yet.",
    }
  }

  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json()
}

export function isApiConfigured() {
  return Boolean(API_BASE)
}

export function analyzeSoil(payload) {
  return request("/soil/analyze", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function recommendCrop(payload) {
  return request("/crops/recommend", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function getWeather(payload) {
  const query = payload?.location ? `?location=${encodeURIComponent(payload.location)}` : ""
  return request(`/weather${query}`)
}

export function getFertilizerPlan(payload) {
  return request("/fertilizer/plan", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function getReports() {
  return request("/reports")
}

export function sendAIMessage(payload) {
  return request("/ai/chat", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
