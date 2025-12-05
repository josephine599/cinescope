import React, { useState } from "react";
import { rateMovie } from "../api/movieApi.js";

const RatingStars = ({ movieId }) => {
  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const handleClick = async (val) => {
    setRating(val);
    try {
      await rateMovie(movieId, val);
    } catch (e) {
      console.error("rate error", e);
    }
  };

  return (
    <div className="rating-stars" onClick={(e) => e.stopPropagation()}>
      {stars.map((s) => (
        <button key={s} className={`star ${s <= rating ? "on" : ""}`} onClick={() => handleClick(s)}>
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
