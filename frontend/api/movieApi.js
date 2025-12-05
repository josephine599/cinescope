const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/movies";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export async function getMovies() {
  const res = await fetch(`${API_BASE}/movies`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  // Expecting backend movies list with poster_path etc.
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
