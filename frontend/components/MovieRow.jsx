import React from "react";
import MovieCard from "./MovieCard.jsx";

const MovieRow = ({ title, movies = [] }) => {
  return (
    <section className="movie-row">
      <div className="row-header">
        <h3>{title}</h3>
        <button className="more-btn">More</button>
      </div>
      <div className="row-scroller">
        {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  );
};

export default MovieRow;
