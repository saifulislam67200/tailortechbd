"use client";

import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { useAppSelector } from "@/hooks/redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FiSend } from "react-icons/fi";
import * as Yup from "yup";

const FEEDBACK_TYPES = ["Complaint", "Suggestion", "Both" ,"Other"];
const CS_CATEGORIES = ["Delivery & Packing", "Product Quality", "Website Usability", "Customer service", "Price & Discount" ,"Return & Refund","New Product Request", "Color","Print/Embroidery", "Product Design", "Others"];
const PRIORITIES = ["Low", "Medium", "High", "Urgent"];
const STATUSES = ["Pending", "In Progress", "Resolved", "Implemented", "Refused", "Closed"];

const initialValues = {
  timestamp: "",
  customerName: "",
  orderId: "",
  feedbackType: "",
  csCategory: "",
  priority: "",
  satisfaction: "",
  status: "",
  actionTaken: "",
  resolutionDate: "",
};

const validationSchema = Yup.object({
  timestamp: Yup.string().required("* Timestamp is required"),
  customerName: Yup.string().required("* Customer name is required"),
  orderId: Yup.string().required("* Order ID is required"),
  feedbackType: Yup.string().required("* Feedback type is required"),
  csCategory: Yup.string().required("* Category is required"),
  priority: Yup.string().required("* Priority is required"),
  satisfaction: Yup.number()
    .typeError("Satisfaction must be 1–5")
    .min(1, "Min 1")
    .max(5, "Max 5")
    .required("* Satisfaction is required"),
  status: Yup.string().required("* Status is required"),
  actionTaken: Yup.string().required("* Action taken is required"),
  resolutionDate: Yup.string().when("status", (status, schema) =>
    status && ["Resolved", "Closed"].includes(status[0])
      ? schema.required("* Resolution date is required for resolved/closed")
      : schema
  ),
});

export default function Page() {

    const { user } = useAppSelector((state) => state.user);

const initialValues = {
  customerName: user?.fullName || "",
  orderId: "",
  feedbackType: "",
  csCategory: "",
  priority: "",
  satisfaction: "",
  status: "",
  actionTaken: "",
  resolutionDate: "",
};

  return (
    <div className="rounded-md border border-border-main bg-white p-[18px] md:p-[32px]">
      <h2 className="text-[20px] mb-[15px]  font-bold text-primary md:mb-[24px] md:text-[30px]">
        Complain & Suggestion Box
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-[16px] md:space-y-[24px]">
            {/* Row 1: Timestamp, Customer Name */}
            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">


              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Customer Name *</label>
                <Field
                  name="customerName"
                  as={Input}
                  placeholder="Enter customer name"
                  className="rounded-md border border-border-main bg-white px-3  text-[14px] outline-none"
                />
                <ErrorMessage name="customerName" component="span" className="text-[12px] text-danger" />
              </div>
                            <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Order ID *</label>
                <Field name="orderId" as={Input} placeholder="Enter order ID"
                 className="rounded-md border border-border-main bg-white px-3  text-[14px] outline-none"
             
                />
                <ErrorMessage name="orderId" component="span" className="text-[12px] text-danger" />
              </div>
            </div>

            {/* Row 2: Order ID, Feedback Type */}
            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">
       <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">C &amp; S-Category *</label>
                <Field
                  as="select"
                  name="csCategory"
                  className="w-full rounded-md border border-border-main bg-white px-3 py-2 text-[14px] outline-none"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {CS_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="csCategory" component="span" className="text-[12px] text-danger" />
              </div>

              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Feedback Type *</label>
                <Field
                  as="select"
                  name="feedbackType"
                  className="w-full rounded-md border border-border-main bg-white px-3 py-2 text-[14px] outline-none"
                >
                  <option value="" disabled>
                    Select feedback type
                  </option>
                  {FEEDBACK_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="feedbackType" component="span" className="text-[12px] text-danger" />
              </div>
            </div>

            {/* Row 3: C & S-Category, Priority */}
            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">
       

              <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Priority *</label>
                <Field
                  as="select"
                  name="priority"
                  className="w-full rounded-md border border-border-main bg-white px-3 py-2 text-[14px] outline-none"
                >
                  <option value="" disabled>
                    Select priority
                  </option>
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="priority" component="span" className="text-[12px] text-danger" />
              </div>
                       <div className="flex w-full flex-col gap-[6px]">
                <label className="text-[12px] text-strong">Satisfaction Rating (1–5) *</label>
                <Field
                  as="select"
                  name="satisfaction"
                  className="w-full rounded-md border border-border-main bg-white px-3 py-2 text-[14px] outline-none"
                >
                  <option value="" disabled>
                    Select rating
                  </option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="satisfaction" component="span" className="text-[12px] text-danger" />
              </div>
            </div>

 

            {/* Row 5: Action Taken (Details) */}
            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Action Taken (Details) *</label>
              <Field
                name="actionTaken"
                as={TextArea}
                rows={5}
                placeholder="Describe what action was taken..."
              />
              <ErrorMessage name="actionTaken" component="span" className="text-[12px] text-danger" />
            </div>

            {/* Row 6: Resolution Date */}
    

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSend className="h-[20px] w-[20px]" />
              <span>Submit</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
