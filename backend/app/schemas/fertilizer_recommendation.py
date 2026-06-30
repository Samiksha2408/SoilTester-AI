from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ---------------------------
# Base Schema
# ---------------------------
class FertilizerRecommendationBase(BaseModel):
    fertilizer_name: str

    fertilizer_type: Optional[str] = None

    quantity_per_acre: Optional[float] = None

    application_method: Optional[str] = None
    application_time: Optional[str] = None

    recommendation_reason: Optional[str] = None

    confidence_score: Optional[float] = None


# ---------------------------
# Create Schema
# ---------------------------
class FertilizerRecommendationCreate(FertilizerRecommendationBase):
    soil_report_id: int  # link with soil report


# ---------------------------
# Update Schema
# ---------------------------
class FertilizerRecommendationUpdate(BaseModel):
    fertilizer_name: Optional[str] = None

    fertilizer_type: Optional[str] = None

    quantity_per_acre: Optional[float] = None

    application_method: Optional[str] = None
    application_time: Optional[str] = None

    recommendation_reason: Optional[str] = None

    confidence_score: Optional[float] = None


# ---------------------------
# Response Schema
# ---------------------------
class FertilizerRecommendationResponse(FertilizerRecommendationBase):
    id: int
    soil_report_id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)