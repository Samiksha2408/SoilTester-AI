from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.weather import Weather
from app.schemas.weather import (
    WeatherCreate,
    WeatherUpdate,
    WeatherResponse,
)

router = APIRouter()


# --------------------------------
# Create Weather Record
# --------------------------------
@router.post(
    "/",
    response_model=WeatherResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_weather(
    weather: WeatherCreate,
    db: Session = Depends(get_db),
):
    new_weather = Weather(**weather.model_dump())

    db.add(new_weather)
    db.commit()
    db.refresh(new_weather)

    return new_weather


# --------------------------------
# Get All Weather Records
# --------------------------------
@router.get(
    "/",
    response_model=list[WeatherResponse],
)
def get_weather_records(
    db: Session = Depends(get_db),
):
    return db.query(Weather).all()


# --------------------------------
# Get Weather Record By ID
# --------------------------------
@router.get(
    "/{weather_id}",
    response_model=WeatherResponse,
)
def get_weather(
    weather_id: int,
    db: Session = Depends(get_db),
):
    weather = (
        db.query(Weather)
        .filter(Weather.id == weather_id)
        .first()
    )

    if weather is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Weather record not found",
        )

    return weather


# --------------------------------
# Update Weather Record
# --------------------------------
@router.put(
    "/{weather_id}",
    response_model=WeatherResponse,
)
def update_weather(
    weather_id: int,
    weather_data: WeatherUpdate,
    db: Session = Depends(get_db),
):
    weather = (
        db.query(Weather)
        .filter(Weather.id == weather_id)
        .first()
    )

    if weather is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Weather record not found",
        )

    update_data = weather_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(weather, key, value)

    db.commit()
    db.refresh(weather)

    return weather


# --------------------------------
# Delete Weather Record
# --------------------------------
@router.delete("/{weather_id}")
def delete_weather(
    weather_id: int,
    db: Session = Depends(get_db),
):
    weather = (
        db.query(Weather)
        .filter(Weather.id == weather_id)
        .first()
    )

    if weather is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Weather record not found",
        )

    db.delete(weather)
    db.commit()

    return {
        "message": "Weather record deleted successfully"
    }
