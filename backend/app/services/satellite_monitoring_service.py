from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.satellite_monitoring_repository import (
    SatelliteMonitoringRepository,
)
from app.schemas.satellite_monitoring import (
    SatelliteMonitoringCreate,
    SatelliteMonitoringUpdate,
)


class SatelliteMonitoringService:

    @staticmethod
    def get_all_satellite_records(
        db: Session,
    ):
        return SatelliteMonitoringRepository.get_all(db)

    @staticmethod
    def get_satellite_record_by_id(
        db: Session,
        monitoring_id: int,
    ):
        record = (
            SatelliteMonitoringRepository.get_by_id(
                db,
                monitoring_id,
            )
        )

        if record is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Satellite monitoring record not found",
            )

        return record

    @staticmethod
    def get_satellite_records_by_soil_report(
        db: Session,
        soil_report_id: int,
    ):
        return (
            SatelliteMonitoringRepository.get_by_soil_report(
                db,
                soil_report_id,
            )
        )

    @staticmethod
    def get_satellite_records_by_health_status(
        db: Session,
        health_status: str,
    ):
        return (
            SatelliteMonitoringRepository.get_by_health_status(
                db,
                health_status,
            )
        )

    @staticmethod
    def create_satellite_record(
        db: Session,
        monitoring: SatelliteMonitoringCreate,
    ):
        return SatelliteMonitoringRepository.create(
            db,
            monitoring,
        )

    @staticmethod
    def update_satellite_record(
        db: Session,
        monitoring_id: int,
        monitoring: SatelliteMonitoringUpdate,
    ):
        existing_record = (
            SatelliteMonitoringRepository.get_by_id(
                db,
                monitoring_id,
            )
        )

        if existing_record is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Satellite monitoring record not found",
            )

        return SatelliteMonitoringRepository.update(
            db,
            monitoring_id,
            monitoring,
        )

    @staticmethod
    def delete_satellite_record(
        db: Session,
        monitoring_id: int,
    ):
        existing_record = (
            SatelliteMonitoringRepository.get_by_id(
                db,
                monitoring_id,
            )
        )

        if existing_record is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Satellite monitoring record not found",
            )

        SatelliteMonitoringRepository.delete(
            db,
            monitoring_id,
        )

        return {
            "message": (
                "Satellite monitoring record deleted successfully"
            )
        }