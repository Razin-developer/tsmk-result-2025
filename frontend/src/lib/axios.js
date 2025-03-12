import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:756/api",
  withCredentials: true,
});
