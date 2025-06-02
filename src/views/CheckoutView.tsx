"use client";
import CheckoutPaymentOptions from "@/components/Checkout/CheckoutPaymentOptions";
import CheeckoutOverview, { IAppliedCouponResponse } from "@/components/Checkout/CheeckoutOverview";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import Button from "@/components/ui/Button";
import FormMessage, { IFormMessage } from "@/components/ui/FormMessage";
import Input from "@/components/ui/Input";
import SelectionBox from "@/components/ui/SelectionBox";
import TextArea from "@/components/ui/TextArea";
import { useAppSelector } from "@/hooks/redux";
import { clearCart } from "@/redux/features/cart/cartSlice";
import {
  useGetDistrictsQuery,
  useGetDivisionsQuery,
  useGetUpozilasQuery,
} from "@/redux/features/geoLocation/geoLocation.api";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IOrder, IShippingAddress } from "@/types/order";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string().required("phone number is required"),
  address: Yup.string().required("Please Enter a describe delvery address"),
  division: Yup.string().required("Division is required"),
  district: Yup.string().required("District is required"),
  upazila: Yup.string().required("Upazila is required"),
  // billing address (optional)
  billing_name: Yup.string().optional(),
  billing_address: Yup.string().optional(),
  billing_phoneNumber: Yup.string().optional(),
});
const CheckoutView = () => {
  const router = useRouter();
  // this state is lift up from Checkout Overview component
  const [successfulCouponResponse, setSuccessfulCouponResponse] =
    useState<IAppliedCouponResponse | null>(null);

  const [creaeOrder, { isLoading }] = useCreateOrderMutation();
  const { items } = useAppSelector((state) => state.checkout);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formMessage, setFormMessage] = useState<IFormMessage | null>(null);
  const [isSameBillingAddress, setIsSameBillingAddress] = useState(true);

  const [locationId, setLocationId] = useState({
    division_id: "",
    district_id: "",
  });
  const { data: divisions } = useGetDivisionsQuery(undefined);
  const { data: districts } = useGetDistrictsQuery(locationId.division_id, {
    skip: !locationId.division_id,
  });
  const { data: upazila } = useGetUpozilasQuery(locationId.district_id, {
    skip: !locationId.district_id,
  });

  const myOrderItems = items?.map((item) => ({
    ...item,
    product_id: item?.product_id.split("-")[0],
  }));

  const initialValues: IShippingAddress & {
    billing_address: string;
    billing_phoneNumber: string;
    billing_name: string;
  } = {
    address: "",
    district: "",
    division: "",
    name: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    upazila: "",
    billing_name: "",
    billing_address: "",
    billing_phoneNumber: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setFormMessage(null);
    if (
      !isSameBillingAddress &&
      (!values.billing_address || !values.billing_phoneNumber || !values.billing_name)
    ) {
      setFormMessage({
        message: "Please fill up all billing information if you are'nt using same address",
        type: "error",
      });
      return;
    }
    const payload: Omit<
      IOrder,
      "status" | "paymentStatus" | "totalProductAmount" | "user" | "_id"
    > = {
      ...values,
      billingAddress: !isSameBillingAddress
        ? {
            address: values.billing_address,
            phoneNumber: values.billing_phoneNumber,
            name: values.billing_name,
          }
        : undefined,

      shippingAddress: {
        address: values.address,
        district: values.district,
        division: values.division,
        name: values.name,
        phoneNumber: values.phoneNumber,
        upazila: values.upazila,
      },

      orderItems: myOrderItems,
      deliveryFee: 60,
      coupon: successfulCouponResponse?.appliedCoupon || "",
    };

    const res = await creaeOrder(payload);
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        setFormMessage({ message: error.data.message, type: "error" });
      } else {
        setFormMessage({ message: "Something went wrong", type: "error" });
      }
      return;
    }
    dispatch(clearCart());
    const isInsideDhaka = values?.district?.toLowerCase() === "dhaka";
    router.replace(`/order/success?o_id=${res.data?.data._id}?ind=${isInsideDhaka ? 1 : 0}`);
  };

  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ setFieldValue, touched, errors, setFieldTouched, values, isValid }) => {
          return (
            <Form className="flex w-full flex-col items-start justify-start gap-[16px] md:flex-row">
              <div className="w-full bg-white pt-[8px] pb-[22px]">
                <div className="w-full px-[5px] pb-[8px]">
                  <div className="w-full bg-tertiary px-[16px] py-[8px]">
                    <span className="text-[16px] font-[700]">1. Delivery Information</span>
                  </div>
                </div>

                <div className="flex flex-col gap-[16px] px-[16px] pt-[8px]">
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] font-[700] text-strong" htmlFor="name">
                      Division *
                    </label>
                    <div className="flex flex-col gap-[5px]">
                      <SelectionBox
                        data={divisions?.map((d) => ({ label: d.name, value: d.id })) || []}
                        onSelect={(e) => {
                          setFieldValue("division", e.label);
                          setFieldValue("district", "");
                          setFieldValue("upazila", "");
                          setLocationId({ division_id: e.value, district_id: "" });
                          setFieldTouched("division", true);
                        }}
                      />
                      {touched.division && errors.division && !values.division && (
                        <span className="text-[12px] text-danger">{errors.division}</span>
                      )}
                    </div>
                  </div>
                  {locationId.division_id ? (
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[14px] font-[700] text-strong" htmlFor="name">
                        District *
                      </label>
                      <div className="flex flex-col gap-[5px]">
                        <SelectionBox
                          displayValue={values.district}
                          data={districts?.map((d) => ({ label: d.name, value: d.id })) || []}
                          onSelect={(e) => {
                            setFieldTouched("district", true);
                            setFieldValue("district", e.label);
                            setFieldValue("upazila", "");
                            setLocationId({ ...locationId, district_id: e.value });
                          }}
                        />
                        {touched.district && errors.district && !values.district && (
                          <span className="text-[12px] text-danger">{errors.district}</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {locationId.district_id ? (
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[14px] font-[700] text-strong" htmlFor="name">
                        Upazila/city *
                      </label>
                      <div className="flex flex-col gap-[5px]">
                        <SelectionBox
                          displayValue={values.upazila}
                          data={upazila?.map((d) => ({ label: d.name, value: d.id })) || []}
                          onSelect={(e) => {
                            setFieldTouched("upazila", true);
                            setFieldValue("upazila", e.label);
                          }}
                        />
                        {touched.upazila && errors.upazila && (
                          <span className="text-[12px] text-danger">{errors.upazila}</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] font-[700] text-strong" htmlFor="name">
                      Name *
                    </label>
                    <div className="flex flex-col gap-[5px]">
                      <Field placeholder="Full name" as={Input} name="name" id="name" />
                      {touched.name && errors.name && (
                        <span className="text-[12px] text-danger">{errors.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[14px] font-[700] text-strong" htmlFor="phoneNumber">
                        Phone Number
                      </label>
                      <span className="text-[12px] text-muted">
                        The person who will receive the order
                      </span>
                      <div className="flex flex-col gap-[5px]">
                        <PhoneInput
                          defaultCountry="BD"
                          value={values.phoneNumber}
                          international
                          countryCallingCodeEditable={false}
                          placeholder="Enter your phone number"
                          onChange={(value) => {
                            setFieldValue("phoneNumber", value);
                            setFieldTouched("phoneNumber", true);
                          }}
                          className={`rounded-[5px] border-[1px] border-border-muted bg-white px-3 py-[12px] text-sm`}
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                          <span className="text-[12px] text-danger">{errors.phoneNumber}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] font-[700] text-strong" htmlFor="address">
                      Address *
                    </label>
                    <div className="flex flex-col gap-[5px]">
                      <Field
                        placeholder="Road #, House #, Area Name etc."
                        as={TextArea}
                        name="address"
                        id="address"
                      />
                      {touched.address && errors.address && (
                        <span className="text-[12px] text-danger">{errors.address}</span>
                      )}
                    </div>
                  </div>

                  <label
                    htmlFor="same_billing"
                    className="item-center flex cursor-pointer gap-[5px] select-none"
                  >
                    <input
                      type="checkbox"
                      id="same_billing"
                      onChange={(e) => setIsSameBillingAddress(!e.target.checked)}
                    />
                    if the billing address is different
                  </label>

                  {!isSameBillingAddress ? (
                    <>
                      <div className="flex flex-col gap-[8px]">
                        <label
                          className="text-[14px] font-[700] text-strong"
                          htmlFor="billing_name"
                        >
                          Billing Name
                        </label>
                        <div className="flex flex-col gap-[5px]">
                          <Field
                            placeholder="Full name"
                            as={Input}
                            name="billing_name"
                            id="billing_name"
                          />
                          {touched.billing_name && errors.billing_name && (
                            <span className="text-[12px] text-danger">{errors.billing_name}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-[8px]">
                        <label
                          className="text-[14px] font-[700] text-strong"
                          htmlFor="billing_phoneNumber"
                        >
                          Billing Contact Number
                        </label>
                        <div className="flex flex-col gap-[5px]">
                          <PhoneInput
                            defaultCountry="BD"
                            value={values.billing_phoneNumber}
                            international
                            countryCallingCodeEditable={false}
                            placeholder="Enter billing phone number"
                            onChange={(value) => {
                              setFieldValue("billing_phoneNumber", value);
                              setFieldTouched("billing_phoneNumber", true);
                            }}
                            className={`rounded-[5px] border-[1px] border-border-muted bg-white px-3 py-[12px] text-sm`}
                          />
                          {touched.billing_phoneNumber && errors.billing_phoneNumber && (
                            <span className="text-[12px] text-danger">
                              {errors.billing_phoneNumber}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-[8px]">
                        <label
                          className="text-[14px] font-[700] text-strong"
                          htmlFor="billing_address"
                        >
                          Billing Address *
                        </label>
                        <div className="flex flex-col gap-[5px]">
                          <Field
                            placeholder="Road #, House #, Area Name etc."
                            as={TextArea}
                            name="billing_address"
                            id="billing_address"
                          />
                          {touched.billing_address && errors.billing_address && (
                            <span className="text-[12px] text-danger">
                              {errors.billing_address}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col gap-[16px]">
                <CheckoutPaymentOptions />
                <CheeckoutOverview
                  district={values.district || ""}
                  successfulCouponResponse={successfulCouponResponse}
                  setSuccessfulCouponResponse={setSuccessfulCouponResponse}
                />
                {formMessage ? <FormMessage formMessage={formMessage} /> : ""}
                {isValid ? (
                  ""
                ) : (
                  <span className="font-[600] text-danger">
                    * please fill all the required fields
                  </span>
                )}
                <div className="item-center flex w-full justify-center gap-[16px]">
                  <Button
                    type="button"
                    onClick={() => {
                      router.back();
                    }}
                    className="w-full rounded-[0px] bg-primary-foreground"
                  >
                    Back
                  </Button>
                  <Button
                    className="w-full rounded-[0px]"
                    type="submit"
                    disabled={!isValid || isLoading}
                  >
                    Confirm Order
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CheckoutView;
