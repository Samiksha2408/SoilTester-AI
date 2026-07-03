import numpy as np


class WeatherPreprocessor:
    """
    Preprocessing utilities for weather prediction.
    """

    @staticmethod
    def prepare_input(
        temperature: float,
        humidity: float,
        rainfall: float,
        wind_speed: float,
        pressure: float,
    ) -> np.ndarray:
        """
        Prepare input data for the weather prediction model.
        """

        return np.array([
            [
                temperature,
                humidity,
                rainfall,
                wind_speed,
                pressure,
            ]
        ])