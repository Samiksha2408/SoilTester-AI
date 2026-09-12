from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.model.soil_report import SoilReport
from app.ml_models.crop_recommendation.predictor import crop_predictor
from app.ml_models.fertilizer_recommendation.predictor import fertilizer_predictor


class SoilAnalysisService:

    @staticmethod
    def analyze(
        db: Session,
        soil_report_id: int,
        temperature: float,
        humidity: float,
        rainfall: float,
    ):

        # -----------------------------------------
        # 1. Get soil report
        # -----------------------------------------

        soil_report = (
            db.query(SoilReport)
            .filter(SoilReport.id == soil_report_id)
            .first()
        )

        if soil_report is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Soil report not found",
            )

        # -----------------------------------------
        # 2. Validate required soil values
        # -----------------------------------------

        required_values = {
            "nitrogen": soil_report.nitrogen,
            "phosphorus": soil_report.phosphorus,
            "potassium": soil_report.potassium,
            "ph": soil_report.ph,
            "moisture": soil_report.moisture,
        }

        missing_values = [
            name
            for name, value in required_values.items()
            if value is None
        ]

        if missing_values:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Missing soil values: {missing_values}",
            )

        # -----------------------------------------
        # 3. Soil nutrient status
        # -----------------------------------------

        nitrogen_status = SoilAnalysisService.nutrient_status(
            soil_report.nitrogen,
            low=40,
            high=80,
        )

        phosphorus_status = SoilAnalysisService.nutrient_status(
            soil_report.phosphorus,
            low=20,
            high=50,
        )

        potassium_status = SoilAnalysisService.nutrient_status(
            soil_report.potassium,
            low=20,
            high=50,
        )

        moisture_status = SoilAnalysisService.nutrient_status(
            soil_report.moisture,
            low=20,
            high=60,
        )

        # -----------------------------------------
        # 4. pH status
        # -----------------------------------------

        ph = soil_report.ph

        if ph < 5.5:
            ph_status = "Acidic"
        elif ph <= 7.5:
            ph_status = "Optimal"
        else:
            ph_status = "Alkaline"

        # -----------------------------------------
        # 5. Organic carbon status
        # -----------------------------------------

        organic_carbon = soil_report.organic_carbon

        if organic_carbon is None:
            organic_carbon_status = "Not available"
        elif organic_carbon < 0.5:
            organic_carbon_status = "Low"
        elif organic_carbon <= 0.75:
            organic_carbon_status = "Moderate"
        else:
            organic_carbon_status = "Good"

        # -----------------------------------------
        # 6. Calculate soil health score
        # -----------------------------------------

        score = 0

        # pH
        if 5.5 <= ph <= 7.5:
            score += 20
        elif 5.0 <= ph <= 8.0:
            score += 12
        else:
            score += 5

        # Nitrogen
        score += SoilAnalysisService.score_value(
            soil_report.nitrogen,
            40,
            80,
            15,
        )

        # Phosphorus
        score += SoilAnalysisService.score_value(
            soil_report.phosphorus,
            20,
            50,
            15,
        )

        # Potassium
        score += SoilAnalysisService.score_value(
            soil_report.potassium,
            20,
            50,
            15,
        )

        # Moisture
        score += SoilAnalysisService.score_value(
            soil_report.moisture,
            20,
            60,
            15,
        )

        # Organic carbon
        if organic_carbon is not None:
            score += SoilAnalysisService.score_value(
                organic_carbon,
                0.5,
                0.75,
                20,
            )

        score = min(round(score), 100)

        # -----------------------------------------
        # 7. Soil condition
        # -----------------------------------------

        if score >= 80:
            condition = "Excellent"
        elif score >= 65:
            condition = "Good"
        elif score >= 50:
            condition = "Moderate"
        else:
            condition = "Poor"

        # -----------------------------------------
        # 8. Crop ML prediction
        # -----------------------------------------

        try:

            predicted_crop = crop_predictor.predict(
                nitrogen=soil_report.nitrogen,
                phosphorus=soil_report.phosphorus,
                potassium=soil_report.potassium,
                temperature=temperature,
                humidity=humidity,
                ph=soil_report.ph,
                rainfall=rainfall,
            )

        except Exception as e:

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Crop prediction failed: {str(e)}",
            )

        predicted_crop = str(predicted_crop)

        # -----------------------------------------
        # 9. Fertilizer ML prediction
        # -----------------------------------------

        soil_type = soil_report.soil_type or "Sandy"

        try:

            predicted_fertilizer = fertilizer_predictor.predict(
                temperature=temperature,
                humidity=humidity,
                moisture=soil_report.moisture,
                soil_type=soil_type,
                crop_type=predicted_crop,
                nitrogen=soil_report.nitrogen,
                potassium=soil_report.potassium,
                phosphorus=soil_report.phosphorus,
            )

        except ValueError as e:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e),
            )

        except Exception as e:

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Fertilizer prediction failed: {str(e)}",
            )

        # -----------------------------------------
        # 10. Recommendations
        # -----------------------------------------

        recommendations = []

        if nitrogen_status == "Low":
            recommendations.append(
                "Nitrogen is low. Consider nitrogen management based on local soil-test guidance."
            )

        if phosphorus_status == "Low":
            recommendations.append(
                "Phosphorus is low. Consider phosphorus management based on local soil-test guidance."
            )

        if potassium_status == "Low":
            recommendations.append(
                "Potassium is low. Consider potassium management based on local soil-test guidance."
            )

        if organic_carbon_status == "Low":
            recommendations.append(
                "Organic carbon is low. Consider adding suitable organic matter."
            )

        if not recommendations:
            recommendations.append(
                "Soil nutrient levels are generally within the evaluated ranges."
            )

        # -----------------------------------------
        # 11. Warnings
        # -----------------------------------------

        warnings = []

        if ph < 5.0:
            warnings.append(
                "Soil is strongly acidic. Consider professional agronomic advice."
            )

        if ph > 8.0:
            warnings.append(
                "Soil is strongly alkaline. Consider professional agronomic advice."
            )

        if soil_report.moisture < 15:
            warnings.append(
                "Soil moisture is very low."
            )

        if soil_report.moisture > 70:
            warnings.append(
                "Soil moisture is very high."
            )

        # -----------------------------------------
        # 12. Return result
        # -----------------------------------------

        return {
            "soil_report_id": soil_report.id,

            "soil_health": {
                "score": score,
                "condition": condition,
            },

            "nutrients": {
                "nitrogen": {
                    "value": soil_report.nitrogen,
                    "status": nitrogen_status,
                },
                "phosphorus": {
                    "value": soil_report.phosphorus,
                    "status": phosphorus_status,
                },
                "potassium": {
                    "value": soil_report.potassium,
                    "status": potassium_status,
                },
                "ph": {
                    "value": soil_report.ph,
                    "status": ph_status,
                },
                "moisture": {
                    "value": soil_report.moisture,
                    "status": moisture_status,
                },
                "organic_carbon": {
                    "value": organic_carbon,
                    "status": organic_carbon_status,
                },
            },

            "crop_recommendation": {
                "crop": predicted_crop,
                "reason": (
                    "Crop recommended using the trained crop "
                    "recommendation model based on soil and weather conditions."
                ),
            },

            "fertilizer_recommendation": {
                "fertilizer": str(predicted_fertilizer),
                "reason": (
                    "Fertilizer recommended using the trained fertilizer "
                    "recommendation model based on soil conditions and the "
                    "predicted crop."
                ),
            },

            "recommendations": recommendations,

            "warnings": warnings,
        }

    # =========================================
    # Helper functions
    # =========================================

    @staticmethod
    def nutrient_status(
        value: float,
        low: float,
        high: float,
    ) -> str:

        if value < low:
            return "Low"

        if value > high:
            return "High"

        return "Good"

    @staticmethod
    def score_value(
        value: float,
        low: float,
        high: float,
        maximum: int,
    ) -> int:

        if low <= value <= high:
            return maximum

        if value < low:
            ratio = max(value / low, 0)
            return round(maximum * ratio)

        ratio = max(high / value, 0)
        return round(maximum * ratio)