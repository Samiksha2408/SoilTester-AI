from sqlalchemy.orm import Session

from app.model.irrigation import Irrigation
from app.schemas.irrigation import (
    IrrigationCreate,
    IrrigationUpdate,
)


class IrrigationRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(Irrigation).all()

    @staticmethod
    def get_by_id(
        db: Session,
        irrigation_id: int,
    ):
        return (
            db.query(Irrigation)
            .filter(Irrigation.id == irrigation_id)
            .first()
        )

    @staticmethod
    def get_by_soil_report(
        db: Session,
        soil_report_id: int,
    ):
        return (
            db.query(Irrigation)
            .filter(
                Irrigation.soil_report_id == soil_report_id
            )
            .all()
        )

    @staticmethod
    def get_by_crop(
        db: Session,
        crop_name: str,
    ):
        return (
            db.query(Irrigation)
            .filter(
                Irrigation.crop_name == crop_name
            )
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        irrigation: IrrigationCreate,
    ):
        db_irrigation = Irrigation(
            **irrigation.model_dump()
        )

        db.add(db_irrigation)
        db.commit()
        db.refresh(db_irrigation)

        return db_irrigation

    @staticmethod
    def update(
        db: Session,
        irrigation_id: int,
        irrigation: IrrigationUpdate,
    ):
        db_irrigation = (
            db.query(Irrigation)
            .filter(Irrigation.id == irrigation_id)
            .first()
        )

        if db_irrigation is None:
            return None

        update_data = irrigation.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_irrigation, key, value)

        db.commit()
        db.refresh(db_irrigation)

        return db_irrigation

    @staticmethod
    def delete(
        db: Session,
        irrigation_id: int,
    ):
        db_irrigation = (
            db.query(Irrigation)
            .filter(Irrigation.id == irrigation_id)
            .first()
        )

        if db_irrigation is None:
            return None

        db.delete(db_irrigation)
        db.commit()

        return db_irrigation
        