from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.plant_disease_repository import (
    PlantDiseaseRepository,
)
from app.schemas.plant_disease import (
    PlantDiseaseCreate,
    PlantDiseaseUpdate,
)


class PlantDiseaseService:

    @staticmethod
    def get_all_plant_diseases(
        db: Session,
    ):
        return PlantDiseaseRepository.get_all(db)

    @staticmethod
    def get_plant_disease_by_id(
        db: Session,
        disease_id: int,
    ):
        disease = PlantDiseaseRepository.get_by_id(
            db,
            disease_id,
        )

        if disease is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Plant disease record not found",
            )

        return disease

    @staticmethod
    def get_diseases_by_soil_report(
        db: Session,
        soil_report_id: int,
    ):
        return PlantDiseaseRepository.get_by_soil_report(
            db,
            soil_report_id,
        )

    @staticmethod
    def create_plant_disease(
        db: Session,
        disease: PlantDiseaseCreate,
    ):
        return PlantDiseaseRepository.create(
            db,
            disease,
        )

    @staticmethod
    def update_plant_disease(
        db: Session,
        disease_id: int,
        disease: PlantDiseaseUpdate,
    ):
        existing_disease = PlantDiseaseRepository.get_by_id(
            db,
            disease_id,
        )

        if existing_disease is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Plant disease record not found",
            )

        return PlantDiseaseRepository.update(
            db,
            disease_id,
            disease,
        )

    @staticmethod
    def delete_plant_disease(
        db: Session,
        disease_id: int,
    ):
        existing_disease = PlantDiseaseRepository.get_by_id(
            db,
            disease_id,
        )

        if existing_disease is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Plant disease record not found",
            )

        PlantDiseaseRepository.delete(
            db,
            disease_id,
        )

        return {
            "message": "Plant disease record deleted successfully"
        }