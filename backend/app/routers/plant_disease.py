from fastapi import APIRouter, Depends, HTTPException, status,UploadFile, File
import os
import shutil
import tempfile
from app.ml_models.plant_disease.predictor import plant_disease_predictor
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.plant_disease import PlantDisease
from app.schemas.plant_disease import (
    PlantDiseaseCreate,
    PlantDiseaseUpdate,
    PlantDiseaseResponse,
)

router = APIRouter()


# --------------------------------
# Create Plant Disease Record
# --------------------------------
@router.post(
    "/",
    response_model=PlantDiseaseResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_plant_disease(
    disease: PlantDiseaseCreate,
    db: Session = Depends(get_db),
):
    new_disease = PlantDisease(**disease.model_dump())

    db.add(new_disease)
    db.commit()
    db.refresh(new_disease)

    return new_disease


# --------------------------------
# Get All Plant Disease Records
# --------------------------------
@router.get(
    "/",
    response_model=list[PlantDiseaseResponse],
)
def get_plant_diseases(
    db: Session = Depends(get_db),
):
    return db.query(PlantDisease).all()


@router.post("/predict")
async def predict_plant_disease(
    image: UploadFile = File(...)
):
    # Check file type
    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/jpg",
    }

    if image.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPG and PNG images are allowed"
        )

    # Create temporary file
    suffix = os.path.splitext(image.filename or "")[1]

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix
    ) as temp_file:

        shutil.copyfileobj(
            image.file,
            temp_file
        )

        temp_path = temp_file.name

    try:
        # Run ML prediction
        result = plant_disease_predictor.predict(
            temp_path
        )

        return {
            "success": True,
            "filename": image.filename,
            "disease": result["disease"],
            "confidence": result["confidence"],
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )

    finally:
        # Delete temporary image
        if os.path.exists(temp_path):
            os.remove(temp_path)

            
# --------------------------------
# Get Plant Disease By ID
# --------------------------------
@router.get(
    "/{disease_id}",
    response_model=PlantDiseaseResponse,
)
def get_plant_disease(
    disease_id: int,
    db: Session = Depends(get_db),
):
    disease = (
        db.query(PlantDisease)
        .filter(PlantDisease.id == disease_id)
        .first()
    )

    if disease is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plant disease record not found",
        )

    return disease


# --------------------------------
# Update Plant Disease
# --------------------------------
@router.put(
    "/{disease_id}",
    response_model=PlantDiseaseResponse,
)
def update_plant_disease(
    disease_id: int,
    disease_data: PlantDiseaseUpdate,
    db: Session = Depends(get_db),
):
    disease = (
        db.query(PlantDisease)
        .filter(PlantDisease.id == disease_id)
        .first()
    )

    if disease is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plant disease record not found",
        )

    update_data = disease_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(disease, key, value)

    db.commit()
    db.refresh(disease)

    return disease


# --------------------------------
# Delete Plant Disease
# --------------------------------
@router.delete("/{disease_id}")
def delete_plant_disease(
    disease_id: int,
    db: Session = Depends(get_db),
):
    disease = (
        db.query(PlantDisease)
        .filter(PlantDisease.id == disease_id)
        .first()
    )

    if disease is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plant disease record not found",
        )

    db.delete(disease)
    db.commit()

    return {
        "message": "Plant disease record deleted successfully"
    }