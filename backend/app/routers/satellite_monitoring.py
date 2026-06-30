from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.satellite_monitoring import SatelliteMonitoring
from app.schemas.satellite_monitoring import (
    SatelliteMonitoringCreate,
    SatelliteMonitoringUpdate,
    SatelliteMonitoringResponse,
)

router = APIRouter()


# --------------------------------
# Create Satellite Monitoring Record
# --------------------------------
@router.post(
    "/",
    response_model=SatelliteMonitoringResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_satellite_monitoring(
    monitoring: SatelliteMonitoringCreate,
    db: Session = Depends(get_db),
):
    new_monitoring = SatelliteMonitoring(**monitoring.model_dump())

    db.add(new_monitoring)
    db.commit()
    db.refresh(new_monitoring)

    return new_monitoring


# --------------------------------
# Get All Satellite Monitoring Records
# --------------------------------
@router.get(
    "/",
    response_model=list[SatelliteMonitoringResponse],
)
def get_satellite_monitoring_records(
    db: Session = Depends(get_db),
):
    return db.query(SatelliteMonitoring).all()


# --------------------------------
# Get Satellite Monitoring Record By ID
# --------------------------------
@router.get(
    "/{monitoring_id}",
    response_model=SatelliteMonitoringResponse,
)
def get_satellite_monitoring(
    monitoring_id: int,
    db: Session = Depends(get_db),
):
    monitoring = (
        db.query(SatelliteMonitoring)
        .filter(SatelliteMonitoring.id == monitoring_id)
        .first()
    )

    if monitoring is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Satellite monitoring record not found",
        )

    return monitoring


# --------------------------------
# Update Satellite Monitoring Record
# --------------------------------
@router.put(
    "/{monitoring_id}",
    response_model=SatelliteMonitoringResponse,
)
def update_satellite_monitoring(
    monitoring_id: int,
    monitoring_data: SatelliteMonitoringUpdate,
    db: Session = Depends(get_db),
):
    monitoring = (
        db.query(SatelliteMonitoring)
        .filter(SatelliteMonitoring.id == monitoring_id)
        .first()
    )

    if monitoring is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Satellite monitoring record not found",
        )

    update_data = monitoring_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(monitoring, key, value)

    db.commit()
    db.refresh(monitoring)

    return monitoring


# --------------------------------
# Delete Satellite Monitoring Record
# --------------------------------
@router.delete("/{monitoring_id}")
def delete_satellite_monitoring(
    monitoring_id: int,
    db: Session = Depends(get_db),
):
    monitoring = (
        db.query(SatelliteMonitoring)
        .filter(SatelliteMonitoring.id == monitoring_id)
        .first()
    )

    if monitoring is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Satellite monitoring record not found",
        )

    db.delete(monitoring)
    db.commit()

    return {
        "message": "Satellite monitoring record deleted successfully"
    }