import { api } from "@/redux/api/api";
import { IUser } from "@/types/user";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    registerCustomer: builder.mutation<
      { data: { result: IUser; token: string } },
      Pick<IUser, "password" | "phoneNumber" | "fullName" | "geo_profile">
    >({
      query: (post) => ({
        url: "/user/signup",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation<
      { data: { result: IUser; token: string } },
      { email?: string; phoneNumber?: string; mode?: "email" | "phoneNumber"; password: string }
    >({
      query: (post) => ({
        url: "/user/login",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    logoutUser: builder.mutation<{ data: null }, undefined>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
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
    sendVerificationOtp: builder.mutation<
      { data: { cooldownEnd: number; remainingSecond: number } },
      undefined
    >({
      query: () => ({
        url: "/user/send-verification-otp",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: builder.mutation<{ data: null }, { otp: number }>({
      query: (payload) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    getAuthor: builder.query<{ data: IUser }, undefined>({
      query: () => {
        return {
          url: `/user/author`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    updateProfile: builder.mutation<{ data: IUser }, Partial<IUser>>({
      query: (payload) => {
        return {
          url: `/user/update-profile`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});
export const {
  useRegisterCustomerMutation,
  useLoginUserMutation,
  useGetAuthorQuery,
  useSendVerificationOtpMutation,
  useChangePasswordMutation,
  useVerifyOtpMutation,
  useUpdateProfileMutation,
  useLogoutUserMutation,
} = userApi;
