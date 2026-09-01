export const demoUser = {
  name: "Aarav Patel",
  email: "aarav.demo@smartagriai.app",
  role: "Demo farmer",
  farmName: "Greenfield Demo Farm",
  location: "Nashik, Maharashtra",
  fieldSizeAcres: 4.5,
  language: "en",
}

export const languages = [
  { id: "en", label: "English" },
  { id: "hi", label: "Hindi" },
  { id: "mr", label: "Marathi" },
]

export const dashboardStats = {
  soilHealth: 82,
  recommendedCrop: "Wheat",
  estimatedYield: "4.2 tons/acre",
  estimatedCost: "₹12,500",
}

export const demoNotifications = [
  {
    id: 1,
    title: "Soil report ready",
    body: "Your latest demo soil analysis is available.",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Weather update",
    body: "Light rain is likely over the next 48 hours.",
    time: "Yesterday",
  },
]

export const soilDefaults = {
  nitrogen: 42,
  phosphorus: 18,
  potassium: 160,
  ph: 6.4,
  moisture: 21,
  organicCarbon: 0.72,
}

export const soilAnalysisResult = {
  healthScore: 82,
  condition: "Moderately healthy",
  summary:
    "Nutrient levels are generally adequate for cereal crops. Phosphorus is slightly low and should be corrected before sowing.",
  nutrients: [
    { key: "N", name: "Nitrogen", value: 42, unit: "kg/ha", status: "Adequate", percent: 70 },
    { key: "P", name: "Phosphorus", value: 18, unit: "kg/ha", status: "Low", percent: 42 },
    { key: "K", name: "Potassium", value: 160, unit: "kg/ha", status: "Adequate", percent: 78 },
    { key: "pH", name: "pH", value: 6.4, unit: "", status: "Ideal", percent: 86 },
    { key: "OC", name: "Organic carbon", value: 0.72, unit: "%", status: "Moderate", percent: 58 },
    { key: "M", name: "Moisture", value: 21, unit: "%", status: "Adequate", percent: 64 },
  ],
  recommendations: [
    "Apply a phosphorus-rich basal dose at sowing.",
    "Maintain organic matter with compost or well-rotted FYM.",
    "Split nitrogen across basal and top-dress stages.",
  ],
  warnings: [
    "Do not apply extra nitrogen if vegetative growth is already lush.",
    "This is a demo result based on sample values, not a lab certificate.",
  ],
  citations: ["ICAR soil fertility guidelines", "FAO crop nutrient notes"],
}

export const cropRecommendationResult = {
  crop: "Wheat",
  variety: "HD-2967 (illustrative)",
  suitability: 91,
  expectedYield: "4.2 tons/acre",
  estimatedProfit: "₹38,400 / acre",
  fertilizer: "DAP + Urea (split application)",
  seasonFit: "Rabi",
  summary:
    "Based on the demo soil profile, field size and rabi season, wheat is a strong match. Phosphorus correction at sowing will support tillering and grain fill.",
}

export const weatherData = {
  location: "Nashik, Maharashtra",
  current: {
    temperatureC: 28,
    condition: "Partly cloudy",
    humidity: 61,
    rainProbability: 24,
    windKmh: 12,
    feelsLikeC: 30,
  },
  forecast: [
    { day: "Wed", date: "02 Sep", high: 30, low: 22, condition: "Sunny", rain: 10 },
    { day: "Thu", date: "03 Sep", high: 29, low: 21, condition: "Cloudy", rain: 28 },
    { day: "Fri", date: "04 Sep", high: 27, low: 21, condition: "Light rain", rain: 62 },
    { day: "Sat", date: "05 Sep", high: 28, low: 20, condition: "Cloudy", rain: 35 },
    { day: "Sun", date: "06 Sep", high: 31, low: 22, condition: "Sunny", rain: 8 },
  ],
}

