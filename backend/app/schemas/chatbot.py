
from datetime import datetime
from typing import Optional

from pydantic import BaseModel,ConfigDict, Field


class ChatbotRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="User's agriculture-related question",
    )

    context: Optional[str] = Field(
        default=None,
        max_length=5000,
        description="Optional soil/crop/farm context",
    )


class ChatbotResponse(BaseModel):
    message: str
    response: str
    model_name: str
    response_time: float


# ============================================================
# CHATBOT HISTORY
# ============================================================

class ChatbotHistoryBase(BaseModel):
    user_message: str
    bot_response: str
    topic: Optional[str] = None
    model_name: Optional[str] = None
    response_time: Optional[float] = None


class ChatbotHistoryCreate(ChatbotHistoryBase):
    user_id: int


class ChatbotHistoryUpdate(BaseModel):
    user_message: Optional[str] = None
    bot_response: Optional[str] = None
    topic: Optional[str] = None
    model_name: Optional[str] = None
    response_time: Optional[float] = None


class ChatbotHistoryResponse(ChatbotHistoryBase):
    id: int
    user_id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )