import { api } from "@/redux/api/api";

const couponApi = api.injectEndpoints({
    endpoints: (builder) => ({

        applyCoupon: builder.mutation({
            query: (payload) => ({
                url: `/coupon/apply-coupon`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["contactSupport"],
        }),

        createCoupon: builder.mutation({
            query: (payload) => ({
                url: `/coupon/create`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["contactSupport"],
        }),

    }),
});



export const {
    useApplyCouponMutation,
    useCreateCouponMutation
} = couponApi;
