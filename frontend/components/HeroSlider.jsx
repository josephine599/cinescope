import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const HeroSlider = ({ movies = [] }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    startAuto();
    return () => clearTimeout(timeoutRef.current);
  }, [index, movies]);

  const startAuto = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % Math.min(movies.length, 8));
    }, 4000);
  };

  if (!movies || movies.length === 0) return null;
  const visible = movies.slice(0, 8);

  return (
    <div className="hero-slider">
      {visible.map((m, i) => (
        <div
          key={m.id}
          className={`hero-slide ${i === index ? "active" : ""}`}
          style={{
            backgroundImage: `linear-gradient(rgba(5,5,10,0.4), rgba(5,5,10,0.8)), url(${m.poster_full})`,
          }}
        >
          <div className="hero-inner">
            <h2 className="hero-title">{m.title}</h2>
            <p className="hero-meta">{m.release_date || "N/A"} • {Number(m.vote_average).toFixed(1)}</p>
            <Link to={`/movie/${m.id}`} className="hero-button">View</Link>
          </div>
        </div>
      ))}

      <div className="hero-controls">
        <button onClick={() => setIndex((i) => (i - 1 + visible.length) % visible.length)}>&lt;</button>
        <div className="dots">
          {visible.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={i === index ? "dot active" : "dot"} />
          ))}
        </div>
        <button onClick={() => setIndex((i) => (i + 1) % visible.length)}>&gt;</button>
      </div>
    </div>
  );
};

export default HeroSlider;
