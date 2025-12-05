// movieApi.js
const API_BASE = import.meta.env.VITE_BACKEND_URL; // <-- must use the env variable
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export async function getMovies() {
  if (!API_BASE) throw new Error("VITE_BACKEND_URL is not defined!");
  
  const res = await fetch(`${API_BASE}/movies/`); // ensure /movies/ matches your backend
  if (!res.ok) throw new Error("Failed to fetch movies");
  
  const data = await res.json();
  return data.map((m) => ({
    ...m,
    poster_full: m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : null,
  }));
}

export async function getMovieById(id) {
  const res = await fetch(`${API_BASE}/movies/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  
  const m = await res.json();
  return { ...m, poster_full: m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : null };
}
