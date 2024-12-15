// import { AxiosError } from "axios";
import { endpoints } from "@/configs/config";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
// import { errorHandler } from "@/utils/errorHandler";
import { toast } from "sonner";
import { SignUpFormFields } from "../sign-up/validation";

const useSignUp = ({ onSuccessReg }: { onSuccessReg: (token: string) => void }) => {
  return useMutation({
    mutationFn: async (payload: SignUpFormFields) => {
      return (await axiosInstance.post(endpoints.auth.signup, { ...payload })).data;
    },

    onSuccess(data) {
      if (data?.token) {
        onSuccessReg(data.token);
        localStorage.setItem("userData", JSON.stringify(data?.userData));
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

export default useSignUp;
