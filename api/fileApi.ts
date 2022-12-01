import axios from "axios";

const baseURL = "http://localhost:3001/api";

const axiosApi = axios.create({ baseURL });

export default axiosApi;
