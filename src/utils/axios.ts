import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}`,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
