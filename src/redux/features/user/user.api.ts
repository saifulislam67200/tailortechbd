import { api } from "@/redux/api/api";
import { IUser } from "@/types/user";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    registerCustomer: builder.mutation<
      { data: { result: IUser; token: string } },
      Omit<IUser, "_id" | "role" | "email">
    >({
      query: (post) => ({
        url: "/user/signup",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (post: { email: string; password: string }) => ({
        url: "/user/login",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (payload: { oldPassword: string; password: string }) => ({
        url: "/user/change-password",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    sendVerificationOtp: builder.mutation<{data:{ cooldownEnd: number; remainingSecond: number }}, undefined>(
      {
        query: () => ({
          url: "/user/send-verification-otp",
          method: "POST",
        }),
        invalidatesTags: ["user"],
      }
    ),
    getAuthor: builder.query<{ data: IUser }, string>({
      query: (token) => {
        return {
          url: `/user/author`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["user"],
    }),
  }),
});
export const {
  useRegisterCustomerMutation,
  useLoginUserMutation,
  useGetAuthorQuery,
  useSendVerificationOtpMutation,
  useChangePasswordMutation,
} = userApi;
