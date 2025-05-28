"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useUpdateBannerByIdMutation } from "@/redux/features/banner/banner.api";
import Image from "next/image";
import { FiEdit2, FiUpload, FiX } from "react-icons/fi";
import { LuX } from "react-icons/lu";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { IBanner } from "@/types/banner";

const validationSchema = Yup.object({
  name: Yup.string().required("Banner name is required"),
});

const UpdateBanner = ({ banner }: { banner: IBanner }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(banner?.thumbnail || null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [updateBanner, { isLoading }] = useUpdateBannerByIdMutation();
  const [uploadFile] = useUploadSingleFileMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (values: { name: string }) => {
    try {
      let uploadedUrl = banner?.thumbnail;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await uploadFile(formData).unwrap();
        uploadedUrl = uploadRes?.data;
      }

      const bannerPayload = {
        name: values.name,
        thumbnail: uploadedUrl,
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
            <button onClick={() => setIsOpen(false)}>
              <LuX />
            </button>
          </div>

          <HorizontalLine className="my-[10px] md:my-[20px]" />

          <Formik
            initialValues={{ name: banner.name || "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form className="space-y-6 px-[24px] pb-[24px]">
              <div>
                <label className="mb-2 text-sm font-medium text-gray-700">Banner Name *</label>
                <Field name="name" as={Input} placeholder="Enter banner name" />
                <ErrorMessage name="name" component="div" className="text-[12px] text-red-500" />
              </div>

              <div>
                <label className="mb-2 text-sm font-medium text-gray-700">Banner Image *</label>

                {imagePreview ? (
                  <div className="relative mb-4">
                    <div className="relative h-32 w-full overflow-hidden rounded-lg border border-gray-300">
                      <Image
                        src={imagePreview}
                        alt="Banner preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFile(null);
                      }}
                      className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
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
          </Formik>
        </div>
      </DialogProvider>
    </>
  );
};

export default UpdateBanner;
