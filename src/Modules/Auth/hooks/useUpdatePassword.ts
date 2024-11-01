import { endpoints } from "@/configs/config";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { ForgetPasswordFormFields } from "../forget-password/ForgetPasswordForm";
import { toast } from "sonner";

const useUpdatePassword = ({ dataDecorator }: { dataDecorator?: (token: string) => void }) => {
  return useMutation({
    mutationFn: async (payload: ForgetPasswordFormFields) => {
      return (await axiosInstance.post(endpoints.auth.updatePassword, { ...payload })).data;
    },
    onSuccess(data) {
      // console.log(data);
      toast.success("Update password successfully.");
      if (dataDecorator) {
        return dataDecorator(data.token);
      }
      return data;
    },

    // error --> error message, variables --> payload, context
    // onError(error, variables, context)
    // onError(error: AxiosError | unknown) {
    //   const errorMessage = errorHandler(error);
    //   toast.error(errorMessage);
    //   throw new Error(errorMessage);
    // },

    onError(error) {
      toast.error(error.message);
    },
  });
};

export default useUpdatePassword;
