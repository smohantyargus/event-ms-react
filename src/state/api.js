import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090/",
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "UserSearch"],
  endpoints: (build) => ({
    getStudent: build.query({
      query: (roll) => `api/students/${roll}`,
      providesTags: ["User"],
    }),
    getStudentBySearch: build.query({
      query: ({ name, batch }) => ({
        url: "api/students/search",
        method: "GET",
        params: { name, batch },
      }),
      providesTags: ["UserSearch"],
    }),
  }),
});

export const { useGetStudentQuery, useGetStudentBySearchQuery } = api;
