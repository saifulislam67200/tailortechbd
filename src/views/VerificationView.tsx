"use client";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import Button from "@/components/ui/Button";
import FormCard from "@/components/ui/FormCard";
import Input from "@/components/ui/Input";
import {
  useSendVerificationOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/user/user.api";
import { IQueruMutationErrorResponse } from "@/types";
import dateUtils from "@/utils/date";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillPhoneFill } from "react-icons/bs";
import { toast } from "sonner";

const VerificationView = () => {
  const [sendVerificationOTP] = useSendVerificationOtpMutation();
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  // send OTP on mount
  useEffect(() => {
    const sendOtp = async () => {
      const response = await sendVerificationOTP(undefined);
      const serverCooldownEnd = response?.data?.data?.cooldownEnd;

      if (serverCooldownEnd) {
        const now = Date.now();
        const timeLeft = Math.floor((serverCooldownEnd - now) / 1000);
        setRemainingTime(timeLeft > 0 ? timeLeft : 0);
      }
    };
    sendOtp();
  }, [sendVerificationOTP]);

  // countdown timer effect
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

  // resend handler
  const handleResend = async () => {
    const response = await sendVerificationOTP(undefined);
    const serverCooldownEnd = response?.data?.data?.cooldownEnd;

    if (serverCooldownEnd) {
      const now = Date.now();
      const timeLeft = Math.floor((serverCooldownEnd - now) / 1000);
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const otp = form.otp?.value || "";

    if (!otp) {
      setErrorMessage("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      setErrorMessage("Please enter a valid OTP");
      return;
    }

    const response = await verifyOtp({ otp: Number(otp) });
    const error = response?.error as IQueruMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        setErrorMessage(error.data.message);
      } else {
        setErrorMessage("Something went wrong");
      }

      return;
    }

    toast.success("OTP verified successfully");
    router.replace("/");

    setErrorMessage("");
  };

  return (
    <div className="main_container flex min-h-screen w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />
      <FormCard headerButtons={[{ title: "Verification" }]}>
        <form onSubmit={handleVerify} className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-start gap-0">
            <span className="center h-[32px] border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
              <BsFillPhoneFill />
            </span>
            <Input required name="otp" type="number" placeholder="Enter Your Verification Code" />
          </div>
          {errorMessage ? <span className="text-[14px] text-danger">{errorMessage}</span> : ""}
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
          <span className="text-[14px] text-strong">
            didn&apos;t receive the code?{" "}
            {remainingTime > 0 ? (
              `Resend in ${dateUtils.formatSecondsToMMSS(remainingTime)}`
            ) : (
              <button
                onClick={handleResend}
                disabled={remainingTime > 0}
                className="cursor-pointer font-[700]"
              >
                Resend
              </button>
            )}
          </span>
        </form>
      </FormCard>
    </div>
  );
};

export default VerificationView;
