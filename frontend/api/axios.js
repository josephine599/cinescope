import axios from "axios";

// Use environment variable if provided, otherwise fallback to localhost
const API_BASE = import.meta.env.VITE_BACKEND_URL || "https://cinescope-10.onrender.com";

const instance = axios.create({
  baseURL: `${API_BASE}/movies`, // Added /movies to match backend router prefix
});

export default instance;
