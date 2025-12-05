import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
const __dirname = path.resolve();

// Serve movie metadata
app.get("/api/movies", (req, res) => {
  const movies = [
    {
      id: 1,
      title: "Sample Movie",
      banner: "/sample.jpg",
      file: "/videos/sample.mp4"
    }
  ];
  res.json(movies);
});

// Stream video
app.get("/api/watch/:filename", (req, res) => {
  const filePath = path.join(__dirname, "videos", req.params.filename);

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });

    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// Download route
app.get("/api/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "videos", req.params.filename);
  res.download(filePath);
});

app.use("/videos", express.static(path.join(__dirname, "videos")));
app.use("/", express.static(path.join(__dirname)));

app.listen(5000, () => console.log("Backend running on port 5000"));
