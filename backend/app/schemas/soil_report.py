from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ---------------------------
# Base Schema
# ---------------------------
class SoilReportBase(BaseModel):
    soil_type: Optional[str] = None

    ph: Optional[float] = None
    nitrogen: Optional[float] = None
    phosphorus: Optional[float] = None
    potassium: Optional[float] = None

    organic_carbon: Optional[float] = None
    electrical_conductivity: Optional[float] = None
    moisture: Optional[float] = None


# ---------------------------
# Create Schema
# ---------------------------
class SoilReportCreate(SoilReportBase):
    pass


# ---------------------------
# Update Schema
# ---------------------------
class SoilReportUpdate(BaseModel):
    soil_type: Optional[str] = None

    ph: Optional[float] = None
    nitrogen: Optional[float] = None
    phosphorus: Optional[float] = None
    potassium: Optional[float] = None

    organic_carbon: Optional[float] = None
    electrical_conductivity: Optional[float] = None
    moisture: Optional[float] = None


# ---------------------------
# Response Schema
# ---------------------------
class SoilReportResponse(SoilReportBase):
    id: int
    user_id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)