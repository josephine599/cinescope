import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";

const WatchlistPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setList(saved);
    } catch {
      setList([]);
    }
  }, []);

  return (
    <div className="watchlist-page">
      <h2>Your Watchlist</h2>
      <div className="watchlist-grid">
        {list.length === 0 ? <p>Your watchlist is empty</p> : list.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
};

export default WatchlistPage;
