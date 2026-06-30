from sqlalchemy.orm import Session

from app.model.government_scheme import GovernmentScheme
from app.schemas.government_scheme import (
    GovernmentSchemeCreate,
    GovernmentSchemeUpdate,
)


class GovernmentSchemeRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(GovernmentScheme).all()

    @staticmethod
    def get_by_id(
        db: Session,
        scheme_id: int,
    ):
        return (
            db.query(GovernmentScheme)
            .filter(GovernmentScheme.id == scheme_id)
            .first()
        )

    @staticmethod
    def get_by_state(
        db: Session,
        state: str,
    ):
        return (
            db.query(GovernmentScheme)
            .filter(GovernmentScheme.state == state)
            .all()
        )

    @staticmethod
    def get_by_category(
        db: Session,
        category: str,
    ):
        return (
            db.query(GovernmentScheme)
            .filter(GovernmentScheme.category == category)
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        scheme: GovernmentSchemeCreate,
    ):
        db_scheme = GovernmentScheme(
            **scheme.model_dump()
        )

        db.add(db_scheme)
        db.commit()
        db.refresh(db_scheme)

        return db_scheme

    @staticmethod
    def update(
        db: Session,
        scheme_id: int,
        scheme: GovernmentSchemeUpdate,
    ):
        db_scheme = (
            db.query(GovernmentScheme)
            .filter(GovernmentScheme.id == scheme_id)
            .first()
        )

        if db_scheme is None:
            return None

        update_data = scheme.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_scheme, key, value)

        db.commit()
        db.refresh(db_scheme)

        return db_scheme

    @staticmethod
    def delete(
        db: Session,
        scheme_id: int,
    ):
        db_scheme = (
            db.query(GovernmentScheme)
            .filter(GovernmentScheme.id == scheme_id)
            .first()
        )

        if db_scheme is None:
            return None

        db.delete(db_scheme)
        db.commit()

        return db_scheme
    