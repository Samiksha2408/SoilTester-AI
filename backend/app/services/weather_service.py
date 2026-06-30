from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.weather_repository import WeatherRepository
from app.schemas.weather import (
    WeatherCreate,
    WeatherUpdate,
)


class WeatherService:

    @staticmethod
    def get_all_weather(
        db: Session,
    ):
        return WeatherRepository.get_all(db)

    @staticmethod
    def get_weather_by_id(
        db: Session,
        weather_id: int,
    ):
        weather = WeatherRepository.get_by_id(
            db,
            weather_id,
        )

        if weather is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Weather record not found",
            )

        return weather

    @staticmethod
    def get_weather_by_location(
        db: Session,
        location: str,
    ):
        return WeatherRepository.get_by_location(
            db,
            location,
        )

    @staticmethod
    def create_weather(
        db: Session,
        weather: WeatherCreate,
    ):
        return WeatherRepository.create(
            db,
            weather,
        )

    @staticmethod
    def update_weather(
        db: Session,
        weather_id: int,
        weather: WeatherUpdate,
    ):
        existing_weather = WeatherRepository.get_by_id(
            db,
            weather_id,
        )

        if existing_weather is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Weather record not found",
            )

        return WeatherRepository.update(
            db,
            weather_id,
            weather,
        )

    @staticmethod
    def delete_weather(
        db: Session,
        weather_id: int,
    ):
        existing_weather = WeatherRepository.get_by_id(
            db,
            weather_id,
        )

        if existing_weather is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Weather record not found",
            )

        WeatherRepository.delete(
            db,
            weather_id,
        )

        return {
            "message": "Weather record deleted successfully"
        }