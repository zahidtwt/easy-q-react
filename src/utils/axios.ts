import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}`,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   async (config) => {},
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     console.log("from axios instance", error);
//     throw error;
//   }
// );
export default axiosInstance;
