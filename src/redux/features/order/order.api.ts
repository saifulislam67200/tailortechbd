import { api } from "@/redux/api/api";
import { IOrder } from "@/types/order";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      { data: IOrder },
      Omit<IOrder, "status" | "paymentStatus" | "totalProductAmount" | "user" | "_id">
    >({
      query: (payload) => ({
        url: `/order/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["order"],
    }),

    getMyOrders: builder.query<{ data: IOrder[] }, void>({
      query: () => ({
        url: `/order/my`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});
export const { useCreateOrderMutation, useGetMyOrdersQuery } = orderApi;
