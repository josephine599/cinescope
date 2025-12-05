import React from "react";
import { useParams } from "react-router-dom";

function WatchPage() {
  const { filename } = useParams();
  const videoUrl = `http://localhost:5000/api/watch/${filename}`;

  return (
    <div className="watch-container">
      <video controls autoPlay src={videoUrl}></video>
    </div>
  );
}

export default WatchPage;
