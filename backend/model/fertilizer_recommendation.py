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


class FertilizerRecommendation(Base):
    __tablename__ = "fertilizer_recommendations"

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

    # Fertilizer Information
    fertilizer_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    fertilizer_type: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    quantity_per_acre: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    application_method: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    application_time: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    recommendation_reason: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    confidence_score: Mapped[float | None] = mapped_column(
        Float,
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
        back_populates="fertilizer_recommendations"
    )