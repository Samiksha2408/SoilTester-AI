import numpy as np


class IrrigationPreprocessor:
    """
    Preprocessing utilities for irrigation prediction.
    """

    @staticmethod
    def prepare_input(
        soil_moisture: float,
        temperature: float,
        humidity: float,
        rainfall: float,
        ph: float,
    ) -> np.ndarray:
        """
        Prepare input features for the irrigation model.
        """

        return np.array([
            [
                soil_moisture,
                temperature,
                humidity,
                rainfall,
                ph,
            ]
        ])