import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5120/api",
});

// הוספת Interceptor לכל בקשה
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    console.log("token",token);
     
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;