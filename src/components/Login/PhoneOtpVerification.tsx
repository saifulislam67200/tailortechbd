"use client";

import { useState, useEffect } from "react";
import { BsFillPhoneFill } from "react-icons/bs";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useVerifyOtpMutation,
  useResetPhonePasswordMutation,
} from "@/redux/features/user/user.api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormCard from "@/components/ui/FormCard";
import dateUtils from "@/utils/date";
import { IQueruMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";

const otpSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is required").length(6, "OTP must be 6 digits"),
});

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const PhoneOtpVerification = ({
  setIsSent,
  initialCooldown = 0,
}: {
  setIsSent: (isSent: boolean) => void;
  initialCooldown?: number;
}) => {
  const [remainingTime, setRemainingTime] = useState<number>(initialCooldown);
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resetPhonePassword, { isLoading: isResetting }] = useResetPhonePasswordMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (initialCooldown > 0) {
      setRemainingTime(initialCooldown);
    }
  }, [initialCooldown]);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleVerifyOtp = async (values: { otp: string }) => {
    setErrorMessage("");

    const response = await verifyOtp({
      otp: Number(values.otp),
    });

    const error = response?.error as IQueruMutationErrorResponse;

    if (error) {
      if (error?.data?.message) {
        setErrorMessage(error.data?.message);
      } else {
        setErrorMessage("Something went wrong");
      }
      return;
    }

    toast.success("OTP verified successfully");
    setOtpVerified(true);
    setErrorMessage("");
  };

  const handleResetPassword = async (values: { password: string }) => {
    if (!user?.phoneNumber) {
      toast.error("Phone number not found. Please request password reset again.");
      setIsSent(false);
      return;
    }

    try {
      const res = await resetPhonePassword({
        phoneNumber: user.phoneNumber,
        password: values.password,
      });

      const error = res.error as IQueruMutationErrorResponse;

      if (error) {
        if (error.data?.message) {
          toast.error(error.data?.message);
        } else {
          toast.error("Something went wrong");
        }
        return;
      }

      toast.success("Password reset successfully!", {
        description: "Please login with your new password",
      });
      router.push("/login");
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  if (otpVerified) {
    return (
      <FormCard headerButtons={[{ title: "Reset Password" }]}>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetPasswordSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-[10px]">
              <div>
                <label className="text-[14px] font-[600] text-primary">Password</label>
                <div className="relative">
                  <Field
                    name="password"
                    as={Input}
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 bottom-[8px] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-[12px] text-red-500"
                />
              </div>

              <div>
                <label className="text-[14px] font-[600] text-primary">Confirm Password</label>
                <div className="relative">
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="confirmPassword"
                  />
                  <button
                    type="button"
                    className="absolute right-3 bottom-[8px] cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-[12px] text-red-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isResetting}
                isLoading={isResetting}
                className="mt-[10px] w-full"
              >
                {isResetting ? "Resetting..." : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </FormCard>
    );
  }

  return (
    <FormCard headerButtons={[{ title: "Verify OTP" }]}>
      <Formik initialValues={{ otp: "" }} validationSchema={otpSchema} onSubmit={handleVerifyOtp}>
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-start gap-0">
              <span className="center h-[32px] border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
                <BsFillPhoneFill />
              </span>
              <Field
                name="otp"
                as={Input}
                type="number"
                placeholder="Enter Your Verification Code"
                maxLength={6}
              />
            </div>
            <ErrorMessage name="otp" component="span" className="text-[14px] text-danger" />
            {errorMessage && <span className="text-[14px] text-danger">{errorMessage}</span>}
            <Button
              type="submit"
              disabled={isSubmitting || isVerifying}
              isLoading={isVerifying}
              className="w-full"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
            <span className="text-[14px] text-strong">
              Didn&apos;t receive the code?{" "}
              {remainingTime > 0 ? (
                `Retry in ${dateUtils.formatSecondsToMMSS(remainingTime)}`
              ) : (
                <button
                  onClick={() => setIsSent(false)}
                  disabled={remainingTime > 0}
                  className="cursor-pointer font-[700]"
                >
                  Retry
                </button>
              )}
            </span>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};

export default PhoneOtpVerification;
