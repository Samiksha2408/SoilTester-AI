from fastapi import FastAPI

from app.routers import api_router

app = FastAPI(
    title="SoilTester AI API",
    description="Backend API for SoilTester AI",
    version="1.0.0",
)

# Include all API routers
app.include_router(api_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to SoilTester AI Backend"
    }


@app.get("/health")
def health():
    return {
        "status": "Running"
    }