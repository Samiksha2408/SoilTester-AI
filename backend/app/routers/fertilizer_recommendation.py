from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.fertilizer_recommendation import FertilizerRecommendation
from app.schemas.fertilizer_recommendation import (
    FertilizerRecommendationCreate,
    FertilizerRecommendationUpdate,
    FertilizerRecommendationResponse,
)

router = APIRouter()


# --------------------------------
# Create Fertilizer Recommendation
# --------------------------------
@router.post(
    "/",
    response_model=FertilizerRecommendationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_fertilizer_recommendation(
    recommendation: FertilizerRecommendationCreate,
    db: Session = Depends(get_db),
):
    new_recommendation = FertilizerRecommendation(
        **recommendation.model_dump()
    )

    db.add(new_recommendation)
    db.commit()
    db.refresh(new_recommendation)

    return new_recommendation


# --------------------------------
# Get All Fertilizer Recommendations
# --------------------------------
@router.get(
    "/",
    response_model=list[FertilizerRecommendationResponse],
)
def get_fertilizer_recommendations(
    db: Session = Depends(get_db),
):
    return db.query(FertilizerRecommendation).all()


# --------------------------------
# Get Fertilizer Recommendation By ID
# --------------------------------
@router.get(
    "/{recommendation_id}",
    response_model=FertilizerRecommendationResponse,
)
def get_fertilizer_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db),
):
    recommendation = (
        db.query(FertilizerRecommendation)
        .filter(FertilizerRecommendation.id == recommendation_id)
        .first()
    )

    if recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Fertilizer recommendation not found",
        )

    return recommendation


# --------------------------------
# Update Fertilizer Recommendation
# --------------------------------
@router.put(
    "/{recommendation_id}",
    response_model=FertilizerRecommendationResponse,
)
def update_fertilizer_recommendation(
    recommendation_id: int,
    recommendation_data: FertilizerRecommendationUpdate,
    db: Session = Depends(get_db),
):
    recommendation = (
        db.query(FertilizerRecommendation)
        .filter(FertilizerRecommendation.id == recommendation_id)
        .first()
    )

    if recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Fertilizer recommendation not found",
        )

    update_data = recommendation_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(recommendation, key, value)

    db.commit()
    db.refresh(recommendation)

    return recommendation


# --------------------------------
# Delete Fertilizer Recommendation
# --------------------------------
@router.delete("/{recommendation_id}")
def delete_fertilizer_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db),
):
    recommendation = (
        db.query(FertilizerRecommendation)
        .filter(FertilizerRecommendation.id == recommendation_id)
        .first()
    )

    if recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Fertilizer recommendation not found",
        )

    db.delete(recommendation)
    db.commit()

    return {
        "message": "Fertilizer recommendation deleted successfully"
    }