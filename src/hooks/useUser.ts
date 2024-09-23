import { endpoints } from "@/configs/config";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useUpdateUser = ({ onUpdateUser }: { onUpdateUser: (userData: object) => void }) => {
  return useMutation({
    mutationFn: async ({ payload, id }: { payload: object; id: string }) => {
      return (
        await axiosInstance.put(
          `${endpoints.dashboard.users}update/${id}`,
          { ...payload },
          {
            headers: {
              ...axiosInstance.defaults.headers.common, // Merge existing common headers
              Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
            },
          }
        )
      ).data;
    },

    onSuccess(data) {
      if (data?.phone) {
        onUpdateUser(data);
        return data;
      }
      throw new Error("Login Failed");
    },

    onError(error) {
      toast.error(error.message);
      throw new Error(error.message);
    },
    // onError(error: AxiosError | unknown) {
    //   const errorMessage = errorHandler(error);
    //   toast.error(errorMessage);
    //   throw new Error(errorMessage);
    // },
  });
};
