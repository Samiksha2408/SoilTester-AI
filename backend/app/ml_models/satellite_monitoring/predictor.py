import random

from .preprocess import SatelliteMonitoringPreprocessor


class SatelliteMonitoringPredictor:
    """
    Predict crop health from satellite-derived features.
    Replace this with a trained ML model later.
    """

    def predict(
        self,
        ndvi: float,
        soil_moisture: float,
        land_surface_temperature: float,
        rainfall: float,
    ):

        _ = SatelliteMonitoringPreprocessor.prepare_input(
            ndvi,
            soil_moisture,
            land_surface_temperature,
            rainfall,
        )

        prediction = random.choice(
            [
                "Healthy Crop",
                "Moderate Stress",
                "High Water Stress",
                "Possible Disease Detected",
            ]
        )

        return prediction


satellite_monitoring_predictor = SatelliteMonitoringPredictor()