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
  }),
});
export const { useCreateProductMutation } = productApi;
