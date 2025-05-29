import { api } from "@/redux/api/api";
import { IContactSupport } from "@/types/ContactSupport";
import { IMeta } from "@/types/meta";
import { generateQueryParams } from "@/utils";

const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getAllContactsToSupport: builder.query<
      { data: IContactSupport[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/contact-support/get-all?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["file"],
    }),

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
export const { useCreateContactSupportMutation, useGetAllContactsToSupportQuery } = uploadApi;
