from sqlalchemy import Column, Integer, String, Float
from app.database.db import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    tmdb_id = Column(Integer, unique=True, index=True)
    title = Column(String)
    overview = Column(String)
    poster_path = Column(String)
    vote_average = Column(Float)
