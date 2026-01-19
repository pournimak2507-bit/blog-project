import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false, // optional but safe
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
