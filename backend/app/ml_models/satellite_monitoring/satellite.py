class SatelliteService:
    """
    Placeholder service for future satellite API integration.
    Examples:
    - Sentinel Hub
    - Google Earth Engine
    - NASA EarthData
    """

    @staticmethod
    def fetch_satellite_data(
        latitude: float,
        longitude: float,
    ):

        return {
            "latitude": latitude,
            "longitude": longitude,
            "ndvi": 0.82,
            "soil_moisture": 31.6,
            "land_surface_temperature": 29.8,
            "rainfall": 18.5,
            "status": "Satellite data retrieved successfully",
        }