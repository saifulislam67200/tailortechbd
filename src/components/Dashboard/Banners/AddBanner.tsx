"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useCreateBannerMutation } from "@/redux/features/banner/banner.api";
import Image from "next/image";
import { FiUpload, FiX } from "react-icons/fi";
import { LuX } from "react-icons/lu";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";

const validationSchema = Yup.object({
  name: Yup.string().required("Banner name is required"),
});

const AddBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [createBanner, { isLoading }] = useCreateBannerMutation();
  const [uploadFile] = useUploadSingleFileMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (values: { name: string }) => {
    if (!file) {
      toast.error("Please upload a banner image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await uploadFile(formData).unwrap();
      const uploadedUrl = uploadRes?.data;

      const bannerPayload = {
        name: values.name,
        thumbnail: uploadedUrl,
        hyperLink: "#",
        index: 0,
        active: true,
      };

      await createBanner(bannerPayload).unwrap();
      toast.success("Banner created successfully!");
      setIsOpen(false);
      setImagePreview(null);
      setFile(null);
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

      <DialogProvider state={isOpen} setState={setIsOpen} className="w-[95%] max-w-[700px] md:w-full">
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
            initialValues={{ name: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
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
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  Banner Image *
                </label>

                {imagePreview ? (
                  <div className="relative mb-4">
                    <div className="relative h-32 w-full overflow-hidden rounded-lg border border-gray-300">
                      <Image src={imagePreview} alt="Banner preview" fill className="object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFile(null);
                      }}
                      className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-blue-400 hover:bg-blue-50/50"
                  >
                    <FiUpload className="mb-2 h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload banner image</p>
                    <p className="mt-1 text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
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
          </Formik>
        </div>
      </DialogProvider>
    </>
  );
};

export default AddBanner;
