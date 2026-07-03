import os

import pandas as pd


class CropDataPreprocessor:
    """
    Preprocess the crop recommendation dataset.
    """

    def __init__(self):
        self.dataset_path = os.path.join(
            os.path.dirname(__file__),
            "data",
            "Crop_recommendation.csv",
        )

    def load_dataset(self) -> pd.DataFrame:
        """
        Load the dataset.
        """

        return pd.read_csv(self.dataset_path)

    def preprocess(self):
        """
        Clean and prepare the dataset.
        """

        df = self.load_dataset()

        # Remove duplicate rows
        df = df.drop_duplicates()

        # Remove rows with missing values
        df = df.dropna()

        # Input features
        X = df[
            [
                "N",
                "P",
                "K",
                "temperature",
                "humidity",
                "ph",
                "rainfall",
            ]
        ]

        # Target label
        y = df["label"]

        return X, y