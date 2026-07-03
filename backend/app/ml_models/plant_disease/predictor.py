import json
import os

import numpy as np
from tensorflow.keras.models import load_model


from .preprocess import PlantDiseasePreprocessor


class PlantDiseasePredictor:
    """
    Plant Disease Prediction using a trained TensorFlow model.
    """

    def __init__(self):

        base_dir = os.path.dirname(__file__)

        model_path = os.path.join(base_dir, "model.h5")
        labels_path = os.path.join(base_dir, "labels.json")

        self.model = load_model(model_path)

        with open(labels_path, "r") as file:
            self.labels = json.load(file)

    def predict(self, image_path: str) -> dict:
        """
        Predict disease from a leaf image.
        """

        image = PlantDiseasePreprocessor.preprocess_image(
            image_path
        )

        prediction = self.model.predict(image, verbose=0)

        class_index = int(np.argmax(prediction))

        confidence = float(np.max(prediction))

        disease = self.labels[str(class_index)]

        return {
            "disease": disease,
            "confidence": round(confidence * 100, 2),
        }


# Singleton instance
plant_disease_predictor = PlantDiseasePredictor()