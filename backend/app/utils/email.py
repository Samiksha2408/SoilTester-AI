import smtplib
from email.message import EmailMessage

from app.config import settings


class EmailService:
    """
    Utility class for sending emails.
    """

    @staticmethod
    def send_email(
        recipient: str,
        subject: str,
        body: str,
    ) -> bool:
        """
        Send an email.

        Args:
            recipient: Recipient email address
            subject: Email subject
            body: Email body

        Returns:
            True if email sent successfully, otherwise False.
        """

        try:
            message = EmailMessage()

            message["Subject"] = subject
            message["From"] = settings.EMAIL_USERNAME
            message["To"] = recipient

            message.set_content(body)

            with smtplib.SMTP(
                settings.SMTP_SERVER,
                settings.SMTP_PORT,
            ) as smtp:

                smtp.starttls()

                smtp.login(
                    settings.EMAIL_USERNAME,
                    settings.EMAIL_PASSWORD,
                )

                smtp.send_message(message)

            return True

        except Exception as error:
            print(f"Email Error: {error}")
            return False

    @staticmethod
    def send_welcome_email(
        recipient: str,
        name: str,
    ) -> bool:

        subject = "Welcome to SoilTester AI"

        body = f"""
Hello {name},

Welcome to SoilTester AI!

Your account has been created successfully.

You can now:

- Upload soil reports
- Get crop recommendations
- Receive fertilizer suggestions
- Check weather forecasts
- Detect plant diseases
- Explore government schemes

Thank you for joining us.

Regards,
SoilTester AI Team
"""

        return EmailService.send_email(
            recipient,
            subject,
            body,
        )

    @staticmethod
    def send_password_reset_email(
        recipient: str,
        reset_code: str,
    ) -> bool:

        subject = "Password Reset"

        body = f"""
Hello,

Your password reset code is:

{reset_code}

If you did not request this, please ignore this email.

Regards,
SoilTester AI Team
"""

        return EmailService.send_email(
            recipient,
            subject,
            body,
        )

    @staticmethod
    def send_otp(
        recipient: str,
        otp: str,
    ) -> bool:

        subject = "Email Verification OTP"

        body = f"""
Hello,

Your OTP is:

{otp}

It is valid for 10 minutes.

Regards,
SoilTester AI Team
"""

        return EmailService.send_email(
            recipient,
            subject,
            body,
        )