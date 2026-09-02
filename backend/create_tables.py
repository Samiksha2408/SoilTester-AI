from app.database import Base, engine

# Import ALL models so SQLAlchemy registers them
from app.model.user import User
from app.model.soil_report import SoilReport
from app.model.crop_recommendation import CropRecommendation
from app.model.fertilizer_recommendation import FertilizerRecommendation
from app.model.weather import Weather
from app.model.plant_disease import PlantDisease
from app.model.irrigation import Irrigation

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("ALL TABLES CREATED SUCCESSFULLY!")
