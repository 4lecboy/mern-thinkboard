import axios from 'axios';

// Set the base URL for the API
// Use environment variable for production or default to local development
const BASE_URL = import.meta.env.VITE_API_BASE_URL ? 'http://localhost:5001/api':"/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default axiosInstance;