import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { endpoints } from "@/configs/config";
import { errorHandler } from "@/utils/errorHandler";
import { toast } from "sonner";
import { EducationBoard } from "@/interfaces/education-board";

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

export const useGetEducationBoardList = ({ dataDecorator }: { dataDecorator?: (data: unknown) => unknown }) => {
  return useQuery<EducationBoard[], Error>({
    queryKey: ["educationBoardList"],
    queryFn: () => fetchBoardList(),
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as EducationBoard[];
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
