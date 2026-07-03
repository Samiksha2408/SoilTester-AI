import numpy as np


class SoilAnalysisPreprocessor:
    """
    Preprocessing utilities for soil analysis.
    """

    @staticmethod
    def prepare_input(
        nitrogen: float,
        phosphorus: float,
        potassium: float,
        ph: float,
        moisture: float,
        temperature: float,
    ) -> np.ndarray:
        """
        Prepare model input.
        """

        return np.array([
            [
                nitrogen,
                phosphorus,
                potassium,
                ph,
                moisture,
                temperature,
            ]
        ])