from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.crop_recommendation_repository import (
    CropRecommendationRepository,
)
from app.schemas.crop_recommendation import (
    CropRecommendationCreate,
    CropRecommendationUpdate,
)


class CropRecommendationService:

    @staticmethod
    def get_all_crop_recommendations(
        db: Session,
    ):
        return CropRecommendationRepository.get_all(db)

    @staticmethod
    def get_crop_recommendation_by_id(
        db: Session,
        recommendation_id: int,
    ):
        recommendation = (
            CropRecommendationRepository.get_by_id(
                db,
                recommendation_id,
            )
        )

        if recommendation is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Crop recommendation not found",
            )

        return recommendation

    @staticmethod
    def get_recommendations_by_soil_report(
        db: Session,
        soil_report_id: int,
    ):
        return (
            CropRecommendationRepository.get_by_soil_report(
                db,
                soil_report_id,
            )
        )

    @staticmethod
    def create_crop_recommendation(
        db: Session,
        recommendation: CropRecommendationCreate,
    ):
        return CropRecommendationRepository.create(
            db,
            recommendation,
        )

    @staticmethod
    def update_crop_recommendation(
        db: Session,
        recommendation_id: int,
        recommendation: CropRecommendationUpdate,
    ):
        existing = (
            CropRecommendationRepository.get_by_id(
                db,
                recommendation_id,
            )
        )

        if existing is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Crop recommendation not found",
            )

        return CropRecommendationRepository.update(
            db,
            recommendation_id,
            recommendation,
        )

    @staticmethod
    def delete_crop_recommendation(
        db: Session,
        recommendation_id: int,
    ):
        existing = (
            CropRecommendationRepository.get_by_id(
                db,
                recommendation_id,
            )
        )

        if existing is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Crop recommendation not found",
            )

        CropRecommendationRepository.delete(
            db,
            recommendation_id,
        )

        return {
            "message": "Crop recommendation deleted successfully"
        }
    