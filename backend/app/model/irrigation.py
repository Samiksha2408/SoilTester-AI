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


class Irrigation(Base):
    __tablename__ = "irrigation"

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

    # Crop Details
    crop_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    soil_type: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    land_area: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    # Irrigation Recommendation
    irrigation_method: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    water_required_liters: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    irrigation_frequency: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    irrigation_duration_minutes: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    best_time_to_irrigate: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    ai_recommendation: Mapped[str | None] = mapped_column(
        Text,
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
        back_populates="irrigation_records"
    )