import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import "../src/App.css";
import { getMovies } from "../api/movieApi.js";
import Search from "../components/Search.jsx";
import Filter from "../components/Filter.jsx";

function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]); // NEW state

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getMovies();
        const mapped = data.map((movie) => ({
          ...movie,
          poster: movie.poster_full,
        }));

        setMovies(mapped);
        setFilteredMovies(mapped); // initial list
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="home">
      <h2>Trending</h2>

      {/* 🔍 Search + Filter */}
      <Search movies={movies} setFilteredMovies={setFilteredMovies} />
      <Filter movies={movies} setFilteredMovies={setFilteredMovies} />

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
