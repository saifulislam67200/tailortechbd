"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useCreateBannerMutation } from "@/redux/features/banner/banner.api";
import ImageUploader from "@/components/Dashboard/Product/ImageUploader";
import { LuX } from "react-icons/lu";
import { useState } from "react";
import { toast } from "sonner";

const validationSchema = Yup.object({
  name: Yup.string().required("Banner name is required"),
  images: Yup.array()
    .min(1, "Banner image is required")
    .max(1, "Only one banner image is allowed")
    .required("Banner image is required"),
});

const initialValues = {
  name: "",
  images: [],
};

const AddBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createBanner, { isLoading }] = useCreateBannerMutation();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const bannerPayload = {
        name: values.name,
        thumbnail: values.images[0],
        hyperLink: "#",
        index: 0,
        active: true,
      };

      await createBanner(bannerPayload).unwrap();
      toast.success("Banner created successfully!");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create banner.");
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-[16px] py-[8px] text-[14px] font-medium transition-colors hover:bg-primary/90"
      >
        Create New Banner
      </Button>

      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="w-[95%] max-w-[700px] md:w-full"
      >
        <div className="w-full bg-white p-[16px]">
          {/* Modal Header */}
          <div className="flex items-center justify-between">
            <h5 className="text-[18px] font-[700] text-strong md:text-[20px]">Create New Banner</h5>
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              <LuX />
            </button>
          </div>
          <HorizontalLine className="my-[10px] md:my-[20px]" />

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6 px-[24px] pb-[24px]">
                {/* Banner Name */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    Banner Name *
                  </label>
                  <Field
                    name="name"
                    as={Input}
                    placeholder="Enter banner name"
                    className="px-3 py-2 transition-colors"
                  />
                  <ErrorMessage name="name" component="div" className="text-[12px] text-red-500" />
                </div>

                {/* Image Upload */}
                <div>
                  <ImageUploader
                    inputId="banner-image-upload"
                    labelStyle="!h-[120px] !rounded-[5px]"
                    defaultImages={values.images}
                    onChange={(urls) => setFieldValue("images", urls || [])}
                  >
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                      Banner Image *
                    </label>
                  </ImageUploader>
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-[12px] text-red-500"
                  />
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="border border-gray-300 bg-transparent text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Banner"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogProvider>
    </>
  );
};

export default AddBanner;
