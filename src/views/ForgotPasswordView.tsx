"use client";

import Breadcrumb from "@/components/ui/BreadCrumbs";
import FormCard from "@/components/ui/FormCard";
import Input from "@/components/ui/Input";
import { IQueruMutationErrorResponse } from "@/types";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "@/redux/features/user/user.api";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordView = () => {
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (
    values: { email: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const res = await forgotPassword({
        email: values.email,
      });

      console.log("Forgot Password Response:", res?.data?.data);

      const error = res.error as IQueruMutationErrorResponse;

      if (error) {
        if (error.data.message) {
          toast.error(error.data.message);
        } else {
          toast.error("Something went wrong");
        }
        return;
      }

      toast.success("Password reset link sent to your email!");
      resetForm();
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="main_container min-h-[100dvh] py-[20px]">
      <Breadcrumb />
      <FormCard headerButtons={[{ title: "Forgot Password" }]} className="mt-[20px]">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <label className="text-[14px] font-[600] text-primary">Email</label>
              <Field name="email" as={Input} type="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-[12px] text-red-500"
              />

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

export default ForgotPasswordView;
