import random
import string
import uuid
from datetime import datetime


class Helpers:
    """
    Common helper functions used across the application.
    """

    @staticmethod
    def generate_uuid() -> str:
        """
        Generate a unique UUID.
        """
        return str(uuid.uuid4())

    @staticmethod
    def generate_otp(length: int = 6) -> str:
        """
        Generate a numeric OTP.
        """
        return "".join(
            random.choices(string.digits, k=length)
        )

    @staticmethod
    def generate_random_string(length: int = 10) -> str:
        """
        Generate a random alphanumeric string.
        """
        characters = string.ascii_letters + string.digits

        return "".join(
            random.choices(characters, k=length)
        )

    @staticmethod
    def current_timestamp() -> datetime:
        """
        Return current UTC timestamp.
        """
        return datetime.utcnow()

    @staticmethod
    def format_datetime(date: datetime) -> str:
        """
        Convert datetime to string.
        """
        return date.strftime("%Y-%m-%d %H:%M:%S")

    @staticmethod
    def slugify(text: str) -> str:
        """
        Convert text into URL-friendly slug.
        """
        return (
            text.strip()
            .lower()
            .replace(" ", "-")
        )

    @staticmethod
    def capitalize_words(text: str) -> str:
        """
        Capitalize each word.
        """
        return text.title()

    @staticmethod
    def calculate_age(year: int) -> int:
        """
        Calculate age from birth year.
        """
        current_year = datetime.now().year
        return current_year - year

    @staticmethod
    def success_message(message: str) -> dict:
        """
        Standard success message.
        """
        return {
            "success": True,
            "message": message,
        }

    @staticmethod
    def error_message(message: str) -> dict:
        """
        Standard error message.
        """
        return {
            "success": False,
            "message": message,
        }