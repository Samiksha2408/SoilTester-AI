from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.government_scheme_repository import (
    GovernmentSchemeRepository,
)
from app.schemas.government_scheme import (
    GovernmentSchemeCreate,
    GovernmentSchemeUpdate,
)


class GovernmentSchemeService:

    @staticmethod
    def get_all_government_schemes(
        db: Session,
    ):
        return GovernmentSchemeRepository.get_all(db)

    @staticmethod
    def get_government_scheme_by_id(
        db: Session,
        scheme_id: int,
    ):
        scheme = GovernmentSchemeRepository.get_by_id(
            db,
            scheme_id,
        )

        if scheme is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Government scheme not found",
            )

        return scheme

    @staticmethod
    def get_government_schemes_by_state(
        db: Session,
        state: str,
    ):
        return GovernmentSchemeRepository.get_by_state(
            db,
            state,
        )

    @staticmethod
    def get_government_schemes_by_category(
        db: Session,
        category: str,
    ):
        return GovernmentSchemeRepository.get_by_category(
            db,
            category,
        )

    @staticmethod
    def create_government_scheme(
        db: Session,
        scheme: GovernmentSchemeCreate,
    ):
        return GovernmentSchemeRepository.create(
            db,
            scheme,
        )

    @staticmethod
    def update_government_scheme(
        db: Session,
        scheme_id: int,
        scheme: GovernmentSchemeUpdate,
    ):
        existing_scheme = (
            GovernmentSchemeRepository.get_by_id(
                db,
                scheme_id,
            )
        )

        if existing_scheme is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Government scheme not found",
            )

        return GovernmentSchemeRepository.update(
            db,
            scheme_id,
            scheme,
        )

    @staticmethod
    def delete_government_scheme(
        db: Session,
        scheme_id: int,
    ):
        existing_scheme = (
            GovernmentSchemeRepository.get_by_id(
                db,
                scheme_id,
            )
        )

        if existing_scheme is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Government scheme not found",
            )

        GovernmentSchemeRepository.delete(
            db,
            scheme_id,
        )

        return {
            "message": "Government scheme deleted successfully"
        }