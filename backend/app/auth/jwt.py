from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt

from app.config import settings
# ==========================
# JWT Configuration
# ==========================

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

# ==========================
# Create Access Token
# ==========================

def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None,
):

    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode.update({"exp": expire})

    print("CREATING JWT")
    print("SECRET:", SECRET_KEY)
    print("ALGORITHM:", ALGORITHM)
    print("DATA:", to_encode)


    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


    print("TOKEN CREATED:", encoded_jwt[:30], "...")

    return encoded_jwt


# ==========================
# Verify Access Token
# ==========================

def verify_access_token(
    token: str,
):

    try:
        print("VERIFYING JWT")
        print("SECRET:", SECRET_KEY)
        print("ALGORITHM:", ALGORITHM)
        print("TOKEN:", token[:30], "...")

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        print("JWT PAYLOAD:", payload)

        if payload.get("sub") is None:
            print("JWT ERROR: sub missing")
            return None


        return payload

    except JWTError as e:
        print("JWT ERROR:", e)
        return None
    


