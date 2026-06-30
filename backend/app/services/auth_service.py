from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.schemas.auth import LoginRequest


class AuthService:

    @staticmethod
    def register(
        db: Session,
        user: UserCreate,
    ):
        # Check if email already exists
        existing_user = UserRepository.get_by_email(
            db,
            user.email,
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists",
            )

        # TODO:
        # Hash the password after implementing auth/hashing.py
        # user.password = Hash.hash_password(user.password)

        created_user = UserRepository.create(
            db,
            user,
        )

        return created_user

    @staticmethod
    def login(
        db: Session,
        login_data: LoginRequest,
    ):

        user = UserRepository.get_by_email(
            db,
            login_data.email,
        )

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        # TODO:
        # Replace with password verification
        # if not Hash.verify_password(
        #     login_data.password,
        #     user.hashed_password,
        # ):
        #     raise HTTPException(...)

        if login_data.password != user.hashed_password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        # TODO:
        # Replace with JWT generation
        # token = create_access_token(
        #     data={"sub": user.email}
        # )

        token = "your_jwt_access_token"

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user,
        }

    @staticmethod
    def get_current_user(
        db: Session,
        email: str,
    ):

        user = UserRepository.get_by_email(
            db,
            email,
        )

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        return user