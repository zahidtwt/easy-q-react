import { endpoints } from "@/lib/config";
import { axiosInstance } from "@/utils/axios";
import { LoginFormFields } from "./validation";

export const loginUser = async (payload: LoginFormFields) => {
  try {
    const response = await axiosInstance.post(`${endpoints.auth.login}`, payload);
    const userData = response.data;

    return userData;
  } catch (error) {
    console.error(error);
    throw new Error("Login failed");
  }
};
