import re
from pathlib import Path

from fastapi import HTTPException, status


class Validators:
    """
    Utility class for common validations.
    """

    ALLOWED_IMAGE_EXTENSIONS = {
        ".jpg",
        ".jpeg",
        ".png",
    }

    ALLOWED_DOCUMENT_EXTENSIONS = {
        ".pdf",
    }

    @staticmethod
    def validate_email(email: str) -> bool:
        """
        Validate email address.
        """

        pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

        if not re.fullmatch(pattern, email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email address.",
            )

        return True

    @staticmethod
    def validate_phone(phone: str) -> bool:
        """
        Validate Indian mobile number.
        """

        pattern = r"^[6-9]\d{9}$"

        if not re.fullmatch(pattern, phone):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid phone number.",
            )

        return True

    @staticmethod
    def validate_pincode(pincode: str) -> bool:
        """
        Validate Indian PIN code.
        """

        pattern = r"^[1-9][0-9]{5}$"

        if not re.fullmatch(pattern, pincode):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid PIN code.",
            )

        return True

    @staticmethod
    def validate_password(password: str) -> bool:
        """
        Validate password strength.
        """

        if len(password) < 8:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must contain at least 8 characters.",
            )

        return True

    @staticmethod
    def validate_image_extension(filename: str) -> bool:
        """
        Validate image extension.
        """

        extension = Path(filename).suffix.lower()

        if extension not in Validators.ALLOWED_IMAGE_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only JPG, JPEG and PNG files are allowed.",
            )

        return True

    @staticmethod
    def validate_pdf_extension(filename: str) -> bool:
        """
        Validate PDF extension.
        """

        extension = Path(filename).suffix.lower()

        if extension not in Validators.ALLOWED_DOCUMENT_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only PDF files are allowed.",
            )

        return True

    @staticmethod
    def validate_soil_ph(ph: float) -> bool:
        """
        Validate soil pH value.
        """

        if ph < 0 or ph > 14:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Soil pH must be between 0 and 14.",
            )

        return True

    @staticmethod
    def validate_percentage(value: float) -> bool:
        """
        Validate percentage.
        """

        if value < 0 or value > 100:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Percentage must be between 0 and 100.",
            )

        return True