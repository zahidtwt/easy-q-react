import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://restapi.adequateshop.com/api",
  // withCredentials: true,
});
