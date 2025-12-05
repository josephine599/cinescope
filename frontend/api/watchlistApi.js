import axios from "./axios";

export const addToWatchlist = async (movie, token) => {
  try {
    const res = await axios.post(
      "/watchlist/",
      { movie_id: movie.tmdb_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error adding to watchlist:", err);
    throw err;
  }
};

export const getWatchlist = async (token) => {
  try {
    const res = await axios.get("/watchlist/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching watchlist:", err);
    throw err;
  }
};
