from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.irrigation_repository import (
    IrrigationRepository,
)
from app.schemas.irrigation import (
    IrrigationCreate,
    IrrigationUpdate,
)


class IrrigationService:

    @staticmethod
    def get_all_irrigation_records(
        db: Session,
    ):
        return IrrigationRepository.get_all(db)

    @staticmethod
    def get_irrigation_by_id(
        db: Session,
        irrigation_id: int,
    ):
        irrigation = IrrigationRepository.get_by_id(
            db,
            irrigation_id,
        )

        if irrigation is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Irrigation record not found",
            )

        return irrigation

    @staticmethod
    def get_irrigation_by_soil_report(
        db: Session,
        soil_report_id: int,
    ):
        return IrrigationRepository.get_by_soil_report(
            db,
            soil_report_id,
        )

    @staticmethod
    def create_irrigation(
        db: Session,
        irrigation: IrrigationCreate,
    ):
        return IrrigationRepository.create(
            db,
            irrigation,
        )

    @staticmethod
    def update_irrigation(
        db: Session,
        irrigation_id: int,
        irrigation: IrrigationUpdate,
    ):
        existing_irrigation = (
            IrrigationRepository.get_by_id(
                db,
                irrigation_id,
            )
        )

        if existing_irrigation is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Irrigation record not found",
            )

        return IrrigationRepository.update(
            db,
            irrigation_id,
            irrigation,
        )

    @staticmethod
    def delete_irrigation(
        db: Session,
        irrigation_id: int,
    ):
        existing_irrigation = (
            IrrigationRepository.get_by_id(
                db,
                irrigation_id,
            )
        )

        if existing_irrigation is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Irrigation record not found",
            )

        IrrigationRepository.delete(
            db,
            irrigation_id,
        )

        return {
            "message": "Irrigation record deleted successfully"
        }