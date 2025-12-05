import React, { useState } from "react";

function Filter({ movies, setFilteredMovies }) {
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");

  const handleFilter = () => {
    let filtered = movies;

    // Filter by minimum rating
    if (rating) {
      filtered = filtered.filter((m) => m.vote_average >= Number(rating));
    }

    // Filter by release year
    if (year) {
      filtered = filtered.filter((m) =>
        m.release_date ? m.release_date.startsWith(year) : false
      );
    }

    setFilteredMovies(filtered);
  };

  return (
    <div className="filter-box">
      <select
        value={rating}
        onChange={(e) => {
          setRating(e.target.value);
          handleFilter();
        }}
      >
        <option value="">Filter by Rating</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
      </select>

      <input
        type="number"
        min="1900"
        max="2030"
        placeholder="Filter by Year (e.g. 2020)"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          handleFilter();
        }}
      />

      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
}

export default Filter;
