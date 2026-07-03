from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ==========================
    # Application
    # ==========================
    APP_NAME: str = "SoilTester AI"
    VERSION: str = "1.0.0"

    # ==========================
    # Database
    # ==========================
    DATABASE_URL: str

    # ==========================
    # JWT Authentication
    # ==========================
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ==========================
    # Email Configuration
    # ==========================
    EMAIL_USERNAME: str
    EMAIL_PASSWORD: str
    SMTP_SERVER: str
    SMTP_PORT: int

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()