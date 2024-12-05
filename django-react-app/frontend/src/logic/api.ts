import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

export const urlBase = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: urlBase,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      
    } 
    config.headers["Content-Type"]="application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;


