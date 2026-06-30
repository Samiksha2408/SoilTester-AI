from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ---------------------------
# Base Schema
# ---------------------------
class SatelliteMonitoringBase(BaseModel):
    farm_name: str
    location: str

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    ndvi_index: Optional[float] = None
    soil_moisture: Optional[float] = None

    vegetation_health: Optional[str] = None
    land_surface_temperature: Optional[float] = None

    health_status: Optional[str] = None
    ai_recommendation: Optional[str] = None

    satellite_image_url: Optional[str] = None

    image_date: Optional[datetime] = None


# ---------------------------
# Create Schema
# ---------------------------
class SatelliteMonitoringCreate(SatelliteMonitoringBase):
    user_id: int  # link with user


# ---------------------------
# Update Schema
# ---------------------------
class SatelliteMonitoringUpdate(BaseModel):
    farm_name: Optional[str] = None
    location: Optional[str] = None

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    ndvi_index: Optional[float] = None
    soil_moisture: Optional[float] = None

    vegetation_health: Optional[str] = None
    land_surface_temperature: Optional[float] = None

    health_status: Optional[str] = None
    ai_recommendation: Optional[str] = None

    satellite_image_url: Optional[str] = None

    image_date: Optional[datetime] = None


# ---------------------------
# Response Schema
# ---------------------------
class SatelliteMonitoringResponse(SatelliteMonitoringBase):
    id: int
    user_id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)