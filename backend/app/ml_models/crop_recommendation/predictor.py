import os
import joblib
import pandas as pd 


class CropPredictor:
    """
    Crop Recommendation Predictor
    """

    def __init__(self):
        model_path = os.path.join(
            os.path.dirname(__file__),
            "model.pkl"
        )

        self.model = joblib.load(model_path)

    def predict(
        self,
        nitrogen: float,
        phosphorus: float,
        potassium: float,
        temperature: float,
        humidity: float,
        ph: float,
        rainfall: float,
    ) -> str:
        """
        Predict the most suitable crop.
        """

        features = pd.DataFrame([{
             "N": nitrogen,
             "P": phosphorus,
             "K": potassium,
             "temperature": temperature,
             "humidity": humidity,
             "ph": ph,
            "rainfall": rainfall,
        }])
        prediction = self.model.predict(features)

        return prediction[0]


# Create singleton instance
crop_predictor = CropPredictor()