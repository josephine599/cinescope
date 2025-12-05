from pydantic import BaseModel
from typing import Optional

class MovieBase(BaseModel):
    tmdb_id: int
    title: str
    overview: Optional[str] = None
    release_date: Optional[str] = None
    poster_path: Optional[str] = None
    vote_average: Optional[float] = None

class MovieOut(MovieBase):
    id: int

    class Config:
        from_attributes = True

class WatchlistBase(BaseModel):
    movie_id: int

class WatchlistOut(BaseModel):
    id: int
    user_id: int
    movie_id: int

    class Config:
        from_attributes = True
