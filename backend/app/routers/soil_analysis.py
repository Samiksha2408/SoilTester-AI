from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.soil_analysis import (
    SoilAnalysisRequest,
    SoilAnalysisResponse,
)

from app.services.soil_analysis_service import SoilAnalysisService


router = APIRouter()


@router.post(
    "/",
    response_model=SoilAnalysisResponse,
)
def analyze_soil(
    data: SoilAnalysisRequest,
    db: Session = Depends(get_db),
):

    return SoilAnalysisService.analyze(
        db=db,
        soil_report_id=data.soil_report_id,
        temperature=data.temperature,
        humidity=data.humidity,
        rainfall=data.rainfall,
    )