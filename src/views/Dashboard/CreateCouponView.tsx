"use client";

import { Formik, Form, Field, FieldArray, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { FiTag, FiPercent, FiDollarSign, FiChevronDown, FiPlus, FiX } from "react-icons/fi";
import { useCreateCouponMutation } from "@/redux/features/coupon/coupon.api";
import { IQueruMutationErrorResponse } from "@/types";
import { toast } from "sonner";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllClientsQuery } from "@/redux/features/admin/admin.api";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Coupon code is required")
    .matches(/^[A-Z0-9]+$/, "Coupon code must be uppercase alphanumeric")
    .min(4, "Minimum 4 characters")
    .max(20, "Maximum 20 characters"),
  discount: Yup.number()
    .required("Discount is required")
    .positive("Must be positive")
    .when("discountType", {
      is: "percentage",
      then: (schema) => schema.max(100, "Cannot exceed 100%"),
    }),
  discountType: Yup.string().oneOf(["percentage", "amount"]).required("Type is required"),
  minOrderValue: Yup.number().min(0, "Cannot be negative").required("Required"),
  expiresAt: Yup.date().required("Required").min(new Date(), "Must be in the future"),
  assignedTo: Yup.array().when("couponType", {
    is: "personal",
    then: (schema) =>
      schema
        .of(
          Yup.object().shape({
            id: Yup.string().required(),
            email: Yup.string().email("Invalid email").required(),
          })
        )
        .min(1, "At least one user required"),
  }),
});

const initialValues = {
  code: "",
  discount: 0,
  discountType: "percentage",
  isActive: true,
  assignedTo: [],
  minOrderValue: 0,
  expiresAt: "",
  couponType: "public",
};

export interface ICoupon {
  code: string;
  discount: number;
  discountType: string;
  assignedTo: string[];
  minOrderValue: number;
  expiresAt: string;
  isActive: boolean;
  couponType: string;
}

type TUser = {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  phone_code?: string;
  role: "admin" | "user" | string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;

  geo_profile: {
    country: string;
    phone_code: string;
  };
};

