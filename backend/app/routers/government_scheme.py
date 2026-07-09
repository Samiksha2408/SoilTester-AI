from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.model.government_scheme import GovernmentScheme
from app.schemas.government_scheme import (
    GovernmentSchemeCreate,
    GovernmentSchemeUpdate,
    GovernmentSchemeResponse,
)

router = APIRouter()


# --------------------------------
# Create Government Scheme
# --------------------------------
@router.post(
    "/",
    response_model=GovernmentSchemeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_government_scheme(
    scheme: GovernmentSchemeCreate,
    db: Session = Depends(get_db),
):
    new_scheme = GovernmentScheme(**scheme.model_dump())

    db.add(new_scheme)
    db.commit()
    db.refresh(new_scheme)

    return new_scheme


# --------------------------------
# Get All Government Schemes
# --------------------------------
@router.get(
    "/",
    response_model=list[GovernmentSchemeResponse],
)
def get_government_schemes(
    db: Session = Depends(get_db),
):
    return db.query(GovernmentScheme).all()


# --------------------------------
# Get Government Scheme By ID
# --------------------------------
@router.get(
    "/{scheme_id}",
    response_model=GovernmentSchemeResponse,
)
def get_government_scheme(
    scheme_id: int,
    db: Session = Depends(get_db),
):
    scheme = (
        db.query(GovernmentScheme)
        .filter(GovernmentScheme.id == scheme_id)
        .first()
    )

    if scheme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Government scheme not found",
        )

    return scheme


# --------------------------------
# Update Government Scheme
# --------------------------------
@router.put(
    "/{scheme_id}",
    response_model=GovernmentSchemeResponse,
)
def update_government_scheme(
    scheme_id: int,
    scheme_data: GovernmentSchemeUpdate,
    db: Session = Depends(get_db),
):
    scheme = (
        db.query(GovernmentScheme)
        .filter(GovernmentScheme.id == scheme_id)
        .first()
    )

    if scheme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Government scheme not found",
        )

    update_data = scheme_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(scheme, key, value)

    db.commit()
    db.refresh(scheme)

    return scheme


# --------------------------------
# Delete Government Scheme
# --------------------------------
@router.delete("/{scheme_id}")
def delete_government_scheme(
    scheme_id: int,
    db: Session = Depends(get_db),
):
    scheme = (
        db.query(GovernmentScheme)
        .filter(GovernmentScheme.id == scheme_id)
        .first()
    )

    if scheme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Government scheme not found",
        )

    db.delete(scheme)
    db.commit()

    return {
        "message": "Government scheme deleted successfully"
    }