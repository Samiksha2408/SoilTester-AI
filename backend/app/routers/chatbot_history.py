from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.chatbot_history import ChatbotHistory
from app.schemas.chatbot_history import (
    ChatbotHistoryCreate,
    ChatbotHistoryUpdate,
    ChatbotHistoryResponse,
)

router = APIRouter()


# --------------------------------
# Create Chat History
# --------------------------------
@router.post(
    "/",
    response_model=ChatbotHistoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_chat_history(
    chat: ChatbotHistoryCreate,
    db: Session = Depends(get_db),
):
    new_chat = ChatbotHistory(**chat.model_dump())

    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    return new_chat


# --------------------------------
# Get All Chat History
# --------------------------------
@router.get(
    "/",
    response_model=list[ChatbotHistoryResponse],
)
def get_chat_history(
    db: Session = Depends(get_db),
):
    return db.query(ChatbotHistory).all()


# --------------------------------
# Get Chat History By ID
# --------------------------------
@router.get(
    "/{chat_id}",
    response_model=ChatbotHistoryResponse,
)
def get_chat(
    chat_id: int,
    db: Session = Depends(get_db),
):
    chat = (
        db.query(ChatbotHistory)
        .filter(ChatbotHistory.id == chat_id)
        .first()
    )

    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat history not found",
        )

    return chat


# --------------------------------
# Update Chat History
# --------------------------------
@router.put(
    "/{chat_id}",
    response_model=ChatbotHistoryResponse,
)
def update_chat(
    chat_id: int,
    chat_data: ChatbotHistoryUpdate,
    db: Session = Depends(get_db),
):
    chat = (
        db.query(ChatbotHistory)
        .filter(ChatbotHistory.id == chat_id)
        .first()
    )

    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat history not found",
        )

    update_data = chat_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(chat, key, value)

    db.commit()
    db.refresh(chat)

    return chat


# --------------------------------
# Delete Chat History
# --------------------------------
@router.delete("/{chat_id}")
def delete_chat(
    chat_id: int,
    db: Session = Depends(get_db),
):
    chat = (
        db.query(ChatbotHistory)
        .filter(ChatbotHistory.id == chat_id)
        .first()
    )

    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat history not found",
        )

    db.delete(chat)
    db.commit()

    return {
        "message": "Chat history deleted successfully"
    }