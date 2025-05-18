"use client";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import Button from "@/components/ui/Button";
import FormCard from "@/components/ui/FormCard";
import Input from "@/components/ui/Input";
import { useSendVerificationOtpMutation } from "@/redux/features/user/user.api";
import dateUtils from "@/utils/date";
import { useEffect, useState } from "react";
import { BsFillPhoneFill } from "react-icons/bs";

const Verification = () => {
  const [sendVerificationOTP] = useSendVerificationOtpMutation();
  const [remainingTime, setRemainingTime] = useState<number>(0);

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

  return (
    <div className="main_container flex min-h-screen w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />
      <FormCard headerButtons={[{ title: "Verification" }]}>
        <form>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[16px] font-[500] text-pirmary-foreground">
              Verification code
            </label>
            <div className="flex items-center justify-start gap-0">
              <span className="center h-[32px] border-y-[1px] border-l-[1px] border-border-main bg-[#e9ecef] px-[12px] py-[6px] text-[12px] text-muted">
                <BsFillPhoneFill />
              </span>
              <Input type="number" placeholder="Enter Your Mobile Number" />
            </div>

            <Button
              type="button"
              onClick={handleResend}
              disabled={remainingTime > 0}
              className="mt-2"
            >
              {remainingTime > 0
                ? `Resend in ${dateUtils.formatSecondsToMMSS(remainingTime)}`
                : "Resend Code"}
            </Button>
          </div>
        </form>
      </FormCard>
    </div>
  );
};

export default Verification;
