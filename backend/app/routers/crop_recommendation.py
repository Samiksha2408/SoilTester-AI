from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.crop_recommendation import CropRecommendation
from app.model.soil_report import SoilReport
from app.schemas.crop_recommendation import (
    CropRecommendationCreate,
    CropRecommendationUpdate,
    CropRecommendationResponse,
)

from app.ml_models.crop_recommendation.predictor import crop_predictor

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
    # -----------------------------------
    # 1. Find the soil report
    # -----------------------------------
    soil_report = (
        db.query(SoilReport)
        .filter(
            SoilReport.id == recommendation.soil_report_id
        )
        .first()
    )

    if soil_report is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=(
                f"Soil report with ID "
                f"{recommendation.soil_report_id} not found"
            ),
        )

    # -----------------------------------
    # 2. Validate soil values
    # -----------------------------------
    if (
        soil_report.nitrogen is None
        or soil_report.phosphorus is None
        or soil_report.potassium is None
        or soil_report.ph is None
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Soil report must contain "
                "nitrogen, phosphorus, potassium "
                "and pH values."
            ),
        )

    # -----------------------------------
    # 3. Run Crop ML model
    # -----------------------------------
    predicted_crop = crop_predictor.predict(
        nitrogen=soil_report.nitrogen,
        phosphorus=soil_report.phosphorus,
        potassium=soil_report.potassium,
        temperature=recommendation.temperature,
        humidity=recommendation.humidity,
        ph=soil_report.ph,
        rainfall=recommendation.rainfall,
    )

    # -----------------------------------
    # 4. Create recommendation
    # -----------------------------------
    new_recommendation = CropRecommendation(
        soil_report_id=soil_report.id,

        crop_name=str(predicted_crop),

        season=None,

        confidence_score=None,

        expected_yield=None,

        water_requirement=None,

        growth_duration_days=None,

        recommendation_reason=(
            "Crop recommended using the trained "
            "Random Forest crop recommendation model "
            "based on soil and weather conditions."
        ),
    )

    # -----------------------------------
    # 5. Save to database
    # -----------------------------------

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