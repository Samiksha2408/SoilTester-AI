import numpy as np
import pandas as pd


class FertilizerPreprocessor:

    @staticmethod
    def load_dataset(file_path: str):
        return pd.read_csv(file_path)

    @staticmethod
    def clean_dataset(data: pd.DataFrame):
        data = data.drop_duplicates()
        data = data.dropna()
        return data

    @staticmethod
    def split_features_and_target(data: pd.DataFrame):

        X = data.drop(columns=["Fertilizer Name"])
        y = data["Fertilizer Name"]

        return X, y

    @staticmethod
    def prepare_prediction_input(
        temperature,
        humidity,
        moisture,
        soil_type,
        crop_type,
        nitrogen,
        potassium,
        phosphorus,
    ):

        return np.array([[
            temperature,
            humidity,
            moisture,
            soil_type,
            crop_type,
            nitrogen,
            potassium,
            phosphorus,
        ]])
    