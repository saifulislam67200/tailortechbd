import { api } from "@/redux/api/api";
import { ICategory, TCategoryWithSubcategories } from "@/types/category";
import { IMeta } from "@/types/meta";
import { generateQueryParams } from "@/utils";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      { data: TCategoryWithSubcategories[]; meta: IMeta },
      Record<string, string | number | undefined>
    >({
      query: (queryParams) => {
        const queryString = generateQueryParams(queryParams);
        return {
          url: `/category/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["categories"],
    }),
    deleteCategoryById: builder.mutation<{ data: ICategory | null }, string>({
      query: (categoryId) => ({
        url: `/category/delete/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
    createCategory: builder.mutation<
      { data: ICategory },
      Pick<ICategory, "label" | "parent" | "display" | "thumbnail">
    >({
      query: (payload) => ({
        url: `/category/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useDeleteCategoryByIdMutation,
  useCreateCategoryMutation,
} = categoryApi;
