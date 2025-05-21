import { api } from "@/redux/api/api";
import { IProduct } from "@/types/product";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<{ data: IProduct }, Partial<IProduct>>({
      query: (payload) => ({
        url: `/product/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    getProductByProductSlug: builder.query<{ data: IProduct }, string>({
      query: (slug) => ({
        url: `/product/get/${slug}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});
export const { useCreateProductMutation, useGetProductByProductSlugQuery } = productApi;
