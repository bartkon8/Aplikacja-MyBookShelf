import axios from "axios";
import { triggerGlobalLogout } from "../AuthContext";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      triggerGlobalLogout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
