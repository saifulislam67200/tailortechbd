import { api } from "@/redux/api/api";
import { IComplaint } from "@/types/complaint";
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
    createComplaintSuggestion: builder.mutation<
      { data: IComplaint },
      Omit<IComplaint, "_id" | "createdAt" | "updatedAt" | "resolutionDate">
    >({
      query: (payload) => ({
        url: "/order/complain-suggestion",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["order"],
    }),
    getAllComplaintSuggestion: builder.query<
      { data: IComplaint[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/order/complain-suggestion?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    deleteComplaintSuggestionById: builder.mutation<{ data: IComplaint }, string>({
      query: (id) => ({
        url: `/order/complain-suggestion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    updateComplaintSuggestionById: builder.mutation<
      { data: IComplaint },
      { id: string; payload: Partial<IComplaint> }
    >({
      query: ({ id, payload }) => ({
        url: `/order/complain-suggestion/${id}`,
        method: "PATCH",
        body: payload,
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
  useCreateComplaintSuggestionMutation,
  useGetAllComplaintSuggestionQuery,
  useDeleteComplaintSuggestionByIdMutation,
  useUpdateComplaintSuggestionByIdMutation,
} = orderApi;
