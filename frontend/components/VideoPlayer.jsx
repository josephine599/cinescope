import React from "react";

const VideoPlayer = ({ src }) => {
  if (!src) return <div>No video available</div>;
  return (
    <video controls className="video-player">
      <source src={src} type="video/mp4" />
      Your browser doesn't support video playback.
    </video>
  );
};

export default VideoPlayer;
