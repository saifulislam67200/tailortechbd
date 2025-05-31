"use client";

import { useAppSelector } from "@/hooks/redux";
import { useCreateContactSupportMutation } from "@/redux/features/contactSupport/contactSupport.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FiSend } from "react-icons/fi";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import * as Yup from "yup";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";

// Initial form values
const initialValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("* Full name is required"),
  email: Yup.string().email("Invalid email").required("* Email is required"),
  subject: Yup.string().required("* Subject is required"),
  message: Yup.string().required("* Message is required"),
  phoneNumber: Yup.string().required("* Phone number is required"),
});

export default function ContactForm() {
  const { user } = useAppSelector((state) => state.user);

  const [createContactSupport, { isLoading }] = useCreateContactSupportMutation();

  const splitDialCode = () => {
    let phoneNumber = user?.phoneNumber || "";
    const dialCode = user?.geo_profile?.phone_code || "+880";
    phoneNumber = phoneNumber.replace(dialCode, "");
    return { dialCode, phoneNumber };
  };
  const { dialCode, phoneNumber } = splitDialCode();

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm, setFieldError }: FormikHelpers<typeof initialValues>
  ) => {
    const phone = `+880${values.phoneNumber}`;

    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      setFieldError("phone", "* Invalid phone number");
      return;
    }

    const res = await createContactSupport(values);
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }

    resetForm();
    toast.success("Message sent successfully!", { description: "We will get back to you soon." });
  };

  return (
    <div className="rounded-md border border-border-main bg-white p-[18px] md:p-[32px]">
      <h2 className="mb-[16px] text-[20px] font-bold text-primary md:mb-[24px] md:text-[30px]">
        Send us a Message
      </h2>

      <Formik
        initialValues={{
          ...initialValues,
          fullName: user?.fullName || "",
          email: user?.email || "",
          phoneNumber: phoneNumber || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ touched, errors }) => (
          <Form className="space-y-[16px] md:space-y-[24px]">
            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">
              {/* Full Name */}
              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Full Name *</label>
                <Field name="fullName" as={Input} placeholder="Enter your full name" />
                <ErrorMessage
                  name="fullName"
                  component="span"
                  className="text-[12px] text-danger"
                />
              </div>

              {/* Email */}
              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Email *</label>
                <Field name="email" as={Input} placeholder="Enter your email" />
                <ErrorMessage name="email" component="span" className="text-[12px] text-danger" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">
              {/* Phone Number */}
              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Phone No.</label>
                <div className="flex items-center justify-start gap-0">
                  <span className="border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
                    {dialCode}
                  </span>

                  <Field
                    name="phone"
                    as={Input}
                    type="string"
                    placeholder="Enter Your Mobile Number"
                  />
                </div>
                {touched.phoneNumber && errors.phoneNumber && (
                  <span className="text-[12px] text-danger">{errors.phoneNumber}</span>
                )}
              </div>

              {/* subject */}
              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Subject *</label>
                <Field name="subject" as={Input} placeholder="Enter a Subject" />
                <ErrorMessage name="subject" component="span" className="text-[12px] text-danger" />
              </div>
            </div>

            {/* Message */}
            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Message *</label>
              <Field
                name="message"
                as={TextArea}
                rows={6}
                placeholder="Tell us how we can help you..."
              />
              <ErrorMessage name="message" component="span" className="text-[12px] text-danger" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="h-[20px] w-[20px] animate-spin rounded-full border-b-2 border-white"></span>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <FiSend className="h-[20px] w-[20px]" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
