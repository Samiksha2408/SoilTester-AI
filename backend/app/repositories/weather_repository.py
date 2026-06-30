from sqlalchemy.orm import Session

from app.model.weather import Weather
from app.schemas.weather import (
    WeatherCreate,
    WeatherUpdate,
)


class WeatherRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(Weather).all()

    @staticmethod
    def get_by_id(
        db: Session,
        weather_id: int,
    ):
        return (
            db.query(Weather)
            .filter(Weather.id == weather_id)
            .first()
        )

    @staticmethod
    def get_by_location(
        db: Session,
        location: str,
    ):
        return (
            db.query(Weather)
            .filter(Weather.location == location)
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        weather: WeatherCreate,
    ):
        db_weather = Weather(
            **weather.model_dump()
        )

        db.add(db_weather)
        db.commit()
        db.refresh(db_weather)

        return db_weather

    @staticmethod
    def update(
        db: Session,
        weather_id: int,
        weather: WeatherUpdate,
    ):
        db_weather = (
            db.query(Weather)
            .filter(Weather.id == weather_id)
            .first()
        )

        if db_weather is None:
            return None

        update_data = weather.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_weather, key, value)

        db.commit()
        db.refresh(db_weather)

        return db_weather

    @staticmethod
    def delete(
        db: Session,
        weather_id: int,
    ):
        db_weather = (
            db.query(Weather)
            .filter(Weather.id == weather_id)
            .first()
        )

        if db_weather is None:
            return None

        db.delete(db_weather)
        db.commit()

        return db_weather