from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.irrigation import Irrigation
from app.schemas.irrigation import (
    IrrigationCreate,
    IrrigationUpdate,
    IrrigationResponse,
)

router = APIRouter()


# --------------------------------
# Create Irrigation Record
# --------------------------------
@router.post(
    "/",
    response_model=IrrigationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_irrigation(
    irrigation: IrrigationCreate,
    db: Session = Depends(get_db),
):
    new_irrigation = Irrigation(**irrigation.model_dump())

    db.add(new_irrigation)
    db.commit()
    db.refresh(new_irrigation)

    return new_irrigation


# --------------------------------
# Get All Irrigation Records
# --------------------------------
@router.get(
    "/",
    response_model=list[IrrigationResponse],
)
def get_irrigation_records(
    db: Session = Depends(get_db),
):
    return db.query(Irrigation).all()


# --------------------------------
# Get Irrigation Record By ID
# --------------------------------
@router.get(
    "/{irrigation_id}",
    response_model=IrrigationResponse,
)
def get_irrigation(
    irrigation_id: int,
    db: Session = Depends(get_db),
):
    irrigation = (
        db.query(Irrigation)
        .filter(Irrigation.id == irrigation_id)
        .first()
    )

    if irrigation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Irrigation record not found",
        )

    return irrigation


# --------------------------------
# Update Irrigation Record
# --------------------------------
@router.put(
    "/{irrigation_id}",
    response_model=IrrigationResponse,
)
def update_irrigation(
    irrigation_id: int,
    irrigation_data: IrrigationUpdate,
    db: Session = Depends(get_db),
):
    irrigation = (
        db.query(Irrigation)
        .filter(Irrigation.id == irrigation_id)
        .first()
    )

    if irrigation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Irrigation record not found",
        )

    update_data = irrigation_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(irrigation, key, value)

    db.commit()
    db.refresh(irrigation)

    return irrigation


# --------------------------------
# Delete Irrigation Record
# --------------------------------
@router.delete("/{irrigation_id}")
def delete_irrigation(
    irrigation_id: int,
    db: Session = Depends(get_db),
):
    irrigation = (
        db.query(Irrigation)
        .filter(Irrigation.id == irrigation_id)
        .first()
    )

    if irrigation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Irrigation record not found",
        )

    db.delete(irrigation)
    db.commit()

    return {
        "message": "Irrigation record deleted successfully"
    }