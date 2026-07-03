from typing import Any, Optional


class ResponseHandler:
    """
    Utility class for standard API responses.
    """

    @staticmethod
    def success(
        message: str,
        data: Optional[Any] = None,
    ) -> dict:
        """
        Success response.
        """
        return {
            "success": True,
            "message": message,
            "data": data,
        }

    @staticmethod
    def created(
        message: str,
        data: Optional[Any] = None,
    ) -> dict:
        """
        Resource created response.
        """
        return {
            "success": True,
            "message": message,
            "data": data,
        }

    @staticmethod
    def error(
        message: str,
        errors: Optional[Any] = None,
    ) -> dict:
        """
        Error response.
        """
        return {
            "success": False,
            "message": message,
            "errors": errors,
        }

    @staticmethod
    def not_found(
        message: str = "Resource not found.",
    ) -> dict:
        """
        Resource not found response.
        """
        return {
            "success": False,
            "message": message,
        }

    @staticmethod
    def unauthorized(
        message: str = "Unauthorized.",
    ) -> dict:
        """
        Unauthorized response.
        """
        return {
            "success": False,
            "message": message,
        }

    @staticmethod
    def forbidden(
        message: str = "Access denied.",
    ) -> dict:
        """
        Forbidden response.
        """
        return {
            "success": False,
            "message": message,
        }

    @staticmethod
    def validation_error(
        errors: Any,
    ) -> dict:
        """
        Validation error response.
        """
        return {
            "success": False,
            "message": "Validation failed.",
            "errors": errors,
        }