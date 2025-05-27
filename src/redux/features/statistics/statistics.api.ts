import { api } from "@/redux/api/api";

const statisticsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSalesSummary: builder.query({
            query: ({ searchQuery }) => ({
                url: `/statistics/sales-summery?period=${searchQuery}`,
                method: "GET",
            }),
            providesTags: ["statistics"],
        }),
    }),
});

export const {
    useGetSalesSummaryQuery
} = statisticsApi;
