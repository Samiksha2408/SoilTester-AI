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


class SoilReport(Base):
    __tablename__ = "soil_reports"

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

    # Report Information
    report_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    report_file: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    ocr_text: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # Soil Parameters
    soil_type: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    ph: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    nitrogen: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    phosphorus: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    potassium: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    organic_carbon: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    electrical_conductivity: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    moisture: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    # AI Result
    soil_health: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    ai_summary: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # Upload Time
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
        back_populates="soil_reports"
    )

    crop_recommendations = relationship(
        "CropRecommendation",
        back_populates="soil_report",
        cascade="all, delete-orphan"
    )

    fertilizer_recommendations = relationship(
        "FertilizerRecommendation",
        back_populates="soil_report",
        cascade="all, delete-orphan"
    )