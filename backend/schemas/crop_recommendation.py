from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ---------------------------
# Base Schema
# ---------------------------
class CropRecommendationBase(BaseModel):
    crop_name: str

    season: Optional[str] = None

    confidence_score: Optional[float] = None
    expected_yield: Optional[float] = None

    water_requirement: Optional[str] = None
    growth_duration_days: Optional[int] = None

    recommendation_reason: Optional[str] = None


# ---------------------------
# Create Schema
# ---------------------------
class CropRecommendationCreate(CropRecommendationBase):
    soil_report_id: int  # required to link soil report


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
class CropRecommendationResponse(CropRecommendationBase):
    id: int
    soil_report_id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)