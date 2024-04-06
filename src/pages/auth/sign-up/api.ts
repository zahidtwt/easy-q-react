import { endpoints } from "@/configs/config";
import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import { SignUpFormFields } from "./validation";

export const registerUser = async (data: SignUpFormFields) => {
  try {
    const payload = { phone: data.mobileNumber, ...data };
    return await axiosInstance.post(`${endpoints.auth.signup}`, payload);
  } catch (error: AxiosError | unknown) {
    console.error(error);
    if (error instanceof AxiosError) return error?.response?.data;
  }
};
