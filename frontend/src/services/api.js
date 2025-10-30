import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL =
  `https://${VITE_API_URL}/api/v1` || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("CodeEditor-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("CodeEditor-token");
      localStorage.removeItem("CodeEditor-user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
