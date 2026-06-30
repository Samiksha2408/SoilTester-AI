from datetime import datetime

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class GovernmentScheme(Base):
    __tablename__ = "government_schemes"

    # Primary Key
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # Scheme Information
    scheme_name: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    category: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # Eligibility
    eligibility: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    benefits: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # Location
    state: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    district: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    # Application Details
    official_website: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    application_start_date: Mapped[Date | None] = mapped_column(
        Date,
        nullable=True
    )

    application_end_date: Mapped[Date | None] = mapped_column(
        Date,
        nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
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