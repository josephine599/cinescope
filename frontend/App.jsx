import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar.jsx";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import WatchlistPage from "./pages/Watchlist.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
  return (
    <Router>
      <div className="app-root">
        <Sidebar />
        <div className="main-area">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
