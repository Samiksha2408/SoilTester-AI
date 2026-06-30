from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ---------------------------
# Base Schema
# ---------------------------
class PlantDiseaseBase(BaseModel):
    crop_name: str

    image_path: str  # uploaded leaf image

    disease_name: str

    confidence_score: Optional[float] = None

    severity: Optional[str] = None

    symptoms: Optional[str] = None
    treatment: Optional[str] = None
    prevention: Optional[str] = None

    pesticide: Optional[str] = None


# ---------------------------
# Create Schema
# ---------------------------
class PlantDiseaseCreate(PlantDiseaseBase):
    user_id: int  # link to user


# ---------------------------
# Update Schema
# ---------------------------
class PlantDiseaseUpdate(BaseModel):
    crop_name: Optional[str] = None

    image_path: Optional[str] = None

    disease_name: Optional[str] = None

    confidence_score: Optional[float] = None

    severity: Optional[str] = None

    symptoms: Optional[str] = None
    treatment: Optional[str] = None
    prevention: Optional[str] = None

    pesticide: Optional[str] = None


# ---------------------------
# Response Schema
# ---------------------------
class PlantDiseaseResponse(PlantDiseaseBase):
    id: int
    user_id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)