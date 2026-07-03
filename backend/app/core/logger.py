import logging
import os
from pathlib import Path

# Create logs directory if it doesn't exist
LOG_DIR = "logs"
Path(LOG_DIR).mkdir(parents=True, exist_ok=True)

LOG_FILE = os.path.join(LOG_DIR, "soiltester.log")

# Configure logger
logger = logging.getLogger("SoilTesterAI")
logger.setLevel(logging.INFO)

# Prevent duplicate handlers if imported multiple times
if not logger.handlers:

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)

    # File handler
    file_handler = logging.FileHandler(LOG_FILE)
    file_handler.setFormatter(formatter)

    logger.addHandler(console_handler)
    logger.addHandler(file_handler)