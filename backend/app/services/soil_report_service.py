from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.soil_report_repository import SoilReportRepository
from app.schemas.soil_report import (
    SoilReportCreate,
    SoilReportUpdate,
)


class SoilReportService:

    @staticmethod
    def get_all_soil_reports(db: Session):
        return SoilReportRepository.get_all(db)

    @staticmethod
    def get_soil_report_by_id(
        db: Session,
        report_id: int,
    ):
        report = SoilReportRepository.get_by_id(
            db,
            report_id,
        )

        if report is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Soil report not found",
            )

        return report

    @staticmethod
    def get_soil_reports_by_user(
        db: Session,
        user_id: int,
    ):
        return SoilReportRepository.get_by_user(
            db,
            user_id,
        )

    @staticmethod
    def create_soil_report(
        db: Session,
        report: SoilReportCreate,
    ):
        return SoilReportRepository.create(
            db,
            report,
        )

    @staticmethod
    def update_soil_report(
        db: Session,
        report_id: int,
        report: SoilReportUpdate,
    ):
        existing_report = SoilReportRepository.get_by_id(
            db,
            report_id,
        )

        if existing_report is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Soil report not found",
            )

        return SoilReportRepository.update(
            db,
            report_id,
            report,
        )

    @staticmethod
    def delete_soil_report(
        db: Session,
        report_id: int,
    ):
        existing_report = SoilReportRepository.get_by_id(
            db,
            report_id,
        )

        if existing_report is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Soil report not found",
            )

        SoilReportRepository.delete(
            db,
            report_id,
        )

        return {
            "message": "Soil report deleted successfully"
        }
    