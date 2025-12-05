from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import movies_router
from app.routers import user_router
from app.routers import watchlist_router
from app.routers import media_router
from app.routers import rating_router

app = FastAPI(title="CineScope backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies_router)
app.include_router(user_router)
app.include_router(watchlist_router)
app.include_router(media_router)
app.include_router(rating_router)
