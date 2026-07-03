import os

import joblib

from .preprocess import SoilAnalysisPreprocessor


class SoilAnalysisPredictor:
    """
    Predictor for soil analysis.
    """

    def __init__(self):
        model_path = os.path.join(
            os.path.dirname(__file__),
            "model.pkl",
        )

        self.model = joblib.load(model_path)

    def predict(
        self,
        nitrogen: float,
        phosphorus: float,
        potassium: float,
        ph: float,
        moisture: float,
        temperature: float,
    ):

        data = SoilAnalysisPreprocessor.prepare_input(
            nitrogen,
            phosphorus,
            potassium,
            ph,
            moisture,
            temperature,
        )

        prediction = self.model.predict(data)

        return prediction[0]


soil_analysis_predictor = SoilAnalysisPredictor()