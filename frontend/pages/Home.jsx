import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import "../src/App.css";
import Search from "../components/Search.jsx";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("http://127.0.0.1:8000/movies/");
        const data = await response.json();

        // ⭐ Convert TMDB poster path to real usable image URL
        setMovies(
          data.map((movie) => ({
            ...movie,
            poster: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
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