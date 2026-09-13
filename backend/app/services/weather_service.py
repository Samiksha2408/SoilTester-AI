
import os
from typing import Any

import httpx
from dotenv import load_dotenv
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.weather_repository import WeatherRepository
from app.schemas.weather import WeatherCreate, WeatherUpdate

# Existing ML weather model
from app.ml_models.weather_prediction.predictor import weather_predictor

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

OPENWEATHER_FORECAST_URL = (
    "https://api.openweathermap.org/data/2.5/forecast"
)


class WeatherService:

    # ============================================================
    # EXISTING DATABASE CRUD
    # ============================================================

    @staticmethod
    def get_all_weather(db: Session):
        return WeatherRepository.get_all(db)

    @staticmethod
    def get_weather_by_id(db: Session, weather_id: int):
        weather = WeatherRepository.get_by_id(db, weather_id)

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

    # ============================================================
    # OPENWEATHER
    # ============================================================

    @staticmethod
    async def get_forecast(city: str) -> dict[str, Any]:

        if not OPENWEATHER_API_KEY:
            raise HTTPException(
                status_code=500,
                detail="OPENWEATHER_API_KEY is not configured",
            )

        params = {
            "q": city,
            "appid": OPENWEATHER_API_KEY,
            "units": "metric",
        }

        try:
            async with httpx.AsyncClient() as client:

                response = await client.get(
                    OPENWEATHER_FORECAST_URL,
                    params=params,
                    timeout=15,
                )

            if response.status_code == 401:
                raise HTTPException(
                    status_code=500,
                    detail="Invalid OpenWeather API key",
                )

            if response.status_code == 404:
                raise HTTPException(
                    status_code=404,
                    detail=f"Location '{city}' not found",
                )

            response.raise_for_status()

            return response.json()

        except httpx.TimeoutException:
            raise HTTPException(
                status_code=504,
                detail="Weather service timed out",
            )

        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=502,
                detail=f"OpenWeather error: {str(e)}",
            )

    # ============================================================
    # CROP RECOMMENDATION
    # ============================================================

    @staticmethod
    def get_crop_recommendations(
        temperature: float,
        rainfall: float,
        humidity: float,
    ):

        crop_requirements = {

            "Rice": {
                "min_temp": 20,
                "max_temp": 35,
                "min_rain": 5,
                "max_rain": 30,
            },

            "Soybean": {
                "min_temp": 20,
                "max_temp": 32,
                "min_rain": 5,
                "max_rain": 25,
            },

            "Maize": {
                "min_temp": 18,
                "max_temp": 32,
                "min_rain": 3,
                "max_rain": 20,
            },

            "Cotton": {
                "min_temp": 21,
                "max_temp": 35,
                "min_rain": 3,
                "max_rain": 20,
            },

            "Wheat": {
                "min_temp": 10,
                "max_temp": 25,
                "min_rain": 2,
                "max_rain": 10,
            },

            "Bajra": {
                "min_temp": 25,
                "max_temp": 35,
                "min_rain": 1,
                "max_rain": 12,
            },
        }

        recommendations = []

        for crop, req in crop_requirements.items():

            score = 100
            reasons = []

            # Temperature
            if temperature < req["min_temp"]:
                score -= 30
                reasons.append("temperature is below preferred range")

            elif temperature > req["max_temp"]:
                score -= 30
                reasons.append("temperature is above preferred range")

            else:
                reasons.append("temperature is suitable")

            # Rainfall
            if rainfall < req["min_rain"]:
                score -= 25
                reasons.append("rainfall is low")

            elif rainfall > req["max_rain"]:
                score -= 25
                reasons.append("rainfall is high")

            else:
                reasons.append("rainfall is suitable")

            # Humidity
            if humidity > 90:
                score -= 10
                reasons.append("very high humidity")

            score = max(0, min(100, score))

            if score >= 50:

                recommendations.append({
                    "crop": crop,
                    "suitability": score,
                    "reason": "; ".join(reasons),
                })

        recommendations.sort(
            key=lambda x: x["suitability"],
            reverse=True,
        )

        return recommendations[:5]

    # ============================================================
    # WEATHER ALERTS
    # ============================================================

    @staticmethod
    def generate_alerts(
        temperature: float,
        rainfall: float,
        rain_probability: float,
        humidity: float,
        wind_speed: float,
    ):

        alerts = []

        # Heavy rain
        if rainfall >= 20 or rain_probability >= 80:

            alerts.append({
                "type": "heavy_rain",
                "severity": "high",
                "message": (
                    "Heavy rainfall is expected. "
                    "Avoid unnecessary irrigation and "
                    "check farm drainage."
                ),
            })

        # Extreme heat
        if temperature >= 38:

            alerts.append({
                "type": "heat",
                "severity": "high",
                "message": (
                    "High temperature is expected. "
                    "Monitor crops for heat stress "
                    "and maintain adequate soil moisture."
                ),
            })

        # Dry conditions
        if temperature >= 32 and rainfall < 1:

            alerts.append({
                "type": "drought_risk",
                "severity": "medium",
                "message": (
                    "Hot and dry conditions are expected. "
                    "Monitor soil moisture and irrigation."
                ),
            })

        # Strong wind
        if wind_speed >= 10:

            alerts.append({
                "type": "strong_wind",
                "severity": "medium",
                "message": (
                    "Strong winds are expected. "
                    "Protect young plants and supported crops."
                ),
            })

        # High humidity
        if humidity >= 85:

            alerts.append({
                "type": "high_humid ity",
                "severity": "medium",
                "message": (
                    "High humidity may increase fungal "
                    "disease risk. Monitor crop leaves."
                ),
            })

        return alerts

    # ============================================================
    # IRRIGATION ADVICE
    # ============================================================

    @staticmethod
    def get_irrigation_advice(
        rainfall: float,
        rain_probability: float,
        temperature: float,
        humidity: float,
    ):

        # Rain expected
        if rainfall >= 5 or rain_probability >= 70:

            return {
                "action": "avoid_irrigation",
                "status": "Rain expected",
                "message": (
                    "Avoid unnecessary irrigation because "
                    "rainfall is expected."
                ),
            }

        # Hot and dry
        if temperature >= 32 and humidity < 60:

            return {
                "action": "irrigate",
                "status": "High water requirement",
                "message": (
                    "Hot and relatively dry conditions are "
                    "expected. Check soil moisture and "
                    "irrigate if required."
                ),
            }

        # Normal
        return {
            "action": "monitor",
            "status": "Normal",
            "message": (
                "Monitor soil moisture before irrigation."
            ),
        }

    # ============================================================
    # EXISTING ML MODEL
    # ============================================================

    @staticmethod
    def run_ml_prediction(
        temperature: float,
        humidity: float,
        wind_bearing: float,
        visibility: float,
        wind_speed: float,
        pressure: float,
    ):

        try:

            prediction = weather_predictor.predict(
                temperature=temperature,
                humidity=humidity,
                wind_bearing=wind_bearing,
                visibility=visibility,
                wind_speed=wind_speed,
                pressure=pressure,
            )

            return {
                "status": "success",
                "prediction": prediction,
            }

        except Exception as e:

            return {
                "status": "failed",
                "prediction": None,
                "error": str(e),
            }

    # ============================================================
    # FARMER ADVICE
    # ============================================================

    @staticmethod
    def generate_farmer_advice(
        crops,
        alerts,
        irrigation,
    ):

        advice = []

        # Crop
        if crops:

            best_crop = crops[0]

            advice.append(
                f"Best weather-suitable crop: "
                f"{best_crop['crop']} "
                f"({best_crop['suitability']}% suitability)."
            )

        # Alerts
        if alerts:

            for alert in alerts:

                advice.append(
                    f"{alert['severity'].upper()} ALERT: "
                    f"{alert['message']}"
                )

        else:

            advice.append(
                "No major weather alerts detected."
            )

        # Irrigation
        advice.append(
            f"Irrigation advice: "
            f"{irrigation['message']}"
        )

        advice.append(
            "Use soil conditions, crop stage, and "
            "local agricultural guidance before making "
            "final farming decisions."
        )

        return advice

    # ============================================================
    # COMPLETE WEATHER DASHBOARD
    # ============================================================

    @staticmethod
    async def get_weather_dashboard(
        city: str,
    ):

        # --------------------------------------------------------
        # 1. Get real OpenWeather forecast
        # --------------------------------------------------------

        forecast_data = await WeatherService.get_forecast(
            city
        )

        forecast_list = forecast_data.get(
            "list",
            []
        )

        if not forecast_list:

            raise HTTPException(
                status_code=404,
                detail="No weather forecast available",
            )

        # First forecast period
        current = forecast_list[0]

        main = current.get(
            "main",
            {}
        )

        wind = current.get(
            "wind",
            {}
        )

        weather = current.get(
            "weather",
            [{}]
        )[0]

        temperature = float(
            main.get("temp", 0)
        )

        humidity = float(
            main.get("humidity", 0)
        )

        pressure = float(
            main.get("pressure", 0)
        )

        wind_speed = float(
            wind.get("speed", 0)
        )

        wind_bearing = float(
            wind.get("deg", 0)
        )

        visibility = float(
            current.get("visibility", 0)
        )

        rainfall = float(
            current.get(
                "rain",
                {}
            ).get(
                "3h",
                0
            )
        )

        rain_probability = float(
            current.get("pop", 0)
        ) * 100

        condition = weather.get(
            "description",
            "unknown"
        )

        # --------------------------------------------------------
        # 2. Run EXISTING ML model
        # --------------------------------------------------------

        ml_prediction = WeatherService.run_ml_prediction(
            temperature=temperature,
            humidity=humidity,
            wind_bearing=wind_bearing,
            visibility=visibility,
            wind_speed=wind_speed,
            pressure=pressure,
        )

        # --------------------------------------------------------
        # 3. Crop recommendation
        # --------------------------------------------------------

        crops = WeatherService.get_crop_recommendations(
            temperature=temperature,
            rainfall=rainfall,
            humidity=humidity,
        )

        # --------------------------------------------------------
        # 4. Alerts
        # --------------------------------------------------------

        alerts = WeatherService.generate_alerts(
            temperature=temperature,
            rainfall=rainfall,
            rain_probability=rain_probability,
            humidity=humidity,
            wind_speed=wind_speed,
        )

        # --------------------------------------------------------
        # 5. Irrigation
        # --------------------------------------------------------

        irrigation = WeatherService.get_irrigation_advice(
            rainfall=rainfall,
            rain_probability=rain_probability,
            temperature=temperature,
            humidity=humidity,
        )

        # --------------------------------------------------------
        # 6. Farmer advice
        # --------------------------------------------------------

        farmer_advice = WeatherService.generate_farmer_advice(
            crops=crops,
            alerts=alerts,
            irrigation=irrigation,
        )

        # --------------------------------------------------------
        # 7. Return complete result
        # --------------------------------------------------------

        city_data = forecast_data.get(
            "city",
            {}
        )

        return {

            "location": city_data.get(
                "name",
                city,
            ),

            "country": city_data.get(
                "country",
                "",
            ),

            "weather": {

                "temperature": temperature,

                "humidity": humidity,

                "rainfall": rainfall,

                "rain_probability": round(
                    rain_probability,
                    2,
                ),

                "wind_speed": wind_speed,

                "wind_bearing": wind_bearing,

                "visibility": visibility,

                "pressure": pressure,

                "condition": condition,
            },

            "ml_prediction": ml_prediction,

            "recommended_crops": crops,

            "alerts": alerts,

            "irrigation": irrigation,

            "farmer_advice": farmer_advice,
        }

