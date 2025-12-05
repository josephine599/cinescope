from pydantic import BaseModel

class WatchlistBase(BaseModel):
    movie_id: int

class WatchlistOut(BaseModel):
    id: int
    movie_id: int
    user_id: int

    class Config:
        from_attributes = True

