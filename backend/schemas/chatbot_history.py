from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ---------------------------
# Base Schema
# ---------------------------
class ChatbotHistoryBase(BaseModel):
    user_message: str
    bot_response: str

    topic: Optional[str] = None
    model_name: Optional[str] = None

    response_time: Optional[float] = None


# ---------------------------
# Create Schema
# ---------------------------
class ChatbotHistoryCreate(ChatbotHistoryBase):
    user_id: int  # link with user


# ---------------------------
# Update Schema
# ---------------------------
class ChatbotHistoryUpdate(BaseModel):
    user_message: Optional[str] = None
    bot_response: Optional[str] = None

    topic: Optional[str] = None
    model_name: Optional[str] = None

    response_time: Optional[float] = None


# ---------------------------
# Response Schema
# ---------------------------
class ChatbotHistoryResponse(ChatbotHistoryBase):
    id: int
    user_id: int

    created_at: datetime

    model_config = ConfigDict(from_attributes=True)