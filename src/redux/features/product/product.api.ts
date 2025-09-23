import { api } from "@/redux/api/api";
import { ICategory } from "@/types/category";
import { IDamageProduct } from "@/types/damageProduct";
import { IMeta } from "@/types/meta";
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
    getRelatedProuctsByProductSlug: builder.query<
      { data: IProduct[] },
      { slug: string; limit: number }
    >({
      query: ({ slug, limit }) => ({
        url: `/product/get/related/${slug}?limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getTopProucts: builder.query<{ data: IProduct[] }, Record<string, string | number>>({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/product/top-ordered?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getAllProducts: builder.query<
      { data: (IProduct & { subCategory?: string | ICategory })[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/product/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),

    getProductStock: builder.query({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/product/stock-status?${queryString}`,
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
    deleteProductById: builder.mutation<{ data: IProduct }, string>({
      query: (productId) => ({
        url: `/product/delete/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    createDamagedProduct: builder.mutation<
      { data: IProduct },
      Pick<IDamageProduct, "causeOfDamage" | "color" | "price" | "quantity" | "productId" | "size">
    >({
      query: (payload) => ({
        url: `/product/damage-product`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    getDamagedProduct: builder.query<
      { data: IDamageProduct[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/product/damage-product?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductByProductSlugQuery,
  useUpdateProductByProductIdMutation,
  useGetAllProductsQuery,
  useGetRelatedProuctsByProductSlugQuery,
  useGetTopProuctsQuery,
  useDeleteProductByIdMutation,
  useGetProductStockQuery,
  useLazyGetProductStockQuery,
  useCreateDamagedProductMutation,
  useGetDamagedProductQuery,
} = productApi;
