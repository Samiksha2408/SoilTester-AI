from datetime import datetime

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PlantDisease(Base):
    __tablename__ = "plant_diseases"

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

    # Crop Information
    crop_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    # Uploaded Image
    image_path: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    # AI Prediction
    disease_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    confidence_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    severity: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    # AI Recommendation
    symptoms: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    treatment: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    prevention: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    pesticide: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # Relationship
    user = relationship(
        "User",
        back_populates="plant_diseases"
    )