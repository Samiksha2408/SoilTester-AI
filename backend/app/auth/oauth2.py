from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.auth.jwt import verify_access_token
from app.database import get_db
from app.repositories.user_repository import UserRepository
from app.model.user import User


# --------------------------------
# Bearer Token Security
# --------------------------------

bearer_scheme = HTTPBearer()


# --------------------------------
# Get Current User
# --------------------------------

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
):
    """
    Validate JWT token and return the authenticated user.
    """

    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    email = payload.get("sub")

    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"},
        )

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


# --------------------------------
# Get Current Active User
# --------------------------------

def get_current_active_user(
    current_user: User = Depends(get_current_user),
):
    return current_user