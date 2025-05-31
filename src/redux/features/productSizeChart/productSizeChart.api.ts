import { api } from "@/redux/api/api";

const productSizeChartApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createSizeChart: builder.mutation({
            query: (payload) => ({
                url: `/size-chart/create`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["size-chart"],
        }),


        getAllSizeChart: builder.query({
            query: () => ({
                url: `/size-chart/`,
                method: "GET",
            }),
            providesTags: ["size-chart"],
        }),


        deleteQuickSizeChart: builder.mutation({
            query: (sizeChartId) => ({
                url: `/size-chart/delete/${sizeChartId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["size-chart"],
        }),
    }),
});


export const {
    useCreateSizeChartMutation,
    useGetAllSizeChartQuery,
    useDeleteQuickSizeChartMutation
} = productSizeChartApi;
