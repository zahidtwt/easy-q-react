// import { endpoints } from "@/configs/config";
// import baseApi from "@/redux/api/baseApi";

// const userApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserData: builder.query({
//       query: () => "posts",
//       providesTags: ["userData"],
//     }),

//     login: builder.mutation({
//       query: (credential) => ({
//         url: endpoints.auth.login,
//         method: "POST",
//         body: credential,
//       }),
//     }),

//     signup: builder.mutation({
//       query: (userData) => ({
//         url: endpoints.auth.signup,
//         method: "POST",
//         body: userData,
//       }),
//     }),
//   }),
// });

// export const { useGetUserDataQuery, useLoginMutation, useSignupMutation } = userApi;
// export default userApi;
