import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movieApi";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const addToWatchlist = () => {
    const list = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const exists = list.find((m) => m.id === movie.id);

    if (!exists) {
      list.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(list));
      alert("Added to watchlist!");
    } else {
      alert("Already in watchlist!");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const m = await getMovieById(id);
        setMovie(m);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="details-page">
      <div className="details-hero" style={{ backgroundImage: `url(${movie.poster_full})` }} />
      <div className="details-body">
        <h1>{movie.title}</h1>
        <p className="meta">Rating: {movie.vote_average} • Release: {movie.release_date || "N/A"}</p>
        <p className="overview">{movie.overview}</p>

        <button onClick={addToWatchlist} className="watchlist-btn">
          + Add to Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
