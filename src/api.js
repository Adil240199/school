import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : `${process.env.REACT_APP_API_URL}/api`;

export const API_BASE_URL = baseURL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
});



export default api;
