import { api } from "@/redux/api/api";
import { IMeta } from "@/types/meta";
import { IOrder } from "@/types/order";
import { generateQueryParams } from "@/utils";

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

    getAllOrders: builder.query<{ data: IOrder[]; meta?: IMeta }, Record<string, string | number>>({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/order/all?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),

    changeOrderStatus: builder.mutation<{ data: IOrder }, { id: string; data: { status: string } }>(
      {
        query: ({ id, data }) => ({
          url: `/order/update/status/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["order"],
      }
    ),

    updateOrder: builder.mutation<
      { data: IOrder },
      { id: string; data: Pick<IOrder, "orderItems"> }
    >({
      query: ({ id, data }) => ({
        url: `/order/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useChangeOrderStatusMutation,
  useUpdateOrderMutation
} = orderApi;
