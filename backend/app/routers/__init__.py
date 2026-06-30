from fastapi import APIRouter

from app.routers import (
    auth,
    users,
    crop_recommendations,
    fertilizer_recommendations,
    weather,
    plant_diseases,
    irrigation,
    government_schemes,
    satellite_monitoring,
    chatbot,
)
from backend.app.routers import soil_report

api_router = APIRouter()

# ---------------------------
# Auth & Users
# ---------------------------
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])

# ---------------------------
# Core AI Modules
# ---------------------------
api_router.include_router(soil_report.router, prefix="/soil-reports", tags=["Soil Reports"])
api_router.include_router(crop_recommendations.router, prefix="/crop-recommendations", tags=["Crop Recommendations"])
api_router.include_router(fertilizer_recommendations.router, prefix="/fertilizer-recommendations", tags=["Fertilizer Recommendations"])

# ---------------------------
# Weather & Environment
# ---------------------------
api_router.include_router(weather.router, prefix="/weather", tags=["Weather"])

# ---------------------------
# Plant Intelligence
# ---------------------------
api_router.include_router(plant_diseases.router, prefix="/plant-diseases", tags=["Plant Diseases"])

# ---------------------------
# Irrigation System
# ---------------------------
api_router.include_router(irrigation.router, prefix="/irrigation", tags=["Irrigation"])

# ---------------------------
# Government & Advisory
# ---------------------------
api_router.include_router(government_schemes.router, prefix="/government-schemes", tags=["Government Schemes"])

# ---------------------------
# Satellite AI Monitoring
# ---------------------------
api_router.include_router(satellite_monitoring.router, prefix="/satellite-monitoring", tags=["Satellite Monitoring"])

# ---------------------------
# AI Chatbot
# ---------------------------
api_router.include_router(chatbot.router, prefix="/chatbot", tags=["Chatbot"])