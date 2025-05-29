import { api } from "@/redux/api/api";

const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    createContactSupport: builder.mutation<{ data: string[] }, FormData>({
      query: (id) => ({
        url: `/upload/multiple`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["file"],
    }),
  }),
});
export const { useCreateContactSupportMutation } = uploadApi;
