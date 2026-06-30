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


class CropRecommendation(Base):
    __tablename__ = "crop_recommendations"

    # Primary Key
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # Relationship with Soil Report
    soil_report_id: Mapped[int] = mapped_column(
        ForeignKey("soil_reports.id", ondelete="CASCADE"),
        nullable=False
    )

    # Crop Details
    crop_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    season: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    confidence_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    expected_yield: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    water_requirement: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    growth_duration_days: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    recommendation_reason: Mapped[str | None] = mapped_column(
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
    soil_report = relationship(
        "SoilReport",
        back_populates="crop_recommendations"
    )