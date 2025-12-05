import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import "../src/App.css";
import { getMovies } from "../api/movieApi.js";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getMovies();
        setMovies(
          data.map((movie) => ({
            ...movie,
            poster: movie.poster_full, // Use the full poster URL from movies.js
          }))
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="home">
      <h2>Trending</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
