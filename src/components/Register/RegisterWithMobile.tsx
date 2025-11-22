import { useAppDispatch } from "@/hooks/redux";
import { ICountry } from "@/hooks/useCountries";
import { useSendSignupOtpMutation, useSignupWithOtpMutation } from "@/redux/features/user/user.api";
import { setToken, setUser } from "@/redux/features/user/user.slice";
import { IQueruMutationErrorResponse } from "@/types";
import dateUtils from "@/utils/date";
import { Field, Form, Formik, FormikHelpers } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner11 } from "react-icons/im";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import Button from "../ui/Button";
import CountrySelector from "../ui/CountrySelector";
import FormMessage, { IFormMessage } from "../ui/FormMessage";
import Input from "../ui/Input";

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const initialValues = {
  phoneNumber: "",
  fullName: "",
  userVerificationCode: "",
  otp: "",
};

const phoneValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("* Phone number is required")
    .matches(/^\d{6,15}$/, "* Enter a valid phone number"),
  fullName: Yup.string().required("* Full Name is required"),
  userVerificationCode: Yup.string().required("* Verification code is required"),
});

const otpValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("* Phone number is required")
    .matches(/^\d{6,15}$/, "* Enter a valid phone number"),
  fullName: Yup.string().required("* Full Name is required"),
  otp: Yup.string()
    .required("* OTP is required")
    .matches(/^\d{6}$/, "* OTP must be exactly 6 digits"),
});

