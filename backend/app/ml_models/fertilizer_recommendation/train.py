import os

import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

from preprocess import FertilizerPreprocessor

DATASET = os.path.join(
    os.path.dirname(__file__),
    "data",
    "Fertilizer_Recommendation.csv",
)

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "model.pkl",
)

data = FertilizerPreprocessor.load_dataset(DATASET)
data = FertilizerPreprocessor.clean_dataset(data)

X, y = FertilizerPreprocessor.split_features_and_target(data)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

model = RandomForestClassifier(random_state=42)

model.fit(X_train, y_train)

joblib.dump(model, MODEL_PATH)

print("Fertilizer model trained successfully.")