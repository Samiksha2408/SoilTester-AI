from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


# -----------------------------
# Login Request
# -----------------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# -----------------------------
# JWT Token Response
# -----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

    model_config = ConfigDict(from_attributes=True)


# -----------------------------
# Token Payload
# -----------------------------
class TokenData(BaseModel):
    email: Optional[str] = None


# -----------------------------
# Change Password
# -----------------------------
class ChangePassword(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str


# -----------------------------
# Forgot Password
# -----------------------------
class ForgotPassword(BaseModel):
    email: EmailStr


# -----------------------------
# Reset Password
# -----------------------------
class ResetPassword(BaseModel):
    token: str
    new_password: str
    confirm_password: str