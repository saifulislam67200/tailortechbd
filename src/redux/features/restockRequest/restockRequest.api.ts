import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const restockRequestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRestockRequest: builder.query({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/restock-request?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["restockRequest"],
    }),

    createRestockRequest: builder.mutation({
      query: (payload) => ({
        url: `/restock-request/create-request`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["restockRequest"],
    }),
  }),
});

export const { useGetAllRestockRequestQuery, useCreateRestockRequestMutation } = restockRequestApi;
