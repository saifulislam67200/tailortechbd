import { api } from "@/redux/api/api";
import { IContactSupport } from "@/types/ContactSupport";

const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    createContactSupport: builder.mutation<{ data: IContactSupport }, IContactSupport>({
      query: (id) => ({
        url: `/contact-support/create`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["contactSupport"],
    }),
  }),
});
export const { useCreateContactSupportMutation } = uploadApi;
