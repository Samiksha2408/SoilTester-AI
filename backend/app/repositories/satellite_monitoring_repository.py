from sqlalchemy.orm import Session

from app.model.satellite_monitoring import SatelliteMonitoring
from app.schemas.satellite_monitoring import (
    SatelliteMonitoringCreate,
    SatelliteMonitoringUpdate,
)


class SatelliteMonitoringRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(SatelliteMonitoring).all()

    @staticmethod
    def get_by_id(
        db: Session,
        monitoring_id: int,
    ):
        return (
            db.query(SatelliteMonitoring)
            .filter(
                SatelliteMonitoring.id == monitoring_id
            )
            .first()
        )

    @staticmethod
    def get_by_soil_report(
        db: Session,
        soil_report_id: int,
    ):
        return (
            db.query(SatelliteMonitoring)
            .filter(
                SatelliteMonitoring.soil_report_id == soil_report_id
            )
            .all()
        )

    @staticmethod
    def get_by_health_status(
        db: Session,
        health_status: str,
    ):
        return (
            db.query(SatelliteMonitoring)
            .filter(
                SatelliteMonitoring.health_status == health_status
            )
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        monitoring: SatelliteMonitoringCreate,
    ):
        db_monitoring = SatelliteMonitoring(
            **monitoring.model_dump()
        )

        db.add(db_monitoring)
        db.commit()
        db.refresh(db_monitoring)

        return db_monitoring

    @staticmethod
    def update(
        db: Session,
        monitoring_id: int,
        monitoring: SatelliteMonitoringUpdate,
    ):
        db_monitoring = (
            db.query(SatelliteMonitoring)
            .filter(
                SatelliteMonitoring.id == monitoring_id
            )
            .first()
        )

        if db_monitoring is None:
            return None

        update_data = monitoring.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_monitoring, key, value)

        db.commit()
        db.refresh(db_monitoring)

        return db_monitoring

    @staticmethod
    def delete(
        db: Session,
        monitoring_id: int,
    ):
        db_monitoring = (
            db.query(SatelliteMonitoring)
            .filter(
                SatelliteMonitoring.id == monitoring_id
            )
            .first()
        )

        if db_monitoring is None:
            return None

        db.delete(db_monitoring)
        db.commit()

        return db_monitoring