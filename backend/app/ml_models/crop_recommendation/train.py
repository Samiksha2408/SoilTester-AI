import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split


# Current directory: app/ml_models/crop_recommendation
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Dataset location
DATA_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "../../../data/Crop_recommendation.csv")
)

# Model output location
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")


# Load dataset
df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully!")
print("Dataset shape:", df.shape)
print("Columns:", list(df.columns))


# Features and target
X = df.drop("label", axis=1)
y = df["label"]


# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# Train Random Forest model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)


# Test accuracy
accuracy = model.score(X_test, y_test)

print(f"Model accuracy: {accuracy * 100:.2f}%")


# Save model
joblib.dump(model, MODEL_PATH)

print("Model trained successfully!")
print("Model saved at:", MODEL_PATH)