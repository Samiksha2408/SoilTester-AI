import secrets
import string
from pathlib import Path


class Security:
    """
    General security utility functions.
    """

    @staticmethod
    def generate_api_key(length: int = 32) -> str:
        """
        Generate a secure API key.
        """
        alphabet = string.ascii_letters + string.digits
        return "".join(secrets.choice(alphabet) for _ in range(length))

    @staticmethod
    def generate_token(length: int = 64) -> str:
        """
        Generate a secure random token.
        """
        return secrets.token_hex(length // 2)

    @staticmethod
    def generate_otp(length: int = 6) -> str:
        """
        Generate a numeric OTP.
        """
        digits = string.digits
        return "".join(secrets.choice(digits) for _ in range(length))

    @staticmethod
    def sanitize_filename(filename: str) -> str:
        """
        Remove unsafe characters from a filename.
        """
        filename = Path(filename).name

        safe_filename = "".join(
            c for c in filename
            if c.isalnum() or c in ("_", "-", ".")
        )

        return safe_filename

    @staticmethod
    def check_password_strength(password: str) -> bool:
        """
        Validate password strength.
        """

        if len(password) < 8:
            return False

        if not any(char.isupper() for char in password):
            return False

        if not any(char.islower() for char in password):
            return False

        if not any(char.isdigit() for char in password):
            return False

        return True