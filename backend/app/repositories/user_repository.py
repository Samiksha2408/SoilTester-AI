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
            password=user.password,  
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
        if user_data.full_name is not None:
            user.full_name = user_data.full_name

        if user_data.phone is not None:
            user.phone = user_data.phone

        if user_data.address is not None:
            user.address = user_data.address

        if user_data.profile_image is not None:
            user.profile_image = user_data.profile_image


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