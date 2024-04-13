// import { UseQueryResult, useQuery } from "@tanstack/react-query";
// import axios, { AxiosRequestConfig } from "axios";
// import { IUser } from "../../user-list-view/interface/user-management.interface";
// import { ApiResponse } from "../../../../../../entity-models/api-response.interface";
// import { UrlHelperService } from "../../../../../../utilities/url-helper/url-helper.service";
// import { CONTENT_TYPE } from "../../../../../../constants/global.constant";
// const useGetSingleUserQuery = (params: { Id: string }): UseQueryResult<ApiResponse<IUser>, Error> => {
//   const queryParam = UrlHelperService.objectToQueryParam(params);

//   const url = `${import.meta.env.VITE_BUSSINESS_CUSTOMERPROVISIONING_SERVICE}/GetUser` + `?${queryParam}`;

//   const config: AxiosRequestConfig = {
//     method: "GET",
//     headers: {
//       "content-type": CONTENT_TYPE.applicationJson,
//     },
//     withCredentials: true,
//   };

//   const fetchSingleUser = async () => {
//     return (await axios.get<ApiResponse<IUser>>(url, config)).data;
//   };

//   return useQuery<ApiResponse<IUser>, Error>({
//     queryKey: ["get-user", { queryParam }],
//     queryFn: fetchSingleUser,
//   });
// };

// export default useGetSingleUserQuery;
