import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const apiCallingFunc = async () => {
  return (
    await axios.get("http://localhost:5173/mock-data/question-papers.json", {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const useGetQuestionPaper = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  return useQuery({
    queryKey: ["dataLakeData"],
    queryFn: () => apiCallingFunc(),
    // enabled: !!Id,
    staleTime: 10000,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data);
      }
      return data;
    },
  });
};

export default useGetQuestionPaper;
