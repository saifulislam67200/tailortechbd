import { api } from "@/redux/api/api";
import { ICategory } from "@/types/category";
import { IMeta } from "@/types/meta";
import { generateQueryParams } from "@/utils/generateQueryParams";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<{ data: ICategory[]; meta: IMeta }, Record<string, string | number>>({
      query: (queryParams) => {
        const queryString = generateQueryParams(queryParams);
        return {
          url: `/category/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
