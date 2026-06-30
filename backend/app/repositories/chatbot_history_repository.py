from sqlalchemy.orm import Session

from app.model.chatbot_history import ChatbotHistory
from app.schemas.chatbot_history import (
    ChatbotHistoryCreate,
    ChatbotHistoryUpdate,
)


class ChatbotHistoryRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(ChatbotHistory).all()

    @staticmethod
    def get_by_id(
        db: Session,
        chat_id: int,
    ):
        return (
            db.query(ChatbotHistory)
            .filter(ChatbotHistory.id == chat_id)
            .first()
        )

    @staticmethod
    def get_by_user(
        db: Session,
        user_id: int,
    ):
        return (
            db.query(ChatbotHistory)
            .filter(ChatbotHistory.user_id == user_id)
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        chat: ChatbotHistoryCreate,
    ):
        db_chat = ChatbotHistory(
            **chat.model_dump()
        )

        db.add(db_chat)
        db.commit()
        db.refresh(db_chat)

        return db_chat

    @staticmethod
    def update(
        db: Session,
        chat_id: int,
        chat: ChatbotHistoryUpdate,
    ):
        db_chat = (
            db.query(ChatbotHistory)
            .filter(ChatbotHistory.id == chat_id)
            .first()
        )

        if db_chat is None:
            return None

        update_data = chat.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_chat, key, value)

        db.commit()
        db.refresh(db_chat)

        return db_chat

    @staticmethod
    def delete(
        db: Session,
        chat_id: int,
    ):
        db_chat = (
            db.query(ChatbotHistory)
            .filter(ChatbotHistory.id == chat_id)
            .first()
        )

        if db_chat is None:
            return None

        db.delete(db_chat)
        db.commit()

        return db_chat