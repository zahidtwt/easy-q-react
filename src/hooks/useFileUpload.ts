import { endpoints } from "@/configs/config";
import axiosInstance from "@/utils/axios";
import { errorHandler } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const uploadFile = async (payload: FormData) => {
  const res = await axiosInstance.post(`${endpoints.dashboard.storage}upload`, payload, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      "Authorization": `Bearer ${Cookies.get("token")}`, // Add authorization header
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useFileUpload = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  return useMutation({
    mutationFn: (payload: FormData) => uploadFile(payload),
    onSuccess: (data) => {
      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
    onError: (error) => {
      // console.log(error);
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return error;
    },
  });
};
