import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const statisticsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSalesSummary: builder.query({
            query: ({ searchQuery }) => ({
                url: `/statistics/sales-summery?period=${searchQuery}`,
                method: "GET",
            }),
            providesTags: ["statistics"],
        }),
        getThisYearEarnings: builder.query({
            query: () => ({
                url: `/statistics/earnings-this-year`,
                method: "GET",
            }),
            providesTags: ["statistics"],
        }),
        getRecentSales: builder.query({
            query: (query) => {
                const queryString = generateQueryParams(query);
                console.log(queryString, "queryString🐞🐞")
                return {
                    url: `/statistics/recent-sales?${queryString}`,
                    method: "GET"
                }
            },
            providesTags: ["statistics"]
        })
    }),
});

export const {
    useGetSalesSummaryQuery,
    useGetThisYearEarningsQuery,
    useGetRecentSalesQuery
} = statisticsApi;
