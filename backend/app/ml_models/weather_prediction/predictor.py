import os

import joblib

from .preprocess import WeatherPreprocessor


class WeatherPredictor:
    """
    Weather prediction model.
    """

    def __init__(self):
        model_path = os.path.join(
            os.path.dirname(__file__),
            "model.pkl",
        )

        self.model = joblib.load(model_path)

    def predict(
        self,
        temperature: float,
        humidity: float,
        rainfall: float,
        wind_speed: float,
        pressure: float,
    ):

        data = WeatherPreprocessor.prepare_input(
            temperature,
            humidity,
            rainfall,
            wind_speed,
            pressure,
        )

        prediction = self.model.predict(data)

        return prediction[0]


weather_predictor = WeatherPredictor()