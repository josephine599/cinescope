from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.schemas.watchlist_schema import WatchlistBase, WatchlistOut
from app.auth.auth import get_current_user

router = APIRouter(prefix="/watchlist", tags=["Watchlist"])

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Add to watchlist
@router.post("/", response_model=WatchlistOut)
def add_to_watchlist(item: WatchlistBase, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    existing = db.query(Watchlist).filter(
        Watchlist.user_id == current_user.id,
        Watchlist.movie_id == item.movie_id
    ).first()
    if existing:
        return existing
    new_item = Watchlist(user_id=current_user.id, movie_id=item.movie_id)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

# Get user's watchlist
@router.get("/", response_model=list[WatchlistOut])
def get_watchlist(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(Watchlist).filter(Watchlist.user_id == current_user.id).all()

