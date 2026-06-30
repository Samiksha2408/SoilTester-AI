from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.soil_report import SoilReport
from app.schemas.soil_report import (
    SoilReportCreate,
    SoilReportUpdate,
    SoilReportResponse,
)

router = APIRouter()


# --------------------------------
# Create Soil Report
# --------------------------------
@router.post(
    "/",
    response_model=SoilReportResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_soil_report(
    soil_report: SoilReportCreate,
    db: Session = Depends(get_db),
):
    new_report = SoilReport(**soil_report.model_dump())

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return new_report


# --------------------------------
# Get All Soil Reports
# --------------------------------
@router.get("/", response_model=list[SoilReportResponse])
def get_soil_reports(db: Session = Depends(get_db)):
    return db.query(SoilReport).all()


# --------------------------------
# Get Soil Report By ID
# --------------------------------
@router.get("/{report_id}", response_model=SoilReportResponse)
def get_soil_report(
    report_id: int,
    db: Session = Depends(get_db),
):
    report = (
        db.query(SoilReport)
        .filter(SoilReport.id == report_id)
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
@router.put("/{report_id}", response_model=SoilReportResponse)
def update_soil_report(
    report_id: int,
    soil_report: SoilReportUpdate,
    db: Session = Depends(get_db),
):
    report = (
        db.query(SoilReport)
        .filter(SoilReport.id == report_id)
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
):
    report = (
        db.query(SoilReport)
        .filter(SoilReport.id == report_id)
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