from datetime import datetime

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Weather(Base):
    __tablename__ = "weather"

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

    # Location
    location: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    district: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    state: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    # Weather Details
    temperature: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    humidity: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    rainfall: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    wind_speed: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    pressure: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    weather_condition: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    prediction: Mapped[str | None] = mapped_column(
        String(255),
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
        back_populates="weather_records"
    )