from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.rating import Rating
from app.schemas.rating_schema import RatingCreate, RatingOut

router = APIRouter(prefix="/ratings", tags=["Ratings"])

@router.post("/", response_model=RatingOut)
def rate_movie(data: RatingCreate, db: Session = Depends(get_db)):
    existing = db.query(Rating).filter_by(
        user_id=data.user_id,
        movie_id=data.movie_id
    ).first()

    if existing:
        existing.rating = data.rating
        db.commit()
        db.refresh(existing)
        return existing

    new_rating = Rating(
        user_id=data.user_id,
        movie_id=data.movie_id,
        rating=data.rating
    )
    db.add(new_rating)
    db.commit()
    db.refresh(new_rating)
    return new_rating


@router.get("/{movie_id}", response_model=list[RatingOut])
def get_ratings(movie_id: int, db: Session = Depends(get_db)):
    return db.query(Rating).filter_by(movie_id=movie_id).all()
