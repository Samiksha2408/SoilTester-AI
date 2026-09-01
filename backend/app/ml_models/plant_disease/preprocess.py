import numpy as np
from PIL import Image


class PlantDiseasePreprocessor:
    """
    Preprocessing utilities for plant disease detection.
    """

    IMAGE_SIZE = (224, 224)

    @staticmethod
    def preprocess_image(image_path: str) -> np.ndarray:
        """
        Load and prepare an image for the trained model.

        The model itself contains MobileNetV2 preprocessing,
        so this function must NOT normalize pixels to 0-1.
        """

        # Open image
        image = Image.open(image_path)

        # Convert to RGB
        image = image.convert("RGB")

        # Resize
        image = image.resize(
            PlantDiseasePreprocessor.IMAGE_SIZE
        )

        # Convert to float32
        image_array = np.array(
            image,
            dtype=np.float32
        )

        # Add batch dimension
        image_array = np.expand_dims(
            image_array,
            axis=0
        )

        return image_array