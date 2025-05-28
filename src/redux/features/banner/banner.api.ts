import { api } from "@/redux/api/api";
import { IBanner } from "@/types/banner";

const bannerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanners: builder.query<{ data: IBanner[] }, void>({
      query: () => ({
        url: `/banner`,
        method: "GET",
      }),
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

    deleteBannerById: builder.mutation<{ data: IBanner }, string>({
      query: (bannerId) => ({
        url: `/banner/delete/${bannerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const { useGetAllBannersQuery, useToggleBannerStatusMutation, useCreateBannerMutation, useDeleteBannerByIdMutation, } =
  bannerApi;
