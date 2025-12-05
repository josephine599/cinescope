import React, { useState } from "react";
import "./movieCard.css";

function MovieCard({ movie }) {
  const [rating, setRating] = useState(movie.rating || 0);

  const handleRate = (value) => {
    setRating(value);
    fetch(`http://127.0.0.1:8000/movies/${movie.id}/rate/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: value }),
    }).catch((err) => console.error("Error sending rating:", err));
  };

  const addToWatchlist = () => {
    const list = JSON.parse(localStorage.getItem("watchlist") || "[]");
    if (!list.find((m) => m.id === movie.id)) {
      list.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(list));
      alert("Added to watchlist!");
    } else {
      alert("Already in watchlist");
    }
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <h3>{movie.title}</h3>

      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "filled" : ""}`}
            onClick={() => handleRate(star)}
          >
            ★
          </span>
        ))}
      </div>

      <div className="actions">
        <button
          onClick={() => {
            const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
              movie.title + " trailer"
            )}`;
            window.open(youtubeSearch, "_blank");
          }}
        >
          Watch
        </button>

        <button onClick={addToWatchlist}>Watchlist</button>

        <button>Download</button>
      </div>
    </div>
  );
}

export default MovieCard;
