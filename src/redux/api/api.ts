import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
});

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["products", "user"],
  endpoints: () => ({}),
});
