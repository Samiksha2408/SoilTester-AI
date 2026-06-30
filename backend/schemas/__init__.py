from .user import (
    UserCreate,
    UserUpdate,
    UserResponse,
)

from .auth import (
    LoginRequest,
    Token,
    TokenData,
    ChangePassword,
    ForgotPassword,
    ResetPassword,
)

from .soil_report import (
    SoilReportCreate,
    SoilReportUpdate,
    SoilReportResponse,
)

from .crop_recommendation import (
    CropRecommendationCreate,
    CropRecommendationUpdate,
    CropRecommendationResponse,
)

from .fertilizer_recommendation import (
    FertilizerRecommendationCreate,
    FertilizerRecommendationUpdate,
    FertilizerRecommendationResponse,
)

from .weather import (
    WeatherCreate,
    WeatherUpdate,
    WeatherResponse,
)

from .plant_disease import (
    PlantDiseaseCreate,
    PlantDiseaseUpdate,
    PlantDiseaseResponse,
)

from .irrigation import (
    IrrigationCreate,
    IrrigationUpdate,
    IrrigationResponse,
)

from .government_scheme import (
    GovernmentSchemeCreate,
    GovernmentSchemeUpdate,
    GovernmentSchemeResponse,
)

from .satellite_monitoring import (
    SatelliteMonitoringCreate,
    SatelliteMonitoringUpdate,
    SatelliteMonitoringResponse,
)

from .chatbot_history import (
    ChatbotHistoryCreate,
    ChatbotHistoryUpdate,
    ChatbotHistoryResponse,
)

__all__ = [
    # User
    "UserCreate",
    "UserUpdate",
    "UserResponse",

    # Auth
    "LoginRequest",
    "Token",
    "TokenData",
    "ChangePassword",
    "ForgotPassword",
    "ResetPassword",

    # Soil
    "SoilReportCreate",
    "SoilReportUpdate",
    "SoilReportResponse",

    # Crop
    "CropRecommendationCreate",
    "CropRecommendationUpdate",
    "CropRecommendationResponse",

    # Fertilizer
    "FertilizerRecommendationCreate",
    "FertilizerRecommendationUpdate",
    "FertilizerRecommendationResponse",

    # Weather
    "WeatherCreate",
    "WeatherUpdate",
    "WeatherResponse",

    # Plant Disease
    "PlantDiseaseCreate",
    "PlantDiseaseUpdate",
    "PlantDiseaseResponse",

    # Irrigation
    "IrrigationCreate",
    "IrrigationUpdate",
    "IrrigationResponse",

    # Government Schemes
    "GovernmentSchemeCreate",
    "GovernmentSchemeUpdate",
    "GovernmentSchemeResponse",

    # Satellite
    "SatelliteMonitoringCreate",
    "SatelliteMonitoringUpdate",
    "SatelliteMonitoringResponse",

    # Chatbot
    "ChatbotHistoryCreate",
    "ChatbotHistoryUpdate",
    "ChatbotHistoryResponse",
]