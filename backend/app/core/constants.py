"""
Application-wide constants.
"""

# =====================================
# User Roles
# =====================================

ROLE_ADMIN = "admin"
ROLE_FARMER = "farmer"
ROLE_EXPERT = "expert"

USER_ROLES = [
    ROLE_ADMIN,
    ROLE_FARMER,
    ROLE_EXPERT,
]

# =====================================
# Account Status
# =====================================

STATUS_ACTIVE = "active"
STATUS_INACTIVE = "inactive"
STATUS_BLOCKED = "blocked"

# =====================================
# Soil Report Status
# =====================================

REPORT_PENDING = "pending"
REPORT_COMPLETED = "completed"
REPORT_REJECTED = "rejected"

# =====================================
# Upload Directories
# =====================================

UPLOAD_FOLDER = "uploads"
SOIL_REPORT_FOLDER = "uploads/soil_reports"
PLANT_IMAGE_FOLDER = "uploads/plant_images"
PROFILE_IMAGE_FOLDER = "uploads/profile_images"
CHATBOT_FILES_FOLDER = "uploads/chatbot_files"

# =====================================
# Report Directory
# =====================================

PDF_REPORT_FOLDER = "reports"

# =====================================
# File Settings
# =====================================

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

ALLOWED_IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
}

ALLOWED_DOCUMENT_EXTENSIONS = {
    ".pdf",
}

# =====================================
# Weather
# =====================================

DEFAULT_WEATHER_UNIT = "metric"

# =====================================
# Pagination
# =====================================

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 10
MAX_PAGE_SIZE = 100

# =====================================
# AI Models
# =====================================

DEFAULT_CROP_MODEL = "crop_recommendation_model.pkl"
DEFAULT_FERTILIZER_MODEL = "fertilizer_model.pkl"
DEFAULT_PLANT_DISEASE_MODEL = "plant_disease_model.h5"

# =====================================
# OTP
# =====================================

OTP_LENGTH = 6
OTP_EXPIRY_MINUTES = 10

# =====================================
# JWT
# =====================================

ACCESS_TOKEN_TYPE = "Bearer"

# =====================================
# API Messages
# =====================================

SUCCESS = "Success"
FAILED = "Failed"
UNAUTHORIZED = "Unauthorized"
FORBIDDEN = "Access denied"
NOT_FOUND = "Resource not found"