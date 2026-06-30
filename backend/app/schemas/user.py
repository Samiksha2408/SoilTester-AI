from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


# -----------------------------
# Base Schema
# -----------------------------
class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str = "farmer"
    profile_image: Optional[str] = None
    address: Optional[str] = None


# -----------------------------
# Create User
# -----------------------------
class UserCreate(UserBase):
    password: str


# -----------------------------
# Update User
# -----------------------------
class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    profile_image: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = None


# -----------------------------
# User Response
# -----------------------------
class UserResponse(UserBase):
    id: int
    is_verified: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# -----------------------------
# User Profile
# -----------------------------
class UserProfile(UserResponse):
    pass