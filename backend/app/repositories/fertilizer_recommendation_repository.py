from sqlalchemy.orm import Session

from app.model.fertilizer_recommendation import (
    FertilizerRecommendation,
)
from app.schemas.fertilizer_recommendation import (
    FertilizerRecommendationCreate,
    FertilizerRecommendationUpdate,
)


class FertilizerRecommendationRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(FertilizerRecommendation).all()

    @staticmethod
    def get_by_id(
        db: Session,
        recommendation_id: int,
    ):
        return (
            db.query(FertilizerRecommendation)
            .filter(
                FertilizerRecommendation.id == recommendation_id
            )
            .first()
        )

    @staticmethod
    def get_by_soil_report(
        db: Session,
        soil_report_id: int,
    ):
        return (
            db.query(FertilizerRecommendation)
            .filter(
                FertilizerRecommendation.soil_report_id == soil_report_id
            )
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        recommendation: FertilizerRecommendationCreate,
    ):
        db_recommendation = FertilizerRecommendation(
            **recommendation.model_dump()
        )

        db.add(db_recommendation)
        db.commit()
        db.refresh(db_recommendation)

        return db_recommendation

    @staticmethod
    def update(
        db: Session,
        recommendation_id: int,
        recommendation: FertilizerRecommendationUpdate,
    ):
        db_recommendation = (
            db.query(FertilizerRecommendation)
            .filter(
                FertilizerRecommendation.id == recommendation_id
            )
            .first()
        )

        if db_recommendation is None:
            return None

        update_data = recommendation.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_recommendation, key, value)

        db.commit()
        db.refresh(db_recommendation)

        return db_recommendation

    @staticmethod
    def delete(
        db: Session,
        recommendation_id: int,
    ):
        db_recommendation = (
            db.query(FertilizerRecommendation)
            .filter(
                FertilizerRecommendation.id == recommendation_id
            )
            .first()
        )

        if db_recommendation is None:
            return None

        db.delete(db_recommendation)
        db.commit()

        return db_recommendation