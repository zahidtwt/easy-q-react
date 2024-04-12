import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://nothing.com",
  }),
  tagTypes: ["posts"],
  endpoints: () => ({}),
});

// export const { useGetUserDataQuery, useUpdateUserDataMutation } = baseApi;

export default baseApi;

// usage
// const {data, isLoading, isError} = useGetUserDataQuery()
// const [callableFunction, {data, isLoading, isError}] = useUpdateUserDataMutation()
