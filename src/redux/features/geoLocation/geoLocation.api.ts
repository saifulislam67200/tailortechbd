import { api } from "@/redux/api/api";
import { IDistrict, IDivision, IUpazial } from "@/types/geoLocation";

const geoLocationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query<IDivision[], undefined>({
      query: () => ({
        url: `/geo-location/division`,
        method: "GET",
      }),
      providesTags: ["geoLocation"],
    }),
    getDistricts: builder.query<IDistrict[], Partial<string>>({
      query: (division_id) => ({
        url: `/geo-location/district?division_id=${division_id}`,
        method: "GET",
      }),
      providesTags: ["geoLocation"],
    }),
    getUpozilas: builder.query<IUpazial[], Partial<string>>({
      query: (district_id) => ({
        url: `/geo-location//upazila-city?district_id=${district_id}`,
        method: "GET",
      }),
      providesTags: ["geoLocation"],
    }),
  }),
});
export const { useGetDivisionsQuery, useGetDistrictsQuery, useGetUpozilasQuery } = geoLocationApi;
