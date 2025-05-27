"use client";
import FormCard from "@/components/ui/FormCard";
import Input from "@/components/ui/Input";
import { useResetPasswordMutation } from "@/redux/features/user/user.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import * as Yup from "yup";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPasswordView = ({ slug }: { slug: string }) => {
  const [resetPassword] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: { password: string }) => {
    try {
      const res = await resetPassword({
        token: slug || "",
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

      toast.success("Password reset successfully!");
      router.push("/login");
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="main_container min-h-[60dvh] py-[20px]">
      <FormCard headerButtons={[{ title: "Reset Password" }]} className="mt-[20px]">
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label className="text-[14px] font-[600] text-primary">Password</label>
                <div className="relative">
                  <Field
                    name="password"
                    as={Input}
                    type={showPassword === true ? "text" : "password"}
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

              <div className="mt-[10px]">
                <label className="text-[14px] font-[600] text-primary">Confirm Password</label>
                <div className="relative">
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type={showPassword === true ? "text" : "password"}
                    placeholder="confirmPassword"
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
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-[12px] text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`center hover:bg-primary-hover mt-[20px] w-full cursor-pointer rounded-[5px] border-[1px] border-border-main bg-primary px-[20px] py-[5px] text-[16px] text-white transition-all disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500`}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </FormCard>
    </div>
  );
};

export default ResetPasswordView;
