"use client";

import DialogProvider from "@/components/ui/DialogProvider";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { useUpdateComplaintSuggestionByIdMutation } from "@/redux/features/order/order.api";
import { IComplaint } from "@/types/complaint";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useMemo, useState } from "react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { toast } from "sonner";
import * as Yup from "yup";

type Props = {
  complaint: IComplaint;
  buttonLabel?: string;
};

const statusOptions: IComplaint["status"][] = [
  "pending",
  "in-progress",
  "resolved",
  "implemented",
  "refused",
  "closed",
];

const doneStatuses: IComplaint["status"][] = ["resolved", "implemented", "closed"];

const Pill = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

const labelColorByPriority = (p?: string) => {
  switch ((p || "").toLowerCase()) {
    case "urgent":
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-amber-100 text-amber-700";
    case "low":
    default:
      return "bg-emerald-100 text-emerald-700";
  }
};

const labelColorByStatus = (s: IComplaint["status"]) => {
  switch (s) {
    case "pending":
      return "bg-gray-100 text-gray-700";
    case "in-progress":
      return "bg-blue-100 text-blue-700";
    case "resolved":
      return "bg-emerald-100 text-emerald-700";
    case "implemented":
      return "bg-indigo-100 text-indigo-700";
    case "refused":
      return "bg-rose-100 text-rose-700";
    case "closed":
      return "bg-slate-200 text-slate-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const fmtDate = (d?: string) => (d ? new Date(d).toLocaleString() : "—");
const toDateInput = (d?: string) => (d ? new Date(d).toISOString().slice(0, 10) : "");

const Schema = Yup.object({
  status: Yup.mixed<IComplaint["status"]>().oneOf(statusOptions).required("Status is required"),
  resolutionDate: Yup.string()
    .nullable()
    .test("is-date", "Invalid date", (v) => !v || !Number.isNaN(Date.parse(v)))
    .when("status", (status, schema) =>
      doneStatuses.includes(status as unknown as IComplaint["status"])
        ? schema.required("Resolution date is required for this status")
        : schema
    ),
  actionTaken: Yup.string().max(2000, "Keep it under 2000 characters").nullable(),
});

const TakeActionOnComplainSuggestion = ({ complaint }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [updateComplaint, { isLoading }] = useUpdateComplaintSuggestionByIdMutation();

  const satisfactionBadge = useMemo(() => {
    const value = Math.max(1, Math.min(5, Number(complaint.satisfaction || 0)));
    return `${value}/5`;
  }, [complaint.satisfaction]);

  const handleOpen = () => {
    setApiError(null);
    setIsOpen(true);
  };
  const handleCancel = () => {
    if (!isLoading) setIsOpen(false);
  };

  const handleSubmit = async (
    values: Pick<IComplaint, "status" | "resolutionDate" | "actionTaken">,
    helper: FormikHelpers<Pick<IComplaint, "status" | "resolutionDate" | "actionTaken">>
  ) => {
    setApiError(null);

    const isClosed = doneStatuses.includes(values.status);
    if (isClosed && !values.resolutionDate) {
      helper.setFieldError("resolutionDate", "Resolution date is required for this status");
      return;
    }

    if (isClosed && !values.actionTaken?.trim()) {
      helper.setFieldError("actionTaken", "Action taken is required for this status");
      return;
    }

    const payload: Partial<IComplaint> = {
      status: values.status,
      ...(values.resolutionDate ? { resolutionDate: values.resolutionDate } : {}),
      ...(values.actionTaken?.trim() ? { actionTaken: values.actionTaken.trim() } : {}),
    };

    await updateComplaint({ id: complaint._id, payload }).unwrap();
    toast.success("Complaint updated successfully");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="center aspect-square w-[35px] cursor-pointer rounded-full border-[1px] border-border-main text-lg"
        aria-label={"Take action on complaint " + complaint._id}
      >
        <MdOutlineSupportAgent />
      </button>

      <DialogProvider state={isOpen} setState={setIsOpen} className="w-full max-w-[720px]">
        <div className="w-full rounded-xl bg-white p-5 shadow">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Take Action on Complaint</h3>
              <p className="text-sm text-gray-500">
                Order <span className="font-medium">#{complaint.orderId}</span> • Created:{" "}
                {fmtDate(complaint.createdAt)}
              </p>
            </div>
            <div className="flex gap-2">
              <Pill className={labelColorByStatus(complaint.status)}>{complaint.status}</Pill>
              <Pill className={labelColorByPriority(complaint.priority)}>
                Priority: {complaint.priority || "—"}
              </Pill>
              <Pill className="bg-purple-100 text-purple-700">
                Satisfaction: {satisfactionBadge}
              </Pill>
            </div>
          </div>

          {/* Details */}
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border-main p-3">
              <dl className="grid grid-cols-3 gap-2 text-sm">
                <dt className="col-span-1 text-gray-500">Customer</dt>
                <dd className="col-span-2 font-medium text-gray-900">{complaint.customerName}</dd>
                <dt className="col-span-1 text-gray-500">Feedback Type</dt>
                <dd className="col-span-2 text-gray-900">{complaint.feedbackType}</dd>
                <dt className="col-span-1 text-gray-500">C &amp; S Category</dt>
                <dd className="col-span-2 text-gray-900">{complaint.csCategory}</dd>
                <dt className="col-span-1 text-gray-500">Updated</dt>
                <dd className="col-span-2 text-gray-900">{fmtDate(complaint.updatedAt)}</dd>
                <dt className="col-span-1 text-gray-500">Resolution Date</dt>
                <dd className="col-span-2 text-gray-900">
                  {complaint.resolutionDate ? fmtDate(complaint.resolutionDate) : "—"}
                </dd>
              </dl>
            </div>

            <div className="rounded-lg border border-border-main p-3">
              <div className="mb-1 text-sm text-gray-500">Customer Message</div>
              <span className="mt-2 block rounded-md border border-border-main bg-gray-50 p-3 text-sm text-gray-900">
                {complaint.message}
              </span>
            </div>
          </div>

          {/* Formik */}
          <Formik
            enableReinitialize
            initialValues={{
              status: complaint.status,
              resolutionDate: toDateInput(complaint.resolutionDate),
              actionTaken: complaint.actionTaken || "",
            }}
            validationSchema={Schema}
            // @ts-expect-error: ok for now 👍
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Status */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="status" className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-md border border-border-main px-3 py-2 text-sm"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  {touched.status && errors.status ? (
                    <span className="text-xs text-red-600">{errors.status}</span>
                  ) : (
                    <p className="text-xs text-gray-500">Choose the current handling stage.</p>
                  )}
                </div>

                {/* Resolution Date (conditional required) */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="resolutionDate" className="text-sm font-medium text-gray-700">
                    Resolution Date
                  </label>
                  <Field type="date" className="rounded-md" name="resolutionDate" as={Input} />
                  {touched.resolutionDate && errors.resolutionDate ? (
                    <span className="text-xs text-red-600">{errors.resolutionDate as string}</span>
                  ) : (
                    <p className="text-xs text-gray-500">
                      {doneStatuses.includes(values.status)
                        ? "Required for Resolved / Implemented / Closed."
                        : "Optional. You can leave this empty."}
                    </p>
                  )}
                </div>

                {/* Action Taken (always optional) */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="actionTaken" className="text-sm font-medium text-gray-700">
                    Action Taken (Details)
                  </label>
                  <Field
                    id="actionTaken"
                    name="actionTaken"
                    rows={4}
                    placeholder="Calls, refunds, replacements, follow-ups, notes (optional)"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    as={TextArea}
                  />
                  {touched.actionTaken && errors.actionTaken ? (
                    <span className="text-xs text-red-600">{errors.actionTaken as string}</span>
                  ) : (
                    <p className="text-xs text-gray-500">Optional. Add notes if you have any.</p>
                  )}
                </div>

                {/* API error */}
                {apiError && (
                  <div className="rounded-md bg-red-50 p-2 text-sm text-red-700 md:col-span-2">
                    {apiError}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-2 flex items-center justify-end gap-2 md:col-span-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading || isSubmitting}
                    className="cursor-pointer rounded-md border border-border-main px-3 py-1.5 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="cursor-pointer rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading || isSubmitting ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogProvider>
    </>
  );
};

export default TakeActionOnComplainSuggestion;
