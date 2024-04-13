// import baseApi from "@/redux/api/baseApi";

// const taskApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserData: builder.query({
//       query: () => "posts",
//       providesTags: ["posts"],
//     }),

//     updateUserData: builder.mutation({
//       query: (post: string) => ({
//         url: "/posts",
//         method: "POST",
//         body: post,
//       }),
//       invalidatesTags: ["posts"],
//     }),
//   }),
// });

// export const { useGetUserDataQuery, useUpdateUserDataMutation } = taskApi;
