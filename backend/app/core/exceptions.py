from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse


# =====================================================
# Custom Exceptions
# =====================================================

class UserNotFoundException(Exception):
    """Raised when a user is not found."""

    def __init__(self, message: str = "User not found"):
        self.message = message


class SoilReportNotFoundException(Exception):
    """Raised when a soil report is not found."""

    def __init__(self, message: str = "Soil report not found"):
        self.message = message


class CropRecommendationException(Exception):
    """Raised when crop recommendation fails."""

    def __init__(self, message: str = "Unable to generate crop recommendation"):
        self.message = message


class FertilizerRecommendationException(Exception):
    """Raised when fertilizer recommendation fails."""

    def __init__(self, message: str = "Unable to generate fertilizer recommendation"):
        self.message = message


class PlantDiseaseException(Exception):
    """Raised when plant disease detection fails."""

    def __init__(self, message: str = "Plant disease detection failed"):
        self.message = message


class WeatherServiceException(Exception):
    """Raised when weather service fails."""

    def __init__(self, message: str = "Weather service unavailable"):
        self.message = message


class UnauthorizedException(Exception):
    """Raised when authentication fails."""

    def __init__(self, message: str = "Unauthorized"):
        self.message = message


# =====================================================
# Exception Handlers
# =====================================================

def register_exception_handlers(app: FastAPI):
    """
    Register all custom exception handlers.
    """

    @app.exception_handler(UserNotFoundException)
    async def user_not_found_handler(
        request: Request,
        exc: UserNotFoundException,
    ):
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={
                "success": False,
                "message": exc.message,
            },
        )

    @app.exception_handler(SoilReportNotFoundException)
    async def soil_report_not_found_handler(
        request: Request,
        exc: SoilReportNotFoundException,
    ):
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={
                "success": False,
                "message": exc.message,
            },
        )

    @app.exception_handler(UnauthorizedException)
    async def unauthorized_handler(
        request: Request,
        exc: UnauthorizedException,
    ):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "success": False,
                "message": exc.message,
            },
        )

    @app.exception_handler(Exception)
    async def internal_server_error(
        request: Request,
        exc: Exception,
    ):
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "message": "Internal Server Error",
            },
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(
        request: Request,
        exc: HTTPException,
    ):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "message": exc.detail,
            },
        )