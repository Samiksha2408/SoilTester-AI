from fastapi import APIRouter

from app.routers.auth import router as auth_router 
from app.routers.user import router as user_router
from app.routers.soil_report import router as soil_report_router
from app.routers.crop_recommendation import router as crop_router
from app.routers.fertilizer_recommendation import router as fertilizer_router
from app.routers.weather import router as weather_router
from app.routers.plant_disease import router as plant_disease_router
from app.routers.irrigation import router as irrigation_router
from app.routers.government_scheme import router as government_router
from app.routers.satellite_monitoring import router as satellite_router
from app.routers.chatbot_history import router as chatbot_router

api_router = APIRouter()

# Authentication
api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])

# Users
api_router.include_router(user_router, prefix="/users", tags=["Users"])

# Soil Reports
api_router.include_router(
   soil_report_router
    )
    
# Crop Recommendation
api_router.include_router(
    crop_router,
    prefix="/crop-recommendation",
    tags=["Crop Recommendation"],
)

# Fertilizer Recommendation
api_router.include_router(
    fertilizer_router,
    prefix="/fertilizer-recommendation",
    tags=["Fertilizer Recommendation"],
)

# Weather
api_router.include_router(
    weather_router,
    prefix="/weather",
    tags=["Weather"],
)

# Plant Disease
api_router.include_router(
    plant_disease_router,
    prefix="/plant-disease",
    tags=["Plant Disease"],
)

# Irrigation
api_router.include_router(
    irrigation_router,
    prefix="/irrigation",
    tags=["Irrigation"],
)

# Government Scheme
api_router.include_router(
    government_router,
    prefix="/government-scheme",
    tags=["Government Scheme"],
)

# Satellite Monitoring
api_router.include_router(
    satellite_router,
    prefix="/satellite-monitoring",
    tags=["Satellite Monitoring"],
)

# Chatbot
api_router.include_router(
    chatbot_router,
    prefix="/chatbot",
    tags=["Chatbot"],
)
