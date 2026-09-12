from pydantic import BaseModel


class SoilAnalysisRequest(BaseModel):
    soil_report_id: int

    # Weather values required by the crop model
    temperature: float
    humidity: float
    rainfall: float


class NutrientResult(BaseModel):
    value: float | None
    status: str


class SoilHealthResult(BaseModel):
    score: float
    condition: str


class CropResult(BaseModel):
    crop: str
    reason: str


class FertilizerResult(BaseModel):
    fertilizer: str
    reason: str


class SoilAnalysisResponse(BaseModel):
    soil_report_id: int

    soil_health: SoilHealthResult

    nutrients: dict[str, NutrientResult]

    crop_recommendation: CropResult

    fertilizer_recommendation: FertilizerResult

    recommendations: list[str]

    warnings: list[str]