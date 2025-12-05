import React from "react";
import { Link } from "react-router-dom";
import "../src/App.css"; // ← use existing App.css instead of missing SideBar.css

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>CINESCOPE-MOVIE DISCOVERY $ WATCHLIST APP</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">All Movies</Link></li>
        <li><Link to="/trending">Trending</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
