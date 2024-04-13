// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* Version 1

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://nothing.com",
  }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => "posts",
      providesTags: ["posts"],
    }),

    updateUserData: builder.mutation({
      query: (post: string) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});
*/

// after breakdown to multiple api
// const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080",
//   }),
//   tagTypes: ["userData"],
//   endpoints: () => ({}),
// });

// export default baseApi;

/*
example of how to use query and mutation in component
  const {data, isLoading, isError} = useGetUserDataQuery()
  const [callableFunction, {data, isLoading, isError}] = useUpdateUserDataMutation()
*/
