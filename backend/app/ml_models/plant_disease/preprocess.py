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
        Load and preprocess an image for prediction.

        Args:
            image_path: Path to the uploaded image.

        Returns:
            Preprocessed image as a NumPy array with shape
            (1, 224, 224, 3).
        """

        # Open image
        image = Image.open(image_path)

        # Convert to RGB
        image = image.convert("RGB")

        # Resize image
        image = image.resize(
            PlantDiseasePreprocessor.IMAGE_SIZE
        )

        # Convert image to NumPy array
        image_array = np.array(image, dtype=np.float32)

        # Normalize pixel values (0-255 -> 0-1)
        image_array = image_array / 255.0

        # Add batch dimension
        image_array = np.expand_dims(
            image_array,
            axis=0,
        )

        return image_array