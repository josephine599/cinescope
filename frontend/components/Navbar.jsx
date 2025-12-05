import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

const Navbar = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const params = createSearchParams({ q });
    navigate(`/?${params.toString()}`);
  };

  return (
    <nav>
      {/* Placeholder login/logout */}
      <a href="/login">Login</a>

      <div className="top-actions">
        <a className="action-link" href="/watchlist">
          Watchlist
        </a>
      </div>

      {/* Optional: Search form */}
      <form onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
