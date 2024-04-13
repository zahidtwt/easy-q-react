// import axios, { AxiosRequestConfig } from "axios";
// import { MutationResponse } from "../../../../../../entity-models/mutation-response.interface";
// import { CONTENT_TYPE } from "../../../../../../constants/global.constant";
// import { useMutation } from "@tanstack/react-query";
// import { useSnackbar } from "notistack";
// import { useTranslation } from "react-i18next";
// import { useUpdateUserCommandProps, UpdateUserTypes } from "../interfaces/edit-user-form.interfaces";

// const useUpdateUserCommand = ({ refetch, onCloseForm, setValue, watch }: useUpdateUserCommandProps) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const { t } = useTranslation("user");

//   return useMutation({
//     mutationFn: async (payload: UpdateUserTypes) => {
//       const config: AxiosRequestConfig = {
//         url: `${import.meta.env.VITE_BUSSINESS_CUSTOMERPROVISIONING_SERVICE}/UpdateUser`,
//         method: "PUT",
//         headers: {
//           "Content-Type": CONTENT_TYPE.applicationJson,
//         },
//         withCredentials: true,
//         data: payload,
//       };

//       return (await axios.request<MutationResponse>(config)).data;
//     },
//     onSettled: (data) => {
//       if (data?.ExternalError) {
//         enqueueSnackbar(data?.ExternalError, {
//           variant: "error",
//         });
//       } else {
//         enqueueSnackbar(t("USER_UPDATE_SUCCESS_MESSAGE"), {
//           variant: "success",
//         });
//         refetch();
//         onCloseForm();
//         setValue("PhoneNumber", watch("PhoneNumber"));
//       }
//     },
//   });
// };

// export default useUpdateUserCommand;
