from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ---------------------------
# Base Schema
# ---------------------------
class IrrigationBase(BaseModel):
    crop_name: str

    soil_type: Optional[str] = None
    land_area: Optional[float] = None

    irrigation_method: Optional[str] = None
    water_required_liters: Optional[float] = None

    irrigation_frequency: Optional[str] = None
    irrigation_duration_minutes: Optional[int] = None

    best_time_to_irrigate: Optional[str] = None

    ai_recommendation: Optional[str] = None


# ---------------------------
# Create Schema
# ---------------------------
class IrrigationCreate(IrrigationBase):
    user_id: int  # link with user


# ---------------------------
# Update Schema
# ---------------------------
class IrrigationUpdate(BaseModel):
    crop_name: Optional[str] = None

    soil_type: Optional[str] = None
    land_area: Optional[float] = None

    irrigation_method: Optional[str] = None
    water_required_liters: Optional[float] = None

    irrigation_frequency: Optional[str] = None
    irrigation_duration_minutes: Optional[int] = None

    best_time_to_irrigate: Optional[str] = None

    ai_recommendation: Optional[str] = None


# ---------------------------
# Response Schema
# ---------------------------
class IrrigationResponse(IrrigationBase):
    id: int
    user_id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)