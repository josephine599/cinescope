from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.models.watchlist import Watchlist

router = APIRouter(prefix="/watchlist", tags=["watchlist"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_to_watchlist(user_id: int, movie_id: int, db: Session = Depends(get_db)):
    item = Watchlist(user_id=user_id, movie_id=movie_id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.get("/{user_id}")
def get_watchlist(user_id: int, db: Session = Depends(get_db)):
    return db.query(Watchlist).filter(Watchlist.user_id == user_id).all()
