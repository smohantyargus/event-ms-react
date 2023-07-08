// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://192.1.200.111:9090/",
//   }),
//   reducerPath: "adminApi",
//   tagTypes: ["User", "EventSearch"],
//   endpoints: (build) => ({
//     loginUser: build.query({
//       query: ({ email, password }) => `login`,
//       providesTags: ["User"],
//     }),
//     getEvents: build.query({
//       query: (roll) => `getEvents`,
//       providesTags: ["User"],
//     }),
//     getEventById: build.query({
//       query: ({ id }) => ({
//         url: `events/${id}`,
//         method: "GET",
//         params: { id },
//       }),
//       providesTags: ["EventSearch"],
//     }),
//   }),
// });

// export const { useGetEventsQuery, useGetEventByIdQuery } = api;