export const fertilizerPlanResult = {
  crop: "Wheat",
  soilCondition: "Slightly acidic, P low",
  fieldSizeHa: 1.8,
  recommendedFertilizer: "DAP, Urea, MOP",
  totalQuantityKg: 265,
  estimatedCost: "₹6,840",
  compostAlternative: "2.5 t compost + reduced DAP",
  applications: [
    {
      stage: "Basal (sowing)",
      timing: "Day 0",
      product: "DAP",
      quantity: "110 kg/ha",
      notes: "Place below seed where possible",
    },
    {
      stage: "Basal (sowing)",
      timing: "Day 0",
      product: "MOP",
      quantity: "40 kg/ha",
      notes: "Broadcast and incorporate",
    },
    {
      stage: "Top-dress 1",
      timing: "21–25 DAS",
      product: "Urea",
      quantity: "65 kg/ha",
      notes: "After first irrigation",
    },
    {
      stage: "Top-dress 2",
      timing: "40–45 DAS",
      product: "Urea",
      quantity: "50 kg/ha",
      notes: "Before panicle initiation",
    },
  ],
  costSheet: [
    { item: "DAP", qty: "198 kg", cost: "₹3,960" },
    { item: "Urea", qty: "207 kg", cost: "₹1,450" },
    { item: "MOP", qty: "72 kg", cost: "₹1,430" },
  ],
  warnings: [
    "pH is acceptable (6.4). Lime is not required for this demo sample.",
    "Quantities are guideline estimates for demonstration only.",
    "Confirm local prices and product availability with an agri-input dealer.",
  ],
  citations: ["ICAR nutrient management", "FAO fertilizer use by crop"],
}

export const reports = [
  {
    id: "RPT-1042",
    name: "Pre-sowing soil check",
    type: "Soil analysis",
    date: "28 Aug 2026",
    soilHealth: 82,
    status: "Ready",
  },
  {
    id: "RPT-1038",
    name: "Rabi crop suggestion",
    type: "Crop recommendation",
    date: "21 Aug 2026",
    soilHealth: 79,
    status: "Ready",
  },
  {
    id: "RPT-1021",
    name: "Mid-season nutrient review",
    type: "Soil analysis",
    date: "04 Aug 2026",
    soilHealth: 74,
    status: "Reviewed",
  },
]

export const aiSuggestedQuestions = [
  "What crop should I grow?",
  "How can I improve my soil?",
  "Which fertilizer should I use?",
  "What is the weather forecast?",
]

export const aiResponses = {
  default:
    "I can help with soil health, crop choice, fertilizer timing, weather awareness and cost planning. Ask a specific question, or pick one of the suggested prompts.",
  crop:
    "For this demo farm in a rabi window with moderately healthy soil, wheat is a strong candidate. Pair it with a phosphorus basal dose and split nitrogen. Always match the variety to your local extension advice.",
  soil:
    "Your demo soil is slightly low in phosphorus and moderate in organic carbon. Add compost, keep pH near 6.0–7.0, and avoid over-irrigating. A follow-up soil test after harvest is useful.",
  fertilizer:
    "A practical demo plan is DAP at sowing, MOP as basal potassium, and urea split at 21 and 40 days after sowing. Adjust to field size and never exceed label rates.",
  weather:
    "The demo forecast shows mostly fair weather with a higher rain chance on Friday. Plan irrigation around that, and avoid top-dressing just before heavy rain.",
}

export const sampleTestimonials = [
  {
    quote:
      "The layout made soil numbers easier to discuss with my advisor. This is sample copy for the project demo.",
    name: "Demo Farmer A",
    role: "Sample testimonial",
  },
  {
    quote:
      "Stage-wise fertilizer cards are clearer than a long report. Fictional feedback for UI demonstration.",
    name: "Demo Agronomist B",
    role: "Sample testimonial",
  },
  {
    quote:
      "Having cost next to the plan helps compare compost versus bagged fertilizer. Not a real customer review.",
    name: "Demo Grower C",
    role: "Sample testimonial",
  },
]

export const analysisSteps = [
  "Reading soil data",
  "Analyzing nutrients",
  "Evaluating soil health",
  "Preparing recommendations",
]

export const cropSteps = [
  "Reading field inputs",
  "Matching crop nutrient needs",
  "Scoring seasonal fit",
  "Preparing recommendation",
]
