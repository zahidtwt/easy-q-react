import { AxiosError } from "axios";

export const errorHandler = (error: AxiosError | unknown | Error) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      if (Array.isArray(error?.response?.data)) {
        return error.response?.data[0].msg;
      }

      if (error?.response?.data) {
        const errRes = error?.response?.data;
        if (typeof errRes === "object" && "message" in errRes) {
          return errRes.message as string;
        }
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred!";
};