const CreateCouponView = () => {
  const [showDiscountDropdown, setShowDiscountDropdown] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const [searchTerm, setSearchTerm] = useDebounce("");

  const { data } = useGetAllClientsQuery({ searchTerm });

  useEffect(() => {
    setSearchTerm(newUser);
  }, [newUser, setSearchTerm]);

  const users = data?.data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateCode = (setFieldValue: any) => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setFieldValue("code", code);
  };

  const handleCreateCoupon = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const payload = {
      assignedTo: values.assignedTo.map((user: { email: string; id: string }) => user.id),
      code: values.code,
      discount: values.discount,
      discountType: values.discountType,
      isActive: values.isActive,
      minOrderValue: values.minOrderValue,
      expiresAt: values.expiresAt ? new Date(values.expiresAt).toISOString() : "",
    };

    const res = await createCoupon(payload);
    const error = res.error as IQueruMutationErrorResponse;

    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    toast.success("Coupon created successfully");
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleCreateCoupon}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-6 bg-white p-[16px]">
            <div className="flex items-center gap-3 bg-primary/10 p-4">
              <FiTag className="text-primary" />
              <div>
                <h3 className="text-lg font-semibold text-primary">Create Coupon</h3>
                <p className="text-sm text-primary">Create coupon to give discount</p>
              </div>
            </div>

            {/* Coupon Code */}
            <div>
              <label htmlFor="code" className="text-sm font-medium text-info">
                Coupon Code
              </label>
              <div className="mt-1 flex gap-2">
                <Field
                  name="code"
                  id="code"
                  className={`flex-1 border px-3 py-2 ${
                    touched.code && errors.code ? "border-red-500" : "border-quaternary"
                  }`}
                  placeholder="Enter coupon code"
                />
                <button
                  type="button"
                  onClick={() => generateCode(setFieldValue)}
                  className="border border-quaternary px-4 py-2 text-sm"
                >
                  Generate
                </button>
              </div>
              <ErrorMessage name="code" component="div" className="text-sm text-red-600" />
            </div>

            {/* Discount + Type */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="discount" className="text-sm font-medium text-info">
                  Discount Value
                </label>
                <Field
                  type="number"
                  name="discount"
                  className={`w-full border px-3 py-2 ${
                    touched.discount && errors.discount ? "border-red-500" : "border-quaternary"
                  }`}
                />
                <ErrorMessage name="discount" component="div" className="text-sm text-red-600" />
              </div>

              <div>
                <label className="text-sm font-medium text-info">Discount Type</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDiscountDropdown(!showDiscountDropdown)}
                    className="flex w-full items-center justify-between border border-quaternary px-3 py-2"
                  >
                    {values.discountType === "percentage" ? (
                      <>
                        <FiPercent /> Percentage
                      </>
                    ) : (
                      <>
                        <FiDollarSign /> Fixed Amount
                      </>
                    )}
                    <FiChevronDown />
                  </button>
                  {showDiscountDropdown && (
                    <div className="absolute z-10 mt-1 w-full border border-quaternary bg-white">
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("discountType", "percentage");
                          setShowDiscountDropdown(false);
                        }}
                        className="flex w-full gap-2 px-3 py-2 hover:bg-gray-100"
                      >
                        <FiPercent /> Percentage
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("discountType", "amount");
                          setShowDiscountDropdown(false);
                        }}
                        className="flex w-full gap-2 px-3 py-2 hover:bg-gray-100"
                      >
                        <FiDollarSign /> Fixed Amount
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Minimum Order */}
            <div>
              <label htmlFor="minOrderValue" className="text-sm font-medium text-info">
                Minimum Order Value
              </label>
              <Field
                type="number"
                name="minOrderValue"
                className={`w-full border px-3 py-2 ${
                  touched.minOrderValue && errors.minOrderValue
                    ? "border-red-500"
                    : "border-quaternary"
                }`}
              />
              <ErrorMessage name="minOrderValue" component="div" className="text-sm text-red-600" />
            </div>

            {/* Coupon Type */}
            <div>
              <label htmlFor="couponType" className="text-sm font-medium text-info">
                Coupon Type
              </label>
              <Field
                as="select"
                name="couponType"
                className="w-full border border-quaternary px-3 py-2"
              >
                <option value="public">Public</option>
                <option value="personal">Personal</option>
              </Field>
              <ErrorMessage name="couponType" component="div" className="text-sm text-red-600" />
            </div>

            {/* Assigned Users if Personal */}
            {values.couponType === "personal" && (
              <FieldArray name="assignedTo">
                {({ push, remove }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-info">Assign to Users</label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                        className="flex-1 border border-quaternary px-3 py-2"
                        placeholder="Enter user email"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newUser.trim()) {
                            const user = users.find((u: TUser) => u.email === newUser.trim());
                            if (user) {
                              push({ id: user._id, email: user.email });
                              setNewUser("");
                              toast.success(`${user.email} added to coupon`);
                            } else {
                              toast.warning("User not found");
                            }
                          }
                        }}
                        className="cursor-pointer bg-primary/80 px-4 py-2 text-white hover:bg-primary"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="h-full max-h-[300px] min-h-[200px] w-full overflow-y-auto border border-quaternary bg-white">
                      {users?.map((user: TUser) => (
                        <div
                          key={user?._id}
                          className="cursor-pointer border-b border-quaternary/50 p-[16px] hover:bg-quaternary"
                          onClick={() => {
                            const isAlreadyAdded = values.assignedTo.some(
                              (u: { email: string; id: string }) => u.id === user._id
                            );
                            if (!isAlreadyAdded) {
                              push({ id: user._id, email: user.email });
                              toast.success(`${user.email} added to coupon`);
                            } else {
                              toast.warning(`${user.email} is already added`);
                            }
                          }}
                        >
                          {user?.email}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
                      {values.assignedTo.map((user: TUser, index) => (
                        <div
                          key={user?._id}
                          className="flex items-center justify-between border border-quaternary px-3 py-1"
                        >
                          <span className="text-sm">{user.email}</span>
                          <button
                            className="cursor-pointer"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <FiX className="text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <ErrorMessage
                      name="assignedTo"
                      component="div"
                      className="text-sm text-red-600"
                    />
                  </div>
                )}
              </FieldArray>
            )}

            {/* Expiration Date */}
            <div>
              <label htmlFor="expiresAt" className="text-sm font-medium text-info">
                Expiration Date
              </label>
              <Field
                type="date"
                name="expiresAt"
                className="w-full border border-quaternary px-3 py-2"
              />
              <ErrorMessage name="expiresAt" component="div" className="text-sm text-red-600" />
            </div>

            {/* Submit */}
            <div className="flex w-full justify-end">
              <button
                disabled={isLoading}
                type="submit"
                className="cursor-pointer bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                Create Coupon
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCouponView;
