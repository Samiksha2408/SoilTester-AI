from sqlalchemy.orm import Session

from app.model.user import User
from app.schemas.user import UserCreate, UserUpdate


class UserRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(User).all()

    @staticmethod
    def get_by_id(db: Session, user_id: int):
        return (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    @staticmethod
    def get_by_email(db: Session, email: str):
        return (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

    @staticmethod
    def create(db: Session, user: UserCreate):

        db_user = User(
            full_name=user.full_name,
            email=user.email,
            hashed_password=user.password,   # Replace with hashed password later
            phone=user.phone,
            role=user.role,
            address=user.address,
            profile_image=user.profile_image,
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return db_user

    @staticmethod
    def update(
        db: Session,
        user_id: int,
        user_update: UserUpdate,
    ):
        db_user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if not db_user:
            return None

        update_data = user_update.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_user, key, value)

        db.commit()
        db.refresh(db_user)

        return db_user

    @staticmethod
    def delete(
        db: Session,
        user_id: int,
    ):
        db_user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if not db_user:
            return None

        db.delete(db_user)
        db.commit()

        return db_user