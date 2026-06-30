from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.crop_recommendation import CropRecommendation
from app.schemas.crop_recommendation import (
    CropRecommendationCreate,
    CropRecommendationUpdate,
    CropRecommendationResponse,
)

router = APIRouter()


# -----------------------------------
# Create Crop Recommendation
# -----------------------------------
@router.post(
    "/",
    response_model=CropRecommendationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_crop_recommendation(
    recommendation: CropRecommendationCreate,
    db: Session = Depends(get_db),
):
    new_recommendation = CropRecommendation(
        **recommendation.model_dump()
    )

    db.add(new_recommendation)
    db.commit()
    db.refresh(new_recommendation)

    return new_recommendation


# -----------------------------------
# Get All Crop Recommendations
# -----------------------------------
@router.get(
    "/",
    response_model=list[CropRecommendationResponse],
)
def get_crop_recommendations(
    db: Session = Depends(get_db),
):
    return db.query(CropRecommendation).all()


# -----------------------------------
# Get Crop Recommendation By ID
# -----------------------------------
@router.get(
    "/{recommendation_id}",
    response_model=CropRecommendationResponse,
)
def get_crop_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db),
):
    recommendation = (
        db.query(CropRecommendation)
        .filter(CropRecommendation.id == recommendation_id)
        .first()
    )

    if recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop recommendation not found",
        )

    return recommendation


# -----------------------------------
# Update Crop Recommendation
# -----------------------------------
@router.put(
    "/{recommendation_id}",
    response_model=CropRecommendationResponse,
)
def update_crop_recommendation(
    recommendation_id: int,
    recommendation_data: CropRecommendationUpdate,
    db: Session = Depends(get_db),
):
    recommendation = (
        db.query(CropRecommendation)
        .filter(CropRecommendation.id == recommendation_id)
        .first()
    )

    if recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop recommendation not found",
        )

    update_data = recommendation_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(recommendation, key, value)

    db.commit()
    db.refresh(recommendation)

    return recommendation


# -----------------------------------
# Delete Crop Recommendation
# -----------------------------------
@router.delete("/{recommendation_id}")
def delete_crop_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db),
):
    recommendation = (
        db.query(CropRecommendation)
        .filter(CropRecommendation.id == recommendation_id)
        .first()
    )

    if recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop recommendation not found",
        )

    db.delete(recommendation)
    db.commit()

    return {
        "message": "Crop recommendation deleted successfully"
    }