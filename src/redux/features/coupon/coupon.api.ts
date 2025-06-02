import { api } from "@/redux/api/api";

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
  }),
});

export const { useApplyCouponMutation, useCreateCouponMutation } = couponApi;
