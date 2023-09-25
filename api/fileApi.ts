import axios from "axios";

// const baseURL = "http://localhost:3001/api"
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://subetuarchivo-fhnr-dev.fl0.io/api"
    : "http://localhost:3001/api";

const axiosApi = axios.create({ baseURL });

if (typeof localStorage !== "undefined") {
  axiosApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log("token --> : ", token);
    if (token && config.headers) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  });
}

export default axiosApi;
