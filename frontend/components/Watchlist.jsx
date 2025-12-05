import React, { useEffect, useState, useContext } from "react";
import { getWatchlist } from "../api/movieApi.js";
import MovieRow from "../components/MovieRow.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const list = await getWatchlist(token);
        setMovies(list);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [token]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Watchlist</h2>
      <MovieRow title="Saved" movies={movies} />
    </div>
  );
};

export default Watchlist;
