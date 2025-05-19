import { api } from "@/redux/api/api";
import { IOrder } from "@/types/order";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      { data: IOrder },
      Omit<IOrder, "status" | "paymentStatus" | "totalProductAmount" | "user">
    >({
      query: (payload) => ({
        url: `/order/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});
export const { useCreateOrderMutation } = orderApi;
