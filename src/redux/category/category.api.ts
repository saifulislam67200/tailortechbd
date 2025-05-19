import { api } from "@/redux/api/api";
import { ICategory } from "@/types/category"; 

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDisplayedCategories: builder.query<{ data: ICategory[] }, void>({
      query: () => ({
        url: "/category/get?mode=tree",
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetDisplayedCategoriesQuery } = categoryApi;
