from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.chatbot_history_repository import (
    ChatbotHistoryRepository,
)
from app.schemas.chatbot_history import (
    ChatbotHistoryCreate,
    ChatbotHistoryUpdate,
)


class ChatbotHistoryService:

    @staticmethod
    def get_all_chat_history(
        db: Session,
    ):
        return ChatbotHistoryRepository.get_all(db)

    @staticmethod
    def get_chat_by_id(
        db: Session,
        chat_id: int,
    ):
        chat = ChatbotHistoryRepository.get_by_id(
            db,
            chat_id,
        )

        if chat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat history not found",
            )

        return chat

    @staticmethod
    def get_chat_history_by_user(
        db: Session,
        user_id: int,
    ):
        return ChatbotHistoryRepository.get_by_user(
            db,
            user_id,
        )

    @staticmethod
    def create_chat_history(
        db: Session,
        chat: ChatbotHistoryCreate,
    ):
        return ChatbotHistoryRepository.create(
            db,
            chat,
        )

    @staticmethod
    def update_chat_history(
        db: Session,
        chat_id: int,
        chat: ChatbotHistoryUpdate,
    ):
        existing_chat = ChatbotHistoryRepository.get_by_id(
            db,
            chat_id,
        )

        if existing_chat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat history not found",
            )

        return ChatbotHistoryRepository.update(
            db,
            chat_id,
            chat,
        )

    @staticmethod
    def delete_chat_history(
        db: Session,
        chat_id: int,
    ):
        existing_chat = ChatbotHistoryRepository.get_by_id(
            db,
            chat_id,
        )

        if existing_chat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat history not found",
            )

        ChatbotHistoryRepository.delete(
            db,
            chat_id,
        )

        return {
            "message": "Chat history deleted successfully"
        }