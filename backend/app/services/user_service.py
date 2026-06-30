from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserUpdate
from app.auth.hashing import Hash


class UserService:

    @staticmethod
    def get_all_users(db: Session):
        return UserRepository.get_all(db)

    @staticmethod
    def get_user_by_id(
        db: Session,
        user_id: int,
    ):
        user = UserRepository.get_by_id(
            db,
            user_id,
        )

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        return user

    @staticmethod
    def create_user(
        db: Session,
        user: UserCreate,
    ):
        existing_user = UserRepository.get_by_email(
            db,
            user.email,
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        # Hash password before saving
        user.password = Hash.hash_password(
            user.password
        )

        return UserRepository.create(
            db,
            user,
        )

    @staticmethod
    def update_user(
        db: Session,
        user_id: int,
        user: UserUpdate,
    ):
        db_user = UserRepository.get_by_id(
            db,
            user_id,
        )

        if db_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        if (
            hasattr(user, "password")
            and user.password is not None
        ):
            user.password = Hash.hash_password(
                user.password
            )

        return UserRepository.update(
            db,
            user_id,
            user,
        )

    @staticmethod
    def delete_user(
        db: Session,
        user_id: int,
    ):
        db_user = UserRepository.get_by_id(
            db,
            user_id,
        )

        if db_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        UserRepository.delete(
            db,
            user_id,
        )

        return {
            "message": "User deleted successfully"
        }