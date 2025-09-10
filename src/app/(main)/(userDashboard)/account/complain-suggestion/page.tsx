"use client";

import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { useAppSelector } from "@/hooks/redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FiSend } from "react-icons/fi";
import * as Yup from "yup";
import { useMemo, useState } from "react";

// dropdown options
const FEEDBACK_TYPES = ["Complaint", "Suggestion", "Both", "Other"];
const CS_CATEGORIES = [
  "Delivery & Packing",
  "Product Quality",
  "Website Usability",
  "Customer service",
  "Price & Discount",
  "Return & Refund",
  "New Product Request",
  "Color",
  "Print/Embroidery",
  "Product Design",
  "Others",
];
const PRIORITIES = ["Low", "Medium", "High", "Urgent"];

type Complaint = {
  id: string;
  timestamp: string;
  customerName: string;
  orderId: string;
  feedbackType: string;
  csCategory: string;
  priority: string;
  satisfaction: number;
  status: "Pending" | "In Progress" | "Resolved" | "Implemented" | "Refused" | "Closed";
  actionTaken: string;
};

type FormValues = {
  customerName: string;
  orderId: string;
  feedbackType: string;
  csCategory: string;
  priority: string;
  satisfaction: string; // form select gives strings; we'll cast to number on submit
  actionTaken: string;
};

const validationSchema = Yup.object({
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
  actionTaken: Yup.string().required("* Action taken is required"),
});

export default function Page() {
  const { user } = useAppSelector((state) => state.user);

  // Toggle view: "table" or "form"
  const [view, setView] = useState<"table" | "form">("table");
  // Collected complaints (local state for now)
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  // Initial form values (reinit if user changes)
  const initialValues: FormValues = useMemo(
    () => ({
      customerName: user?.fullName || "",
      orderId: "",
      feedbackType: "",
      csCategory: "",
      priority: "",
      satisfaction: "",
      actionTaken: "",
    }),
    [user?.fullName]
  );

  return (
    <div className="rounded-md border border-border-main bg-white p-[18px] md:p-[32px]">
      <h2 className="text-[20px] mb-[15px] font-bold text-primary md:mb-[24px] md:text-[30px]">
        Complain & Suggestion Box
      </h2>

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-strong">Complaint List</h3>
            <button
              onClick={() => setView("form")}
              className="rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:opacity-90"
            >
              Complain
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse">
              <thead>
                <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left bg-solid-slab text-strong">
                  {/* <th>Timestamp</th>
                  <th>Customer Name</th> */}
                  <th>Order ID</th>
                  <th>Feedback Type</th>
                  <th>C &amp; S-Category</th>
                  <th>Priority</th>
                  <th>Satisfaction</th>
                  <th>Status</th>
                  <th>Action Taken (Details)</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-3 py-6 text-center text-muted">
                      No complaints yet. Click <span className="font-semibold">Complain</span> to add one.
                    </td>
                  </tr>
                ) : (
                  complaints.map((c) => (
                    <tr key={c.id} className="border-t border-border-main align-top">
                      {/* <td className="px-3 py-2">{c.timestamp}</td>
                      <td className="px-3 py-2">{c.customerName}</td> */}
                      <td className="px-3 py-2">{c.orderId}</td>
                      <td className="px-3 py-2">{c.feedbackType}</td>
                      <td className="px-3 py-2">{c.csCategory}</td>
                      <td className="px-3 py-2">{c.priority}</td>
                      <td className="px-3 py-2">{c.satisfaction}</td>
                      <td className="px-3 py-2">{c.status}</td>
                      <td className="px-3 py-2 max-w-[360px]">
                        <div className="whitespace-pre-wrap">{c.actionTaken}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FORM VIEW */}
      {view === "form" && (
        <Formik<FormValues>
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const now = new Date();
            const complaint: Complaint = {
              id: `${now.getTime()}`,
              timestamp: now.toLocaleString(),
              customerName: values.customerName,
              orderId: values.orderId,
              feedbackType: values.feedbackType,
              csCategory: values.csCategory,
              priority: values.priority,
              satisfaction: Number(values.satisfaction),
              status: "Pending",
              actionTaken: values.actionTaken,
            };
            setComplaints((prev) => [complaint, ...prev]);
            resetForm();
            setView("table"); // submit -> show table
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-[16px] md:space-y-[24px]">
              {/* Row 1: Customer Name, Order ID */}
              <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">
                <div className="flex w-full flex-col gap-[6px]">
                  <label className="text-[12px] text-strong">Customer Name *</label>
                  <Field
                    name="customerName"
                    as={Input}
                    placeholder="Enter customer name"
                    className="rounded-md border border-border-main bg-white px-3 text-[14px] outline-none"
                  />
                  <ErrorMessage name="customerName" component="span" className="text-[12px] text-danger" />
                </div>

                <div className="flex w-full flex-col gap-[6px]">
                  <label className="text-[12px] text-strong">Order ID *</label>
                  <Field
                    name="orderId"
                    as={Input}
                    placeholder="Enter order ID"
                    className="rounded-md border border-border-main bg-white px-3 text-[14px] outline-none"
                  />
                  <ErrorMessage name="orderId" component="span" className="text-[12px] text-danger" />
                </div>
              </div>

              {/* Row 2: Category, Feedback Type */}
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

              {/* Row 3: Priority, Satisfaction */}
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

              {/* Row 4: Action Taken */}
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

              {/* Submit */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90"
                >
                  <FiSend className="h-[20px] w-[20px]" />
                  <span>Submit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setView("table")}
                  className="w-full rounded-lg border border-border-main px-6 py-3 font-semibold text-strong hover:bg-solid-slab"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
