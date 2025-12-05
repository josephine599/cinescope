import React, { useContext, useState } from "react";
import { addToWatchlist } from "../api/movieApi.js";
import { AuthContext } from "../context/AuthContext.jsx";

const WatchlistButton = ({ movieId }) => {
  const { token } = useContext(AuthContext);
  const [added, setAdded] = useState(false);

  const handleAdd = async (e) => {
    e.stopPropagation();
    try {
      await addToWatchlist(movieId, token);
      setAdded(true);
    } catch (err) {
      console.error("watchlist error", err);
    }
  };

  return (
    <button className={`button small ${added ? "added" : ""}`} onClick={handleAdd}>
      {added ? "Added" : "Add"}
    </button>
  );
};

export default WatchlistButton;
