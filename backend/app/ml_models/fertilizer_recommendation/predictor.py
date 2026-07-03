import os

import joblib


class FertilizerPredictor:

    def __init__(self):

        model_path = os.path.join(
            os.path.dirname(__file__),
            "model.pkl",
        )

        self.model = joblib.load(model_path)

    def predict(
        self,
        temperature,
        humidity,
        moisture,
        soil_type,
        crop_type,
        nitrogen,
        potassium,
        phosphorus,
    ):

        prediction = self.model.predict([[
            temperature,
            humidity,
            moisture,
            soil_type,
            crop_type,
            nitrogen,
            potassium,
            phosphorus,
        ]])

        return prediction[0]


fertilizer_predictor = FertilizerPredictor()