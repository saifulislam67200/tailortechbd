"use client";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import Input from "@/components/ui/Input";
import SelectionBox from "@/components/ui/SelectionBox";
import TextArea from "@/components/ui/TextArea";
import { useAppSelector } from "@/hooks/redux";
import {
  useGetDistrictsQuery,
  useGetDivisionsQuery,
  useGetUpozilasQuery,
} from "@/redux/features/geoLocation/geoLocation.api";
import { IShippingAddress } from "@/types/order";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  address: Yup.string().required("Address is required"),
  division: Yup.string().required("Division is required"),
  district: Yup.string().required("District is required"),
  upazila: Yup.string().required("Upazila is required"),
});
const CheckoutView = () => {
  const { user } = useAppSelector((state) => state.user);

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

  console.log({
    locationId,
  });
  const initialValues: IShippingAddress = {
    address: "",
    district: "",
    division: "",
    name: user?.fullName || "",
    upazila: "",
  };
  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />
      <Formik onSubmit={() => {}} validationSchema={validationSchema} initialValues={initialValues}>
        {({ setFieldValue, touched, errors, setFieldTouched, values }) => (
          <Form className="flex flex-col gap-[16px]">
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
              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] font-[700] text-strong" htmlFor="address">
                  Address *
                </label>
                <div className="flex flex-col gap-[5px]">
                  <Field
                    placeholder="Road #, House # etc."
                    as={TextArea}
                    name="address"
                    id="address"
                  />
                  {touched.address && errors.address && (
                    <span className="text-[12px] text-danger">{errors.address}</span>
                  )}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutView;
