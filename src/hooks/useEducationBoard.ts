import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { endpoints } from "@/configs/config";
import { errorHandler } from "@/utils/errorHandler";
import { toast } from "sonner";
import { EducationBoard, ICreateEducationBoardPayload, IEditEducationBoardPayload } from "@/interfaces/education-board";

const fetchBoardList = async () => {
  const res = await axiosInstance.get(endpoints.dashboard.educationBoard, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
    },
  });

  // console.log("from hook", res);
  return res.data;
};

const createNewBoard = async (payload: ICreateEducationBoardPayload) => {
  const res = await axiosInstance.post(`${endpoints.dashboard.educationBoard}create`, payload, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
    },
  });
  return res.data;
};

const updateBoard = async ({ _id, ...restPayload }: IEditEducationBoardPayload) => {
  const res = await axiosInstance.put(`${endpoints.dashboard.educationBoard}update/${_id}`, restPayload, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
    },
  });
  return res.data;
};

export const useGetEducationBoardList = ({
  dataDecorator,
}: {
  dataDecorator?: (data: EducationBoard[]) => EducationBoard[];
}) => {
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
    mutationFn: (payload: ICreateEducationBoardPayload) => createNewBoard(payload),
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

export const useUpdateEducationBoard = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IEditEducationBoardPayload) => updateBoard(payload),
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
