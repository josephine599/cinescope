from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.movie import Movie
from app.schemas.movie_schema import MovieOut
from app.utils.tmdb import fetch_popular_movies

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/", response_model=list[MovieOut])
def get_movies(db: Session = Depends(get_db)):
    movies = db.query(Movie).all()
    return movies

@router.post("/populate")
def populate_movies(db: Session = Depends(get_db)):
    movies = fetch_popular_movies(page=1)
    for m in movies:
        existing = db.query(Movie).filter_by(tmdb_id=m["id"]).first()
        if not existing:
            movie = Movie(
                tmdb_id=m["id"],
                title=m["title"],
                overview=m["overview"],
                poster_path=m["poster_path"],
                vote_average=m["vote_average"]
            )
            db.add(movie)
    db.commit()
    return {"message": "Movies populated successfully!"}
