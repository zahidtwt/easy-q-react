import { axiosInstance } from "@/services/axios";

export const loginUser = async () => {
  try {
    const newPayload = {
      email: "testuser@yopmail.com",
      password: "Strong@123",
    };
    //fake payload to test out all (happy + error) paths

    const response = await axiosInstance.post("/authaccount/login", newPayload);
    const userData = response.data;

    return userData;
  } catch (error) {
    throw new Error("Login failed");
  }
};
