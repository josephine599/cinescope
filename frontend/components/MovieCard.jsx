import React, { useState } from "react";
import "./movieCard.css"; // your existing CSS

function MovieCard({ movie }) {
  const [rating, setRating] = useState(movie.rating || 0); // local state for stars

  const handleRate = (value) => {
    setRating(value);
    // Optionally send the rating to your backend
    fetch(`http://127.0.0.1:8000/movies/${movie.id}/rate/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: value }),
    }).catch((err) => console.error("Error sending rating:", err));
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <h3>{movie.title}</h3>

      {/* Rating Stars */}
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
        {/* Watch button opens YouTube trailer */}
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
        <button>Download</button>
      </div>
    </div>
  );
}

export default MovieCard;
