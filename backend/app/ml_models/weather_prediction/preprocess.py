import pandas as pd


class WeatherPreprocessor:

    @staticmethod
    def prepare_input(
        temperature: float,
        humidity: float,
        wind_bearing: float,
        visibility: float,
        wind_speed: float,
        pressure: float,
    ):

        data = pd.DataFrame([
            {
                "Temperature (C)": temperature,
                "Humidity": humidity,
                "Wind Speed (km/h)": wind_speed,
                "Wind Bearing (degrees)": wind_bearing,
                "Visibility (km)": visibility,
                "Pressure (millibars)": pressure,
            }
        ])

        return data