"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useUpdateBannerByIdMutation } from "@/redux/features/banner/banner.api";
import ImageUploader from "@/components/Dashboard/Product/ImageUploader";
import { FiEdit2 } from "react-icons/fi";
import { LuX } from "react-icons/lu";
import { useState } from "react";
import { toast } from "sonner";
import type { IBanner } from "@/types/banner";

const validationSchema = Yup.object({
  name: Yup.string().required("Banner name is required"),
  images: Yup.array()
    .min(1, "Banner image is required")
    .max(1, "Only one banner image is allowed")
    .required("Banner image is required"),
});

const UpdateBanner = ({ banner }: { banner: IBanner }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateBanner, { isLoading }] = useUpdateBannerByIdMutation();

  const initialValues = {
    name: banner.name || "",
    images: banner?.thumbnail ? [banner.thumbnail] : [],
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const bannerPayload = {
        name: values.name,
        thumbnail: values.images[0],
        hyperLink: banner?.hyperLink || "#",
        index: banner?.index || 0,
      };

      await updateBanner({
        bannerId: banner._id,
        payload: bannerPayload,
      }).unwrap();

      toast.success("Banner updated successfully!");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update banner.");
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-full border border-dashboard/20 bg-dashboard/5 p-2 text-dashboard transition-colors hover:bg-blue-50 hover:text-blue-900"
        title="Edit banner"
      >
        <FiEdit2 className="h-4 w-4" />
      </Button>

      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="w-[95%] max-w-[700px] md:w-full"
      >
        <div className="w-full bg-white p-[16px]">
          <div className="flex items-center justify-between">
            <h5 className="text-[18px] font-[700] text-strong md:text-[20px]">Update Banner</h5>
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              <LuX />
            </button>
          </div>

          <HorizontalLine className="my-[10px] md:my-[20px]" />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6 px-[24px] pb-[24px]">
                {/* Banner Name */}
                <div>
                  <label className="mb-2 text-sm font-medium text-gray-700">Banner Name *</label>
                  <Field name="name" as={Input} placeholder="Enter banner name" />
                  <ErrorMessage name="name" component="div" className="text-[12px] text-red-500" />
                </div>

                {/* Image Upload */}
                <div>
                  <ImageUploader
                    inputId="update-banner-image-upload"
                    labelStyle="!h-[120px] !rounded-[5px]"
                    defaultImages={values.images}
                    onChange={(urls) => setFieldValue("images", urls || [])}
                  >
                    <label className="mb-2 text-sm font-medium text-gray-700">Banner Image *</label>
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
                    className="border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Banner"}
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

export default UpdateBanner;
