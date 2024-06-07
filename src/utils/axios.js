import axios from "axios";
import cookie from "./cookie";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/v1",
  baseURL: "https://takeh.net/v1",
});

axiosInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${cookie.getData("token")}`;
  return config;
});

export default axiosInstance;