from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ---------------------------
# Base Schema
# ---------------------------
class WeatherBase(BaseModel):
    location: str

    district: Optional[str] = None
    state: Optional[str] = None

    temperature: Optional[float] = None
    humidity: Optional[float] = None
    rainfall: Optional[float] = None
    wind_speed: Optional[float] = None
    pressure: Optional[float] = None

    weather_condition: Optional[str] = None
    prediction: Optional[str] = None


# ---------------------------
# Create Schema
# ---------------------------
class WeatherCreate(WeatherBase):
    user_id: int  # link weather to user


# ---------------------------
# Update Schema
# ---------------------------
class WeatherUpdate(BaseModel):
    location: Optional[str] = None

    district: Optional[str] = None
    state: Optional[str] = None

    temperature: Optional[float] = None
    humidity: Optional[float] = None
    rainfall: Optional[float] = None
    wind_speed: Optional[float] = None
    pressure: Optional[float] = None

    weather_condition: Optional[str] = None
    prediction: Optional[str] = None


# ---------------------------
# Response Schema
# ---------------------------
class WeatherResponse(WeatherBase):
    id: int
    user_id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)