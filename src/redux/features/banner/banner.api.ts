import { api } from "@/redux/api/api";
import { IBanner } from "@/types/banner";
import { generateQueryParams } from "@/utils";

const bannerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanners: builder.query<{ data: IBanner[] }, Record<string, string | number>>({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/banner?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["banner"],
    }),

    toggleBannerStatus: builder.mutation<{ data: IBanner }, string>({
      query: (bannerId) => ({
        url: `/banner/${bannerId}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["banner"],
    }),

    createBanner: builder.mutation<{ data: IBanner }, Partial<IBanner>>({
      query: (payload) => ({
        url: `/banner/create-banner`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["banner"],
    }),

    updateBannerById: builder.mutation<
      { data: IBanner },
      { bannerId: string; payload: Partial<IBanner> }
    >({
      query: ({ bannerId, payload }) => ({
        url: `/banner/update/${bannerId}`,
        method: "PATCH",
        body: {
          ...payload,
          _id: undefined,
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteBannerById: builder.mutation<{ data: IBanner }, string>({
      query: (bannerId) => ({
        url: `/banner/delete/${bannerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),

    updateBannerSequences: builder.mutation<
      { message: string; data: unknown },
      { payload: { _id: string; index: number }[] }
    >({
      query: ({ payload }) => ({
        url: `/banner/update-banner-sequences`,
        method: "PATCH",
        body: { payload },
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetAllBannersQuery,
  useToggleBannerStatusMutation,
  useCreateBannerMutation,
  useUpdateBannerByIdMutation,
  useDeleteBannerByIdMutation,
  useUpdateBannerSequencesMutation,
} = bannerApi;
