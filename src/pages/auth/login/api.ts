import { endpoints } from "@/configs/config";
import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import { LoginFormFields } from "./validation";

export const loginUser = async (data: LoginFormFields) => {
  try {
    const payload = { phone: data.mobileNumber, ...data };
    return await axiosInstance.post(`${endpoints.auth.login}`, payload);
  } catch (error: AxiosError | unknown) {
    console.error(error);
    if (error instanceof AxiosError) return error?.response?.data;
  }
};
