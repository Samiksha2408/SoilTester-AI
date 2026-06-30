from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ChatbotHistory(Base):
    __tablename__ = "chatbot_history"

    # Primary Key
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # User Relationship
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    # Conversation
    user_message: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    bot_response: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    # Optional Topic
    topic: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    # AI Model Used
    model_name: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    # Response Time (seconds)
    response_time: Mapped[float | None] = mapped_column(
        nullable=True
    )

    # Timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # Relationship
    user = relationship(
        "User",
        back_populates="chatbot_history"
    )