const RegisterWithMobile = () => {
  const [country, setCountry] = useState<ICountry>();
  const [otpSent, setOtpSent] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<number>(generateVerificationCode());

  const [sendSignupOtp, { isLoading: isSendingOtp }] = useSendSignupOtpMutation();
  const [signupWithOtp, { isLoading: isSigningUp }] = useSignupWithOtpMutation();
  const [formMessage, setFormMessage] = useState<IFormMessage | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Countdown timer effect
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

  const handleSendOtp = async (
    values: typeof initialValues,
    helper: FormikHelpers<typeof initialValues>
  ) => {
    setFormMessage(null);
    if (!country) {
      helper.setFieldError("phoneNumber", "* Country is required");
      return;
    }

    // Verify bot detection code
    if (values.userVerificationCode !== verificationCode.toString()) {
      helper.setFieldError("userVerificationCode", "* Verification code does not match");
      return;
    }

    const phone = `${country?.dial_code}${values.phoneNumber}`;

    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      helper.setFieldError("phoneNumber", "* Invalid phone number");
      return;
    }

    setPhoneNumber(phone);
    setFullName(values.fullName);

    const res = await sendSignupOtp({ phoneNumber: phone, fullName: values.fullName });
    const error = res.error as IQueruMutationErrorResponse;

    if (error) {
      if (error.data?.message) {
        setFormMessage({ message: error.data.message, type: "error" });
      } else {
        setFormMessage({ message: "Something went wrong", type: "error" });
      }
      return;
    }

    const serverCooldownEnd = res.data?.data?.cooldownEnd;
    if (serverCooldownEnd) {
      const now = Date.now();
      const timeLeft = Math.floor((serverCooldownEnd - now) / 1000);
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
    }

    setOtpSent(true);
    setFormMessage({ message: "OTP sent successfully", type: "success" });
  };

  const handleResendOtp = async () => {
    if (!phoneNumber || !fullName) return;

    const res = await sendSignupOtp({ phoneNumber, fullName });
    const error = res.error as IQueruMutationErrorResponse;

    if (error) {
      if (error.data?.message) {
        setFormMessage({ message: error.data.message, type: "error" });
      } else {
        setFormMessage({ message: "Something went wrong", type: "error" });
      }
      return;
    }

    const serverCooldownEnd = res.data?.data?.cooldownEnd;
    if (serverCooldownEnd) {
      const now = Date.now();
      const timeLeft = Math.floor((serverCooldownEnd - now) / 1000);
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
    }

    setFormMessage({ message: "OTP resent successfully", type: "success" });
  };

  const handleSignup = async (
    values: typeof initialValues,
    helper: FormikHelpers<typeof initialValues>
  ) => {
    setFormMessage(null);

    const otpString = String(values.otp || "").trim();
    if (!otpString || otpString.length !== 6 || !/^\d{6}$/.test(otpString)) {
      helper.setFieldError("otp", "Please enter a valid 6-digit OTP");
      return;
    }

    if (!country) {
      helper.setFieldError("phoneNumber", "* Country is required");
      return;
    }

    const res = await signupWithOtp({
      phoneNumber: phoneNumber,
      otp: Number(otpString),
      fullName: fullName,
      geo_profile: {
        country: country.name,
        phone_code: country.dial_code,
      },
    });

    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        setFormMessage({ message: error.data.message, type: "error" });
      } else {
        setFormMessage({ message: "Something went wrong", type: "error" });
      }
      return;
    }

    const user = res.data?.data.result;
    const token = res.data?.data.accessToken;

    if (user) {
      dispatch(setUser(user));
    }

    if (token) {
      dispatch(setToken(token));
    }

    setFormMessage(null);
    const redirect = Cookies.get("redirect") || "/";
    Cookies.remove("redirect");
    router.replace(redirect);
  };

  const onSubmit = async (
    values: typeof initialValues,
    helper: FormikHelpers<typeof initialValues>
  ) => {
    if (!otpSent) {
      await handleSendOtp(values, helper);
    } else {
      await handleSignup(values, helper);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={otpSent ? otpValidationSchema : phoneValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-[16px]">
          <CountrySelector onCountrySelect={(c) => setCountry(c)} />

          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center justify-start gap-0">
              <span className="border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
                {country?.dial_code || "+880"}
              </span>
              <Field
                type="number"
                name="phoneNumber"
                placeholder="Enter Your Mobile Number"
                as={Input}
                disabled={otpSent}
              />
            </div>
            {touched.phoneNumber && errors.phoneNumber && (
              <span className="text-[12px] text-danger">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="flex flex-col gap-[5px]">
            <Field
              type="text"
              name="fullName"
              placeholder="Enter Your full name"
              as={Input}
              disabled={otpSent}
            />
            {touched.fullName && errors.fullName && (
              <span className="text-[12px] text-danger">{errors.fullName}</span>
            )}
          </div>

          {!otpSent && (
            <div className="flex flex-col gap-[5px]">
              <div className="flex items-center justify-start">
                <div className="center w-[187px] rounded-[5px] bg-[#0c0c0c] text-[28px] text-white">
                  {verificationCode}
                </div>
                <button
                  type="button"
                  onClick={() => setVerificationCode(generateVerificationCode())}
                  className="h-[42px] cursor-pointer rounded-[5px] bg-[#198754] px-[12px] py-[6px] text-white"
                >
                  <ImSpinner11 className="h-[16px] w-[16px]" />
                </button>
              </div>

              <div className="flex flex-col gap-[5px]">
                <Field
                  type="text"
                  name="userVerificationCode"
                  placeholder="Enter above numbers"
                  as={Input}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                {touched.userVerificationCode && errors.userVerificationCode && (
                  <span className="text-[12px] text-danger">{errors.userVerificationCode}</span>
                )}
              </div>
            </div>
          )}

          {otpSent && (
            <div className="flex flex-col gap-[5px]">
              <Field
                type="text"
                name="otp"
                placeholder="Enter Your OTP"
                as={Input}
                maxLength={6}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
              {touched.otp && errors.otp && (
                <span className="text-[12px] text-danger">{errors.otp}</span>
              )}
              <span className="text-[14px] text-strong">
                Didn&apos;t receive the code?{" "}
                {remainingTime > 0 ? (
                  `Resend in ${dateUtils.formatSecondsToMMSS(remainingTime)}`
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={remainingTime > 0 || isSendingOtp}
                    className="cursor-pointer font-[700] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Resend
                  </button>
                )}
              </span>
            </div>
          )}

          <FormMessage formMessage={formMessage} />
          <Button isLoading={otpSent ? isSigningUp : isSendingOtp} type="submit" className="w-full">
            {otpSent ? "Sign Up" : "Send OTP"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterWithMobile;
