from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.oauth2 import get_current_active_user
from app.model.user import User
from app.database import get_db
from app.model.soil_report import SoilReport
from app.schemas.soil_report import (
    SoilReportCreate,
    SoilReportResponse,
    SoilReportUpdate,
)


router = APIRouter(
    prefix="/soil-reports",
    tags=["Soil Reports"]
)


# --------------------------------
# Create Soil Report
# --------------------------------

@router.post(
    "/",
    response_model=SoilReportResponse,
)
def create_soil_report(
    report: SoilReportCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_report = SoilReport(
        user_id=current_user.id,
        **report.model_dump()
    )

    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return db_report


# --------------------------------
# Get All Soil Reports
# --------------------------------

@router.get(
    "/",
    response_model=list[SoilReportResponse]
)
def get_soil_reports(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return (
        db.query(SoilReport)
        .filter(SoilReport.user_id == current_user.id)
        .all()
    )


# --------------------------------
# Get Soil Report By ID
# --------------------------------

@router.get(
    "/{report_id}",
    response_model=SoilReportResponse
)
def get_soil_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    report = (
        db.query(SoilReport)
        .filter(
            SoilReport.id == report_id,
            SoilReport.user_id == current_user.id
        )
        .first()
    )

    if report is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Soil report not found",
        )

    return report


# --------------------------------
# Update Soil Report
# --------------------------------

@router.put(
    "/{report_id}",
    response_model=SoilReportResponse
)
def update_soil_report(
    report_id: int,
    soil_report: SoilReportUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    report = (
        db.query(SoilReport)
        .filter(
            SoilReport.id == report_id,
            SoilReport.user_id == current_user.id
        )
        .first()
    )

    if report is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Soil report not found",
        )

    update_data = soil_report.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(report, key, value)

    db.commit()
    db.refresh(report)

    return report


# --------------------------------
# Delete Soil Report
# --------------------------------

@router.delete("/{report_id}")
def delete_soil_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    report = (
        db.query(SoilReport)
        .filter(
            SoilReport.id == report_id,
            SoilReport.user_id == current_user.id
        )
        .first()
    )

    if report is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Soil report not found",
        )

    db.delete(report)
    db.commit()

    return {
        "message": "Soil report deleted successfully"
    }
