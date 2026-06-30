from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    # Primary Key
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # Basic Information
    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        index=True,
        nullable=False
    )

    password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    phone: Mapped[str | None] = mapped_column(
        String(15),
        nullable=True
    )

    # User Role
    role: Mapped[str] = mapped_column(
        String(20),
        default="farmer"
    )

    # Profile
    profile_image: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    address: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    # Account Status
    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    # Audit Fields
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # Relationships
    soil_reports = relationship(
        "SoilReport",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    chatbot_history = relationship(
        "ChatbotHistory",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    weather_records = relationship(
       "Weather",
       back_populates="user",
       cascade="all, delete-orphan"
    ) 

    plant_diseases = relationship(
       "PlantDisease",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    irrigation_records = relationship(
       "Irrigation",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    satellite_records = relationship(
        "SatelliteMonitoring",
        back_populates="user",
        cascade="all, delete-orphan"
    )  