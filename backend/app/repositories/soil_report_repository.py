from sqlalchemy.orm import Session

from app.model.soil_report import SoilReport
from app.schemas.soil_report import (
    SoilReportCreate,
    SoilReportUpdate,
)


class SoilReportRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(SoilReport).all()

    @staticmethod
    def get_by_id(
        db: Session,
        report_id: int,
    ):
        return (
            db.query(SoilReport)
            .filter(SoilReport.id == report_id)
            .first()
        )

    @staticmethod
    def get_by_user(
        db: Session,
        user_id: int,
    ):
        return (
            db.query(SoilReport)
            .filter(SoilReport.user_id == user_id)
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        report: SoilReportCreate,
    ):
        db_report = SoilReport(
            **report.model_dump()
        )

        db.add(db_report)
        db.commit()
        db.refresh(db_report)

        return db_report

    @staticmethod
    def update(
        db: Session,
        report_id: int,
        report: SoilReportUpdate,
    ):
        db_report = (
            db.query(SoilReport)
            .filter(SoilReport.id == report_id)
            .first()
        )

        if db_report is None:
            return None

        update_data = report.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_report, key, value)

        db.commit()
        db.refresh(db_report)

        return db_report

    @staticmethod
    def delete(
        db: Session,
        report_id: int,
    ):
        db_report = (
            db.query(SoilReport)
            .filter(SoilReport.id == report_id)
            .first()
        )

        if db_report is None:
            return None

        db.delete(db_report)
        db.commit()

        return db_report