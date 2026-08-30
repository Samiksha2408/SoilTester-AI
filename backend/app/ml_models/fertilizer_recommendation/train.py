import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score


# -----------------------------------
# Paths
# -----------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(
    BASE_DIR,
    "../../../data/Fertilizer_Prediction.csv"
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
# Load dataset
# -----------------------------------

print("Loading fertilizer dataset...")

df = pd.read_csv(DATA_PATH)

print("Dataset shape:", df.shape)
print("Columns:", df.columns.tolist())


# -----------------------------------
# Clean column names
# -----------------------------------

df.columns = df.columns.str.strip()


# -----------------------------------
# Rename columns
# -----------------------------------

df = df.rename(columns={
    "Temparature": "temperature",
    "Temperature": "temperature",
    "Humidity": "humidity",
    "Moisture": "moisture",
    "Soil Type": "soil_type",
    "Crop Type": "crop_type",
    "Nitrogen": "nitrogen",
    "Potassium": "potassium",
    "Phosphorous": "phosphorus",
    "Phosphorus": "phosphorus",
    "Fertilizer Name": "fertilizer_name",
})


# -----------------------------------
# Required columns
# -----------------------------------

required_columns = [
    "temperature",
    "humidity",
    "moisture",
    "soil_type",
    "crop_type",
    "nitrogen",
    "potassium",
    "phosphorus",
    "fertilizer_name",
]

missing_columns = [
    column
    for column in required_columns
    if column not in df.columns
]

if missing_columns:
    raise ValueError(
        f"Missing columns in dataset: {missing_columns}"
    )


# -----------------------------------
# Encode categorical columns
# -----------------------------------

soil_encoder = LabelEncoder()
crop_encoder = LabelEncoder()
fertilizer_encoder = LabelEncoder()

df["soil_type"] = soil_encoder.fit_transform(
    df["soil_type"].astype(str)
)

df["crop_type"] = crop_encoder.fit_transform(
    df["crop_type"].astype(str)
)

df["fertilizer_name"] = fertilizer_encoder.fit_transform(
    df["fertilizer_name"].astype(str)
)


# -----------------------------------
# Features
# -----------------------------------

features = [
    "temperature",
    "humidity",
    "moisture",
    "soil_type",
    "crop_type",
    "nitrogen",
    "potassium",
    "phosphorus",
]

X = df[features]

y = df["fertilizer_name"]


# -----------------------------------
# Train / Test Split
# -----------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)


# -----------------------------------
# Train Random Forest
# -----------------------------------

print("Training Random Forest model...")

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
)

model.fit(X_train, y_train)


# -----------------------------------
# Evaluate
# -----------------------------------

y_pred = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    y_pred
)

print(f"Model accuracy: {accuracy:.2%}")


# -----------------------------------
# Save model and encoders
# -----------------------------------

joblib.dump(model, MODEL_PATH)

encoders= {
        "soil_encoder": soil_encoder,
        "crop_encoder": crop_encoder,
        "fertilizer_encoder": fertilizer_encoder,
}

joblib.dump(
    encoders,
    ENCODER_PATH
)



print("Model saved successfully!")
print("Model:", MODEL_PATH)
print("Encoders:", ENCODER_PATH)