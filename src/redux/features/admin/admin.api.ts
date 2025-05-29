import { api } from "@/redux/api/api";
import { IMeta } from "@/types/meta";
import { IUser } from "@/types/user";
import { generateQueryParams } from "@/utils";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation<
      { data: string[] },
      Pick<IUser, "email" | "password" | "phoneNumber" | "fullName" | "geo_profile">
    >({
      query: (id) => ({
        url: `/admin/create-admin`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["admin"],
    }),
    getAllClients: builder.query<{ data: IUser[]; meta: IMeta }, Record<string, string | number>>({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/admin/get-clients?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),
    toggleAccountActivation: builder.mutation<{ data: IUser[] }, string>({
      query: (userId) => {
        return {
          url: `/admin/toggle-activation/${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["admin"],
    }),
  }),
});
export const { useCreateAdminMutation, useGetAllClientsQuery, useToggleAccountActivationMutation } =
  adminApi;
