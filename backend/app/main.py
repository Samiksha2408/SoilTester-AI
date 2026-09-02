from fastapi import FastAPI

from app.routers import api_router
from app.database import Base, engine

# Import all models
from app.model.user import User
from app.model.soil_report import SoilReport
from app.model.crop_recommendation import CropRecommendation
from app.model.fertilizer_recommendation import FertilizerRecommendation
from app.model.weather import Weather
from app.model.plant_disease import PlantDisease
from app.model.irrigation import Irrigation
from app.model.government_scheme import GovernmentScheme
from app.model.satellite_monitoring import SatelliteMonitoring
from app.model.chatbot_history import ChatbotHistory
from app.routers.soil_ocr import router as soil_ocr_router
# Import any other models you have

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SoilTester AI API",
    description="Backend API for SoilTester AI",
    version="1.0.0",
)

app.include_router(
    soil_ocr_router
)

# Include all API routers
app.include_router(api_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to SoilTester AI Backend"
    }


@app.get("/health")
def health():
    return {
        "status": "Running"
    }