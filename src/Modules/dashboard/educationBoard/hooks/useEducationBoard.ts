import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { endpoints } from "@/configs/config";
import { errorHandler } from "@/utils/errorHandler";
import { toast } from "sonner";

const fetchBoardList = async () => {
  return (
    await axiosInstance.get(endpoints.dashboard.educationBoard, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const createNewBoard = async (payload: { name: string }) => {
  const res = await axiosInstance.post(`${endpoints.dashboard.educationBoard}create`, payload, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
    },
  });
  return res.data;
};

// const useGetInstitution = ({ Id, dataDecorator }: { Id?: string; dataDecorator?: (data: unknown) => void }) => {
const useGetEducationBoardList = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  return useQuery({
    queryKey: ["educationBoardList"],
    queryFn: () => fetchBoardList(),
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

export const useCreateEducationBoard = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string }) => createNewBoard(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["educationBoardList"],
      });

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return error;
    },
  });
};

export default useGetEducationBoardList;
