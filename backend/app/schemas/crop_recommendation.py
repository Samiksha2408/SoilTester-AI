from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict





# ---------------------------
# Create Schema
# ---------------------------
class CropRecommendationCreate(BaseModel):
    soil_report_id: int  # required to link soil report
    
    # Weather values required by ML model
    temperature: float
    humidity: float
    rainfall: float

# ---------------------------
# Update Schema
# ---------------------------
class CropRecommendationUpdate(BaseModel):
    crop_name: Optional[str] = None

    season: Optional[str] = None

    confidence_score: Optional[float] = None
    expected_yield: Optional[float] = None

    water_requirement: Optional[str] = None
    growth_duration_days: Optional[int] = None

    recommendation_reason: Optional[str] = None


# ---------------------------
# Response Schema
# ---------------------------
class CropRecommendationResponse(BaseModel):
    id: int
    soil_report_id: int
    crop_name: str
    season: Optional[str] = None

    confidence_score: Optional[float] = None
    expected_yield: Optional[float] = None

    water_requirement: Optional[str] = None
    growth_duration_days: Optional[int] = None

    recommendation_reason: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)