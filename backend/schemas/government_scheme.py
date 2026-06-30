from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ---------------------------
# Base Schema
# ---------------------------
class GovernmentSchemeBase(BaseModel):
    scheme_name: str

    category: Optional[str] = None

    description: Optional[str] = None
    eligibility: Optional[str] = None
    benefits: Optional[str] = None

    state: Optional[str] = None
    district: Optional[str] = None

    official_website: Optional[str] = None

    application_start_date: Optional[date] = None
    application_end_date: Optional[date] = None

    is_active: Optional[bool] = True


# ---------------------------
# Create Schema
# ---------------------------
class GovernmentSchemeCreate(GovernmentSchemeBase):
    pass


# ---------------------------
# Update Schema
# ---------------------------
class GovernmentSchemeUpdate(BaseModel):
    scheme_name: Optional[str] = None

    category: Optional[str] = None

    description: Optional[str] = None
    eligibility: Optional[str] = None
    benefits: Optional[str] = None

    state: Optional[str] = None
    district: Optional[str] = None

    official_website: Optional[str] = None

    application_start_date: Optional[date] = None
    application_end_date: Optional[date] = None

    is_active: Optional[bool] = None


# ---------------------------
# Response Schema
# ---------------------------
class GovernmentSchemeResponse(GovernmentSchemeBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
    