import os
import joblib
import pandas as pd


class FertilizerPredictor:
    """
    Fertilizer Recommendation Predictor
    """

    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))

        model_path = os.path.join(
            base_dir,
            "model.pkl"
        )

        encoder_path = os.path.join(
            base_dir,
            "label_encoder.pkl"
        )

        # Load trained model
        self.model = joblib.load(model_path)

        # Load encoders
        encoders = joblib.load(encoder_path)

        self.soil_encoder = encoders["soil_encoder"]
        self.crop_encoder = encoders["crop_encoder"]
        self.fertilizer_encoder = encoders["fertilizer_encoder"]

    def predict(
        self,
        temperature: float,
        humidity: float,
        moisture: float,
        soil_type: str,
        crop_type: str,
        nitrogen: float,
        potassium: float,
        phosphorus: float,
    ) -> str:

        # Encode soil type
        try:
            soil_encoded = self.soil_encoder.transform(
                [soil_type]
            )[0]
        except ValueError:
            raise ValueError(
                f"Unknown soil type: {soil_type}"
            )

        # Encode crop type
        try:
            crop_encoded = self.crop_encoder.transform(
                [crop_type]
            )[0]
        except ValueError:
            raise ValueError(
                f"Unknown crop type: {crop_type}"
            )

        # Create DataFrame with the SAME feature names
        # used during model training
        data = pd.DataFrame(
            [[
                temperature,
                humidity,
                moisture,
                soil_encoded,
                crop_encoded,
                nitrogen,
                potassium,
                phosphorus,
            ]],
            columns=[
                "temperature",
                "humidity",
                "moisture",
                "soil_type",
                "crop_type",
                "nitrogen",
                "potassium",
                "phosphorus",
            ]
        )

        # Predict
        prediction = self.model.predict(data)

        # Convert encoded prediction back to fertilizer name
        fertilizer = self.fertilizer_encoder.inverse_transform(
            prediction
        )[0]

        return fertilizer


# Create singleton
fertilizer_predictor = FertilizerPredictor()