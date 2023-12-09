import axios from "axios";

// const baseURL = "http://localhost:3001/api"
export const URL = "https://subetuarchivo-dev-mnsz.3.us-1.fl0.io";
const baseURL =
  process.env.NODE_ENV === "production"
    ? `${URL}/api`
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
