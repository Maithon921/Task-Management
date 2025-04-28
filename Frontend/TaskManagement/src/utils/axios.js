import axios from "axios";

const axiosCustom = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosCustom.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosCustom;
