from sqlalchemy.orm import Session

from app.model.plant_disease import PlantDisease
from app.schemas.plant_disease import (
    PlantDiseaseCreate,
    PlantDiseaseUpdate,
)


class PlantDiseaseRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(PlantDisease).all()

    @staticmethod
    def get_by_id(
        db: Session,
        disease_id: int,
    ):
        return (
            db.query(PlantDisease)
            .filter(PlantDisease.id == disease_id)
            .first()
        )

    @staticmethod
    def get_by_soil_report(
        db: Session,
        soil_report_id: int,
    ):
        return (
            db.query(PlantDisease)
            .filter(
                PlantDisease.soil_report_id == soil_report_id
            )
            .all()
        )

    @staticmethod
    def get_by_disease_name(
        db: Session,
        disease_name: str,
    ):
        return (
            db.query(PlantDisease)
            .filter(
                PlantDisease.disease_name == disease_name
            )
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        disease: PlantDiseaseCreate,
    ):
        db_disease = PlantDisease(
            **disease.model_dump()
        )

        db.add(db_disease)
        db.commit()
        db.refresh(db_disease)

        return db_disease

    @staticmethod
    def update(
        db: Session,
        disease_id: int,
        disease: PlantDiseaseUpdate,
    ):
        db_disease = (
            db.query(PlantDisease)
            .filter(PlantDisease.id == disease_id)
            .first()
        )

        if db_disease is None:
            return None

        update_data = disease.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_disease, key, value)

        db.commit()
        db.refresh(db_disease)

        return db_disease

    @staticmethod
    def delete(
        db: Session,
        disease_id: int,
    ):
        db_disease = (
            db.query(PlantDisease)
            .filter(PlantDisease.id == disease_id)
            .first()
        )

        if db_disease is None:
            return None

        db.delete(db_disease)
        db.commit()

        return db_disease