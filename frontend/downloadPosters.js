import fs from "fs";
import path from "path";
import http from "http";
import https from "https";
import fetch from "node-fetch";

const MOVIES_URL = "http://127.0.0.1:8000/movies/";
const BACKEND_HOST = "http://127.0.0.1:8000"; // prepend to relative poster URLs
const ASSETS_DIR = path.join(process.cwd(), "public/assets");

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

function downloadImage(url, filepath) {
  const client = url.startsWith("https") ? https : http;
  client.get(url, (res) => {
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on("finish", () => file.close());
    } else {
      console.log(`Failed to download ${url} - ${res.statusCode}`);
    }
  }).on("error", (err) => console.log("Error:", err.message));
}

const main = async () => {
  try {
    const res = await fetch(MOVIES_URL);
    const movies = await res.json();
    movies.forEach(movie => {
      if (!movie.poster) return;
      const posterUrl = movie.poster.startsWith("http") ? movie.poster : `${BACKEND_HOST}${movie.poster}`;
      const filename = path.basename(movie.poster);
      const filepath = path.join(ASSETS_DIR, filename);
      downloadImage(posterUrl, filepath);
      console.log(`Downloading: ${filename}`);
    });
  } catch (err) {
    console.log("Failed to fetch movies:", err);
  }
};

main();

