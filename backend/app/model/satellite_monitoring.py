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


class SatelliteMonitoring(Base):
    __tablename__ = "satellite_monitoring"

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

    # Farm Information
    farm_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    location: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    latitude: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    longitude: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    # Satellite Data
    ndvi_index: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    soil_moisture: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    vegetation_health: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    land_surface_temperature: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    # AI Analysis
    health_status: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    ai_recommendation: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # Satellite Image
    satellite_image_url: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    image_date: Mapped[datetime | None] = mapped_column(
        DateTime,
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
        back_populates="satellite_records"
    )