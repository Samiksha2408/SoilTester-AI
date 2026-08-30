import os

import joblib

from .preprocess import WeatherPreprocessor


class WeatherPredictor:
    """
    Weather prediction model.
    """

    def __init__(self):
        base_dir = os.path.dirname(__file__)

        model_path = os.path.join(
            base_dir,
            "model.pkl",
        )

        encoder_path = os.path.join(
            base_dir,
            "label_encoder.pkl",
        )

        self.model = joblib.load(model_path)
        self.label_encoder = joblib.load(encoder_path)

    def predict(
        self,
        temperature: float,
        humidity: float,
        wind_bearing: float,
        visibility: float,
        wind_speed: float,
        pressure: float,
    ):

        data = WeatherPreprocessor.prepare_input(
            temperature,
            humidity,
            wind_bearing,
            visibility,
            wind_speed,
            pressure,
        )

        prediction = self.model.predict(data)

        # Convert encoded number back to weather condition
        prediction_label = self.label_encoder.inverse_transform(
            prediction
        )

        return prediction_label[0]


weather_predictor = WeatherPredictor()