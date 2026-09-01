import os

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score


# -----------------------------------
# Paths
# -----------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.abspath(
    os.path.join(
        BASE_DIR,
        "../../../data/weatherHistory.csv"
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model.pkl"
)

ENCODER_PATH = os.path.join(
    BASE_DIR,
    "label_encoder.pkl"
)


# -----------------------------------
# Load Dataset
# -----------------------------------

print("Loading weather dataset...")

df = pd.read_csv(DATA_PATH)

print("Dataset shape:", df.shape)
print("Columns:", df.columns.tolist())


# -----------------------------------
# Clean Dataset
# -----------------------------------

df = df.dropna(
    subset=[
        "Temperature (C)",
        "Humidity",
        "Wind Speed (km/h)",
        "Wind Bearing (degrees)",
        "Visibility (km)",
        "Pressure (millibars)",
        "Summary",
    ]
)


# -----------------------------------
# Features
# -----------------------------------

X = df[
    [
        "Temperature (C)",
        "Humidity",
        "Wind Speed (km/h)",
        "Wind Bearing (degrees)",
        "Visibility (km)",
        "Pressure (millibars)",
    ]
]


# -----------------------------------
# Target
# -----------------------------------

y = df["Summary"]


# -----------------------------------
# Encode Target
# -----------------------------------

label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)


# -----------------------------------
# Train/Test Split
# -----------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
)


# -----------------------------------
# Train Random Forest
# -----------------------------------

print("Training Random Forest weather model...")

model = RandomForestClassifier(
    n_estimators=30,
    max_depth=15,
    random_state=42,
    n_jobs=-1,
)

model.fit(X_train, y_train)


# -----------------------------------
# Evaluate
# -----------------------------------

predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions,
)

print(
    f"Model accuracy: {accuracy * 100:.2f}%"
)


# -----------------------------------
# Save Model
# -----------------------------------

joblib.dump(
    model,
    MODEL_PATH,
)

joblib.dump(
    label_encoder,
    ENCODER_PATH,
)


print("Model saved successfully!")
print("Model:", MODEL_PATH)
print("Encoder:", ENCODER_PATH)