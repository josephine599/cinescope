import os
import requests
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

def fetch_popular_movies(page: int = 1):
    url = f"{BASE_URL}/movie/popular"
    params = {"api_key": TMDB_API_KEY, "language": "en-US", "page": page}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json().get("results", [])
