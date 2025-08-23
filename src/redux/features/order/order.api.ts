import { api } from "@/redux/api/api";
import { IMeta } from "@/types/meta";
import { IOrder } from "@/types/order";
import { generateQueryParams } from "@/utils";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      { data: IOrder },
      Omit<
        IOrder,
        "status" | "paymentStatus" | "totalProductAmount" | "user" | "_id" | "orderId" | "invoiceId"
      >
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

    getOrderById: builder.query<{ data: IOrder }, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getPendingOrderCount: builder.query<{ data: { pendingOrderCount: number } }, undefined>({
      query: () => {
        return {
          url: `/order/count/pending`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    getOrGenerateOrderInvoiceId: builder.query<{ data: { invoiceId: string } }, string>({
      query: (orderId) => {
        return {
          url: `/order/get-invoiceId/${orderId}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),

    changeOrderStatus: builder.mutation<
      { data: IOrder },
      { id: string; data: { status: string; note?: string } }
    >({
      query: ({ id, data }) => ({
        url: `/order/update/status/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["order", "statistics"],
    }),
    updateOrder: builder.mutation<{ data: IOrder }, { id: string; data: Partial<IOrder> }>({
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
  useUpdateOrderMutation,
  useGetOrderByIdQuery,
  useGetPendingOrderCountQuery,
  useGetOrGenerateOrderInvoiceIdQuery,
} = orderApi;
