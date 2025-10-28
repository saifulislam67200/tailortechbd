import { api } from "@/redux/api/api";
import { IUser } from "@/types/user";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    registerCustomer: builder.mutation<
      { data: { result: IUser; accessToken: string } },
      {
        email?: string;
        phoneNumber?: string;
        fullName: string;
        geo_profile: { country: string; phone_code: string };
        password: string;
      }
    >({
      query: (post) => ({
        url: "/user/signup",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation<
      { data: { result: IUser; accessToken: string } },
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
    forgotPassword: builder.mutation<
      { data: null },
      {emailOrPhone:string;  mode?: "email" | "phoneNumber" }
    >({
      query: (data) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation<
      { data: { token: string; password: string } },
      { token: string; password: string }
    >({
      query: (data) => ({
        url: "/user/reset-password",
        method: "POST",
        body: data,
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
