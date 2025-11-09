"use client";

import PhoneOtpVerification from "@/components/Login/PhoneOtpVerification";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import Button from "@/components/ui/Button";
import CountrySelector from "@/components/ui/CountrySelector";
import FormCard from "@/components/ui/FormCard";
import Input from "@/components/ui/Input";
import { useAppDispatch } from "@/hooks/redux";
import { ICountry } from "@/hooks/useCountries";
import { useForgotPasswordMutation } from "@/redux/features/user/user.api";
import { setUser } from "@/redux/features/user/user.slice";
import { IQueruMutationErrorResponse } from "@/types";
import { IUser } from "@/types/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").optional(),
  phoneNumber: Yup.string().optional(),
});

const ForgotPasswordView = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [country, setCountry] = useState<ICountry>({
    name: "Bangladesh",
    dial_code: "+880",
    code: "BD",
  });
  const [mode, setMode] = useState<"email" | "phoneNumber">("phoneNumber");
  const [isSent, setIsSent] = useState(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);
  const dispatch = useAppDispatch();

  // Reset cooldown when user goes back to the form
  useEffect(() => {
    if (!isSent) {
      setCooldownTime(0);
    }
  }, [isSent]);

  const handleSubmit = async (
    values: { email: string; phoneNumber: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!values.email && !values.phoneNumber) {
      toast.error("Please fill the form before submitting");
      return;
    }

    try {
      const phoneNumber = `${country.dial_code}${values.phoneNumber}`;
      const emailOrPhone = mode === "email" ? values.email : phoneNumber;
      const res = await forgotPassword({
        emailOrPhone: emailOrPhone,
        mode,
      });
      const error = res.error as IQueruMutationErrorResponse;

      if (error) {
        // Check if error response includes cooldown data (backend may return this in error.data)
        const errorData = error.data as IQueruMutationErrorResponse["data"] & {
          cooldownEnd?: number;
          remainingSeconds?: number;
        };
        if (errorData?.cooldownEnd && errorData?.remainingSeconds) {
          const remainingSeconds = errorData.remainingSeconds;
          setCooldownTime(remainingSeconds);
          setIsSent(true);
        }
        if (error.data?.message) {
          toast.error(error.data?.message);
        } else {
          toast.error("Something went wrong");
        }
        return;
      }

      setIsSent(true);
      if (mode === "email") {
        toast.success("Password reset link sent to your email!");
      } else if (mode === "phoneNumber") {
        toast.success("Password reset otp sent to your phone number!");
        setCooldownTime(300);
        dispatch(setUser({ phoneNumber } as Partial<IUser> as IUser));
      }
      resetForm();
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="main_container flex min-h-[80dvh] w-full flex-col gap-[20px] py-[20px] overflow-y-auto">
      <Breadcrumb />
      {!isSent ? (
        <FormCard
          headerButtons={[
            { title: "Forgot Password (Phone)", onClick: () => setMode("phoneNumber") },
            { title: "Forgot Password (Email)", onClick: () => setMode("email") },
          ]}
          className="mt-[20px]"
        >
          <Formik
            initialValues={{ email: "", phoneNumber: "" }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                {mode == "email" ? (
                  <>
                    <label className="text-[14px] font-[600] text-primary">Email</label>
                    <Field name="email" as={Input} type="email" placeholder="Email" />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="mt-1 text-[12px] text-red-500"
                    />
                  </>
                ) : (
                  <>
                    <CountrySelector onCountrySelect={setCountry} />
                    <div className="mt-[16px] flex flex-col gap-[5px]">
                      <div className="flex items-center justify-start gap-0">
                        <span className="border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
                          {country.dial_code}
                        </span>
                        <Field
                          type="number"
                          name="phoneNumber"
                          placeholder="Enter Your Mobile Number"
                          as={Input}
                        />
                      </div>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <span className="text-[12px] text-danger">{errors.phoneNumber}</span>
                      )}
                    </div>
                  </>
                )}

                <Button isLoading={isLoading} className="mt-[20px] w-full">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </FormCard>
      ) : (
        <>
          {mode === "email" ? (
            <div className="center mx-auto mt-[50px] flex h-full w-full max-w-[500px] flex-col gap-[10px] bg-transparent p-[16px]">
              <Image
                src="/images/logos/logo.png"
                width={100}
                height={100}
                alt="success"
                className="mx-auto"
              />
              <h6 className="fot-[700] text-center text-[25px]">Password reset link sent</h6>
              <span className="text-center text-[14px] text-muted">
                We have sent a password reset link to your provided email. Check your inbox or spam
                section for the link. if you did not receive the link, please try again.
              </span>
              <Button className="w-full" onClick={() => setIsSent(false)}>
                Try Again
              </Button>
            </div>
          ) : (
            <PhoneOtpVerification setIsSent={setIsSent} initialCooldown={cooldownTime} />
          )}
        </>
      )}
    </div>
  );
};

export default ForgotPasswordView;
