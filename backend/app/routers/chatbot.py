
import time

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.oauth2 import get_current_active_user
from app.database import get_db
from app.model.user import User
from app.model.chatbot_history import ChatbotHistory
from app.ml_models.chatbot.chatbot import SoilChatbot
from app.schemas.chatbot import ChatbotRequest, ChatbotResponse


router = APIRouter(
    tags=["AI Chatbot"],
)
# Lazy chatbot initialization
# The Gemini chatbot will NOT be created when FastAPI starts.
# It will only be created when the first chatbot request is made.
chatbot = None


def get_chatbot():
    global chatbot

    if chatbot is None:
        chatbot = SoilChatbot()

    return chatbot

@router.post(
    "/chat",
    response_model=ChatbotResponse,
)
def chat_with_ai(
    request: ChatbotRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """
    Send a message to SoilTester AI and receive
    an agriculture-focused Gemini response.
    """

    start_time = time.perf_counter()

    # Generate AI response
    answer = chatbot.generate_response(
        user_message=request.message,
        context=request.context,
    )

    response_time = round(
        time.perf_counter() - start_time,
        3,
    )

    # Save conversation to database
    chat_history = ChatbotHistory(
        user_id=current_user.id,
        user_message=request.message,
        bot_response=answer,
        topic="agriculture",
        model_name=chatbot.model_name,
        response_time=response_time,
    )

    db.add(chat_history)
    db.commit()
    db.refresh(chat_history)

    return ChatbotResponse(
        message=request.message,
        response=answer,
        model_name=chatbot.model_name,
        response_time=response_time,
    )