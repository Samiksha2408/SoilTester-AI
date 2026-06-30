from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.fertilizer_recommendation_repository import (
    FertilizerRecommendationRepository,
)
from app.schemas.fertilizer_recommendation import (
    FertilizerRecommendationCreate,
    FertilizerRecommendationUpdate,
)


class FertilizerRecommendationService:

    @staticmethod
    def get_all_fertilizer_recommendations(
        db: Session,
    ):
        return FertilizerRecommendationRepository.get_all(db)

    @staticmethod
    def get_fertilizer_recommendation_by_id(
        db: Session,
        recommendation_id: int,
    ):
        recommendation = (
            FertilizerRecommendationRepository.get_by_id(
                db,
                recommendation_id,
            )
        )

        if recommendation is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Fertilizer recommendation not found",
            )

        return recommendation

    @staticmethod
    def get_recommendations_by_soil_report(
        db: Session,
        soil_report_id: int,
    ):
        return (
            FertilizerRecommendationRepository.get_by_soil_report(
                db,
                soil_report_id,
            )
        )

    @staticmethod
    def create_fertilizer_recommendation(
        db: Session,
        recommendation: FertilizerRecommendationCreate,
    ):
        return FertilizerRecommendationRepository.create(
            db,
            recommendation,
        )

    @staticmethod
    def update_fertilizer_recommendation(
        db: Session,
        recommendation_id: int,
        recommendation: FertilizerRecommendationUpdate,
    ):
        existing = (
            FertilizerRecommendationRepository.get_by_id(
                db,
                recommendation_id,
            )
        )

        if existing is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Fertilizer recommendation not found",
            )

        return FertilizerRecommendationRepository.update(
            db,
            recommendation_id,
            recommendation,
        )

    @staticmethod
    def delete_fertilizer_recommendation(
        db: Session,
        recommendation_id: int,
    ):
        existing = (
            FertilizerRecommendationRepository.get_by_id(
                db,
                recommendation_id,
            )
        )

        if existing is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Fertilizer recommendation not found",
            )

        FertilizerRecommendationRepository.delete(
            db,
            recommendation_id,
        )

        return {
            "message": "Fertilizer recommendation deleted successfully"
        }