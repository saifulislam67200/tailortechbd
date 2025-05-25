"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";

// Initial form values
const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("* Full name is required"),
  email: Yup.string().email("Invalid email").required("* Email is required"),
  subject: Yup.string().required("* Subject is required"),
  message: Yup.string().required("* Message is required"),
});

export default function ContactForm() {
  const { user } = useAppSelector((state) => state.user);
  const splitDialCode = () => {
    let phoneNumber = user?.phoneNumber || "";
    const dialCode = user?.geo_profile?.phone_code || "+880";
    phoneNumber = phoneNumber.replace(dialCode, "");
    return { dialCode, phoneNumber };
  };
  const { dialCode } = splitDialCode();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    setIsSubmitting(true);

    try {
      //  API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", values);
      resetForm();
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-md border border-border-main bg-white p-[18px] md:p-[32px]">
      <h2 className="mb-[16px] text-[20px] font-bold text-primary md:mb-[24px] md:text-[30px]">
        Send us a Message
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting: formikSubmitting }) => (
          <Form className="space-y-[16px] md:space-y-[24px]">
            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">
              {/* Full Name */}
              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Full Name *</label>
                <Field name="fullName" as={Input} placeholder="Enter your full name" />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-[12px] text-red-500"
                />
              </div>

              {/* Email */}
              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Email *</label>
                <Field name="email" as={Input} placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="text-[12px] text-red-500" />
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
                  <Input type="string" name="phoneNumber" placeholder="Enter Your Mobile Number" />
                </div>
              </div>

              {/* subject */}
              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Subject *</label>
                <Field name="subject" as={Input} placeholder="Enter a Subject" />
                <ErrorMessage name="subject" component="div" className="text-[12px] text-red-500" />
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
              <ErrorMessage name="message" component="div" className="text-[12px] text-red-500" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || formikSubmitting}
              className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting || formikSubmitting ? (
                <>
                  <div className="h-[20px] w-[20px] animate-spin rounded-full border-b-2 border-white"></div>
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
