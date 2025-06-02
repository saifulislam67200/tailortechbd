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
      query: ({ filter }) => ({
        url: `/statistics/earnings-this-year?filter=${filter}`,
        method: "GET",
      }),
      providesTags: ["statistics"],
    }),
    getRecentSales: builder.query({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/statistics/recent-sales?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
    getTopSellingProducts: builder.query({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/statistics/top-selling-products?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
    getRecentUnansweredQuestion: builder.query({
      query: () => ({
        url: "statistics/recent-unanswered-question",
        method: "GET",
      }),
      providesTags: ["statistics"],
    }),
    getSmsStatistics: builder.query<
      {
        data: {
          balance: number;
          validity: string;
          totalSmsRemaining: number;
        };
      },
      undefined
    >({
      query: () => ({
        url: "/statistics/sms-status",
        method: "GET",
      }),
      providesTags: ["statistics"],
    }),
  }),
});

export const {
  useGetSalesSummaryQuery,
  useGetThisYearEarningsQuery,
  useGetRecentSalesQuery,
  useGetTopSellingProductsQuery,
  useGetRecentUnansweredQuestionQuery,
  useGetSmsStatisticsQuery
} = statisticsApi;
