from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db

from app.model.fertilizer_recommendation import FertilizerRecommendation
from app.model.soil_report import SoilReport

from app.schemas.fertilizer_recommendation import (
    FertilizerRecommendationCreate,
    FertilizerRecommendationUpdate,
    FertilizerRecommendationResponse,
)

from app.ml_models.fertilizer_recommendation.predictor import (
    fertilizer_predictor,
)


router = APIRouter()


# ==========================================
# Create Fertilizer Recommendation
# ==========================================

@router.post(
    "/",
    response_model=FertilizerRecommendationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_fertilizer_recommendation(
    recommendation: FertilizerRecommendationCreate,
    db: Session = Depends(get_db),
):

    # --------------------------------------
    # Find Soil Report
    # --------------------------------------

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
            detail="Soil report not found",
        )

    # --------------------------------------
    # Check required soil values
    # --------------------------------------

    required_values = {
        "nitrogen": soil_report.nitrogen,
        "phosphorus": soil_report.phosphorus,
        "potassium": soil_report.potassium,
        "moisture": soil_report.moisture,
    }

    missing_values = [
        name
        for name, value in required_values.items()
        if value is None
    ]

    if missing_values:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Missing soil values: {missing_values}",
        )

    # --------------------------------------
    # Values required by ML model
    # --------------------------------------

    temperature = 25.0
    humidity = 60.0

    # Your SoilReport currently does not contain
    # temperature, humidity or crop type.
    #
    # We will improve this later.
    #
    # For now, these are temporary values.

    soil_type = soil_report.soil_type or "Sandy"

    crop_type = "Maize"

    # --------------------------------------
    # Call Fertilizer ML Model
    # --------------------------------------

    try:

        fertilizer_name = fertilizer_predictor.predict(
            temperature=temperature,
            humidity=humidity,
            moisture=soil_report.moisture,
            soil_type=soil_type,
            crop_type=crop_type,
            nitrogen=soil_report.nitrogen,
            potassium=soil_report.potassium,
            phosphorus=soil_report.phosphorus,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    # --------------------------------------
    # Create Recommendation
    # --------------------------------------

    new_recommendation = FertilizerRecommendation(
        fertilizer_name=fertilizer_name,

        fertilizer_type="Recommended fertilizer",

        quantity_per_acre=0,

        application_method="As recommended by agricultural guidelines",

        application_time="Based on crop growth stage",

        recommendation_reason=(
            "Fertilizer recommended using the trained "
            "Random Forest fertilizer recommendation "
            "model based on soil conditions."
        ),

        confidence_score=0.0,

        soil_report_id=recommendation.soil_report_id,
    )

    # --------------------------------------
    # Save to Database
    # --------------------------------------

    db.add(new_recommendation)
    db.commit()
    db.refresh(new_recommendation)

    return new_recommendation


# ==========================================
# Get All Fertilizer Recommendations
# ==========================================

@router.get(
    "/",
    response_model=list[FertilizerRecommendationResponse],
)
def get_fertilizer_recommendations(
    db: Session = Depends(get_db),
):

    return db.query(
        FertilizerRecommendation
    ).all()


# ==========================================
# Get Fertilizer Recommendation By ID
# ==========================================

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
        .filter(
            FertilizerRecommendation.id == recommendation_id
        )
        .first()
    )

    if recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Fertilizer recommendation not found",
        )

    return recommendation


# ==========================================
# Update Fertilizer Recommendation
# ==========================================

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
        .filter(
            FertilizerRecommendation.id == recommendation_id
        )
        .first()
    )

    if recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Fertilizer recommendation not found",
        )

    update_data = recommendation_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(recommendation, key, value)

    db.commit()
    db.refresh(recommendation)

    return recommendation


# ==========================================
# Delete Fertilizer Recommendation
# ==========================================

@router.delete("/{recommendation_id}")
def delete_fertilizer_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db),
):

    recommendation = (
        db.query(FertilizerRecommendation)
        .filter(
            FertilizerRecommendation.id == recommendation_id
        )
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