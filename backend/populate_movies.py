import os
import requests
from sqlalchemy.orm import Session
from app.database.db import SessionLocal, Base, engine
from app.models.movie import Movie
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = os.getenv("TMDB_BASE_URL", "https://api.themoviedb.org/3")

if not TMDB_API_KEY:
    raise ValueError("TMDB_API_KEY not set in environment")

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

def fetch_popular_movies(page=1):
    """Fetch movies from TMDB popular endpoint"""
    url = f"{TMDB_BASE_URL}/movie/popular?api_key={TMDB_API_KEY}&language=en-US&page={page}"
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    return data.get("results", [])

def populate_movies(total_movies=200):
    db: Session = SessionLocal()
    added = 0
    seen_ids = set()  # Track IDs added in this run
    page = 1

    print(f"Starting population for {total_movies} movies...")

    while added < total_movies:
        movies = fetch_popular_movies(page=page)
        if not movies:
            print("No more movies fetched from TMDB.")
            break

        for movie in movies:
            tmdb_id = movie["id"]

            # Skip if duplicate in DB
            if db.query(Movie).filter_by(tmdb_id=tmdb_id).first():
                continue

            # Skip if duplicate in this run
            if tmdb_id in seen_ids:
                continue

            new_movie = Movie(
                tmdb_id=tmdb_id,
                title=movie.get("title", "No Title"),
                overview=movie.get("overview", ""),
                poster_path=movie.get("poster_path", ""),
                vote_average=movie.get("vote_average", 0.0)
            )
            db.add(new_movie)
            seen_ids.add(tmdb_id)
            added += 1

            print(f"Processing movie: {tmdb_id} - {movie.get('title')}")

            if added >= total_movies:
                break

        page += 1

    db.commit()
    db.close()
    print(f"Finished! {added} unique movies added to the database.")

if __name__ == "__main__":
    populate_movies(total_movies=200)
