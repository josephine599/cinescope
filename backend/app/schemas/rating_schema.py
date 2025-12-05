from pydantic import BaseModel

class RatingCreate(BaseModel):
    user_id: int
    movie_id: int
    rating: float

class RatingOut(BaseModel):
    id: int
    user_id: int
    movie_id: int
    rating: float

    class Config:
        orm_mode = True
