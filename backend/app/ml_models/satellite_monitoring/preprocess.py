import numpy as np


class SatelliteMonitoringPreprocessor:
    """
    Preprocess satellite data before prediction.
    """

    @staticmethod
    def prepare_input(
        ndvi: float,
        soil_moisture: float,
        land_surface_temperature: float,
        rainfall: float,
    ) -> np.ndarray:

        return np.array([
            [
                ndvi,
                soil_moisture,
                land_surface_temperature,
                rainfall,
            ]
        ])