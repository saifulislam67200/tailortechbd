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

    }),
});


export const {
    useCreateSizeChartMutation,
    useGetAllSizeChartQuery
} = productSizeChartApi;
