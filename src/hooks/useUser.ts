import { endpoints } from "@/configs/config";
import { IUser } from "@/interfaces/user.interface";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const fetchUserData = async (): Promise<IUser> => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.users}/user-data`, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const useUpdateUser = ({ onUpdateUser }: { onUpdateUser: (userData: object) => void }) => {
  return useMutation({
    mutationFn: async ({ payload, id }: { payload: object; id: string }) => {
      return (
        await axiosInstance.put(
          `${endpoints.dashboard.users}/update/${id}`,
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

export const useUserData = ({ dataDecorator }: { dataDecorator?: (data: unknown) => unknown }) => {
  return useQuery<IUser, Error>({
    queryKey: ["profile-data"],
    queryFn: () => fetchUserData(),
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IUser;
      }
      return data;
    },
  });
};
