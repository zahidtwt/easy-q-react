import { AxiosError } from "axios";

export const errorHandler = (error: AxiosError | unknown | Error) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      if (Array.isArray(error?.response?.data)) {
        return error.response?.data[0].msg;
      }

      // console.log(error?.response?.data.error);

      if (error?.response?.data) {
        const errRes = error?.response?.data.error;
        // if (typeof errRes === "object" && "message" in errRes) {
        //   return errRes.message as string;
        // }

        return errRes;
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred!";
};
