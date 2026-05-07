import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem("jwt")) {
        localStorage.clear();
        window.location.reload();
      }
    }
    return Promise.reject(error);
  },
);

// ── Keep-alive ping ──────────────────────────────────────────
// Render free tier spins down after 15 mins of inactivity.
// Ping every 14 mins to keep the server warm while the user has the app open.
const PING_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes
setInterval(() => {
  api.get("/api/restaurants").catch(() => {}); // silent — don't throw
}, PING_INTERVAL_MS);
