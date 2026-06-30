from fastapi import Depends, HTTPException, status

from app.auth.oauth2 import get_current_user


def require_admin(
    current_user=Depends(get_current_user),
):
    """
    Allow only Admin users.
    """

    if current_user.role.lower() != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    return current_user


def require_farmer(
    current_user=Depends(get_current_user),
):
    """
    Allow only Farmer users.
    """

    if current_user.role.lower() != "farmer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Farmer access required",
        )

    return current_user


def require_expert(
    current_user=Depends(get_current_user),
):
    """
    Allow only Agriculture Expert users.
    """

    if current_user.role.lower() != "expert":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Expert access required",
        )

    return current_user


def require_admin_or_expert(
    current_user=Depends(get_current_user),
):
    """
    Allow Admin and Expert users.
    """

    if current_user.role.lower() not in [
        "admin",
        "expert",
    ]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin or Expert access required",
        )

    return current_user


def require_authenticated_user(
    current_user=Depends(get_current_user),
):
    """
    Allow any authenticated user.
    """

    return current_user