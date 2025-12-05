import React, { useState } from "react";

function Search({ movies, setFilteredMovies }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);

    // filter movies based on title
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search movies or TV shows..."
      value={query}
      onChange={handleSearch}
      className="search-input"
    />
  );
}

export default Search;
