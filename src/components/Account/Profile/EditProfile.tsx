"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppSelector } from "@/hooks/redux";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { useUpdateProfileMutation } from "@/redux/features/user/user.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IUser, TGender } from "@/types/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string().required("* Full name is required"),
  email: Yup.string().email("Invalid email").optional(),
  gender: Yup.string().required("Gender is required as string").optional(),
});
const EditProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadSingleFileMutation();

  const [file, setFile] = useState<File | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const splitDialCode = () => {
    let phoneNumber = user?.phoneNumber || "";
    const dialCode = user?.geo_profile?.phone_code || "+880";
    phoneNumber = phoneNumber.replace(dialCode, "");
    return { dialCode, phoneNumber };
  };

  const { dialCode } = splitDialCode();

  const initialValues = {
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    gender: user?.gender || "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const payload: Partial<IUser> = {
      fullName: values.fullName,
      email: values.email || undefined,
      gender: (values.gender as TGender) || undefined,
      phoneNumber: values.phoneNumber || undefined,
    };

    if (file) {
      const form = new FormData();
      form.append("file", file);
      const uploadRes = await uploadFile(form);
      const data = uploadRes.data?.data;
      if (data) {
        payload.avatar = data;
      }
    }

    const res = await updateProfile(payload);
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }

    toast.success("Profile updated successfully");
    setFile(null);
  };

  return (
    <div className="flex w-full flex-col gap-[16px] border-0 border-border-main sm:border-[1px] p-[10px]">
      <h4 className="text-[16px] font-[700] text-strong">Account Information</h4>

      <div
        onClick={() => uploadInputRef.current?.click()}
        className="flex w-fit items-center gap-[20px]"
      >
        <div className="center group/upload relative aspect-square w-[100px] cursor-pointer overflow-hidden rounded-full border-[1px] border-border-main">
          {user?.avatar || file ? (
            <Image
              src={file ? URL.createObjectURL(file) : user?.avatar || "/images/avatar.png"}
              alt="avatar"
              width={70}
              height={70}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <FaUser className="h-[90%] w-[90%] text-strong" />
          )}
          <span className="absolute right-0 bottom-0 flex h-full w-full scale-0 items-center justify-center rounded-full bg-black/40 duration-[0.1s] group-hover/upload:scale-[1]">
            <MdOutlineFileUpload className="text-[25px] text-white" />
          </span>
        </div>
        <button
          onClick={() => uploadInputRef.current?.click()}
          className="flex cursor-pointer rounded-[2px] bg-primary-foreground px-[20px] py-[6px] text-[12px] text-white md:hidden"
        >
          Upload
        </button>
        <input
          ref={uploadInputRef}
          type="file"
          className="hidden"
          id="upload"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ dirty }) => {
          const isDirty = dirty || !!file;
          return (
            <Form>
              <div className="grid grid-cols-1 gap-[8px] sm:grid-cols-2">
                {/* Full Name */}
                <div className="flex w-full flex-col gap-[6px]">
                  <label className="text-[12px] text-strong">Full Name</label>
                  <Field name="fullName" as={Input} placeholder="Enter your full name" />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-[12px] text-red-500"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex w-full flex-col gap-[6px]">
                  <label className="text-[12px] text-strong">Phone No.</label>
                  <div className="flex items-center justify-start gap-0">
                    <span className="border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
                      {dialCode}
                    </span>
                    <Field
                      disabled={!!user?.phoneNumber}
                      type="string"
                      name="phoneNumber"
                      as={Input}
                      className={user?.phoneNumber ? "bg-solid-slab" : ""}
                      placeholder="Enter Your Mobile Number"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex w-full flex-col gap-[6px]">
                  <label className="text-[12px] text-strong">Email</label>
                  <Field
                    disabled={!!user?.email}
                    name="email"
                    as={Input}
                    placeholder="Enter your email"
                    className={user?.email ? "bg-solid-slab" : ""}
                  />
                  <ErrorMessage name="email" component="div" className="text-[12px] text-red-500" />
                </div>

                {/* Gender */}
                <div className="flex w-full flex-col gap-[6px]">
                  <label className="text-[12px] text-strong">Gender</label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full appearance-none border-[1px] border-border-main bg-white bg-clip-padding px-[12px] py-[6px] text-[12px] font-normal text-strong outline-none"
                  >
                    <option value="" hidden>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-[12px] text-red-500"
                  />
                </div>
              </div>

              {/* <FormMessage formMessage={formMessage} /> */}
              <Button
                isLoading={isLoading || isUploading}
                type="submit"
                disabled={!isDirty}
                className="mt-[16px] bg-primary-foreground"
              >
                Update Information
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProfile;
