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
      providesTags: ["contactSupport"],
    }),

    createContactSupport: builder.mutation<
      { data: IContactSupport },
      Pick<IContactSupport, "email" | "subject" | "message" | "fullName" | "phoneNumber">
    >({
      query: (id) => ({
        url: `/contact-support/create`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["contactSupport"],
    }),
    markContactMessageAsRead: builder.mutation<{ data: IContactSupport }, string>({
      query: (messageId) => ({
        url: `/contact-support/mark-read/${messageId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["contactSupport"],
    }),
    getUnReadContactMessageCount: builder.query<{ data: { count: number } }, undefined>({
      query: () => ({
        url: `/contact-support/unread-count`,
        method: "get",
      }),
      providesTags: ["contactSupport"],
    }),
  }),
});
export const {
  useCreateContactSupportMutation,
  useGetAllContactsToSupportQuery,
  useGetUnReadContactMessageCountQuery,
  useMarkContactMessageAsReadMutation
} = uploadApi;
