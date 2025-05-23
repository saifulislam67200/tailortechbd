import { api } from "@/redux/api/api";
import { IProduct } from "@/types/product";
import { generateQueryParams } from "@/utils";

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
    getAllProducts: builder.query<{ data: IProduct[] }, Record<string, string | number>>({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/product/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    updateProductByProductId: builder.mutation<
      { data: IProduct },
      { payload: Partial<IProduct>; productId: string }
    >({
      query: ({ productId, payload }) => ({
        url: `/product/update/${productId}`,
        method: "PUT",
        body: {
          ...payload,
          _id: undefined,
        },
      }),
      invalidatesTags: ["product"],
    }),
  }),
});
export const {
  useCreateProductMutation,
  useGetProductByProductSlugQuery,
  useUpdateProductByProductIdMutation,
  useGetAllProductsQuery,
} = productApi;
