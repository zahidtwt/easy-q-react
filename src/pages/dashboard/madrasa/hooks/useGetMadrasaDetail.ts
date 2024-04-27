// import { endpoints } from "@/configs/config";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// const fetchDataLakeData = async () => {
//   return (
//     await axiosInstance.get(endpoints.dashboard.getAllInstitute, {
//       headers: {
//         ...axiosInstance.defaults.headers.common, // Merge existing common headers
//         Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
//       },
//     })
//   ).data;
// };

const apiCallingFunc = async () => {
  return (
    await axios.get("http://localhost:5173/mock-data/madrasas.json", {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const useGetMadrasaDetail = ({ Id, dataDecorator }: { Id?: string; dataDecorator?: (data: unknown) => void }) => {
  return useQuery({
    queryKey: ["dataLakeData", Id],
    queryFn: () => apiCallingFunc(),
    enabled: !!Id,
    staleTime: 10000,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data);
      }
      return data;
    },
  });
};

export default useGetMadrasaDetail;
