import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const couponApi = api.injectEndpoints({
  endpoints: (builder) => ({
    applyCoupon: builder.mutation({
      query: (payload) => ({
        url: `/coupon/apply-coupon`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["coupon"],
    }),

    createCoupon: builder.mutation({
      query: (payload) => ({
        url: `/coupon/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["coupon"],
    }),

    getAllCoupons: builder.query({
      query: (query) => {
        const queryString = generateQueryParams(query);
        console.log(queryString, "queryString coupon");
        return {
          url: `/coupon/get-all?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["coupon"],
    }),

    toggleActiveInActive: builder.mutation({
      query: (couponId) => ({
        url: `/coupon/${couponId}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["coupon"],
    }),

    deleteCoupon: builder.mutation({
      query: (couponId) => ({
        url: `coupon/delete/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useApplyCouponMutation,
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useToggleActiveInActiveMutation,
  useDeleteCouponMutation,
} = couponApi;
