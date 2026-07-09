import os

import joblib

from .preprocess import IrrigationPreprocessor


class IrrigationPredictor:
    """
    Irrigation recommendation predictor.
    """

    def __init__(self):
        model_path = os.path.join(
            os.path.dirname(__file__),
            "model.pkl",
        )

        self.model = joblib.load(model_path)

    def predict(
        self,
        soil_moisture: float,
        temperature: float,
        humidity: float,
        rainfall: float,
        ph: float,
    ):

        data = IrrigationPreprocessor.prepare_input(
            soil_moisture,
            temperature,
            humidity,
            rainfall,
            ph,
        )

        prediction = self.model.predict(data)

        return prediction[0]


irrigation_predictor = IrrigationPredictor()