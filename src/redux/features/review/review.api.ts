import { api } from "@/redux/api/api";

const reviewApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (payload) => ({
                url: `/review/create-review`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["review"],
        }),
        getAllReviewByProductId: builder.query({
            query: (projectId: string) => ({
                url: `/review/product/${projectId}`,
                method: "GET",
            }),
            providesTags: ["review"],
        }),
    }),
});

export const { useCreateReviewMutation, useGetAllReviewByProductIdQuery } = reviewApi;
