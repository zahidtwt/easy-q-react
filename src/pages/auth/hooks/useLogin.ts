import { AxiosError } from "axios";
import { endpoints } from "@/configs/config";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginFormFields } from "../login/validation";
import { errorHandler } from "@/utils/errorHandler";

const useLogin = ({ onSuccessLogin }: { onSuccessLogin: (token: string) => void }) => {
  return useMutation({
    mutationFn: async (payload: LoginFormFields) => {
      return (await axiosInstance.post(endpoints.auth.login, { ...payload, phone: payload.mobileNumber })).data;
    },
    // onSettled: (data) => {
    //       toast.success("Successfully logged in!");
    //       return data;
    //     },

    onSuccess(data) {
      if (data?.token) {
        onSuccessLogin(data.token);
        return data;
      }
      throw new Error("Login Failed");
    },

    // error --> error message, variables --> payload, context
    // onError(error, variables, context)
    onError(error: AxiosError | unknown) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
};

export default useLogin;
