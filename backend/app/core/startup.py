from pathlib import Path

from sqlalchemy import text

from app.core.logger import logger
from app.database import SessionLocal


def create_directories() -> None:
    """
    Create required project directories.
    """

    directories = [
        "uploads",
        "uploads/soil_reports",
        "uploads/plant_images",
        "uploads/profile_images",
        "uploads/chatbot_files",
        "reports",
        "logs",
    ]

    for directory in directories:
        Path(directory).mkdir(
            parents=True,
            exist_ok=True,
        )


def check_database_connection() -> None:
    """
    Check database connectivity.
    """

    db = SessionLocal()

    try:
        db.execute(text("SELECT 1"))
        logger.info("Database connected successfully.")

    except Exception as error:
        logger.error(f"Database connection failed: {error}")

    finally:
        db.close()


async def startup_event() -> None:
    """
    Executed when the application starts.
    """

    logger.info("Starting SoilTester AI...")

    create_directories()

    check_database_connection()

    logger.info("Application startup completed.")


async def shutdown_event() -> None:
    """
    Executed when the application shuts down.
    """

    logger.info("Shutting down SoilTester AI...")