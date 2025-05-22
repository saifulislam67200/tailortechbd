"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "@/hooks/redux";
import { useCreateQuestionMutation } from "@/redux/features/Q&A/questionAndAnswer.api";
import { toast } from "sonner";
import { IQueruMutationErrorResponse } from "@/types";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  question: Yup.string().required("Question is required"),
});

const QuestionAnswerForm = ({ productId }: { productId: string }) => {
  const { user } = useAppSelector((state) => state.user);
  const [createQuestion, { isLoading }] = useCreateQuestionMutation();

  const handleSubmit = async (
    values: { name: string; question: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const payload = {
      name: values.name,
      question: values.question,
      productId,
    };
    const data = await createQuestion(payload);
    const error = data?.error as IQueruMutationErrorResponse;

    if (error) {
      if (error?.data?.message) {
        toast.error(error.data.message, { id: "error" });
      } else {
        toast("Something went wrong");
      }

      return;
    }
    resetForm();
    toast("Question submitted successfully!");
  };

  return (
    <>
      <h1 className="mt-[12px] text-[16px] font-bold text-black">Your Question</h1>
      <Formik
        initialValues={{ name: user?.fullName as string, question: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-[12px] w-full rounded-[5px] border border-quaternary bg-white p-[20px]">
            <div>
              <label htmlFor="name">Name</label>
              <Field
                id="name"
                className="h-[55px] w-full rounded-[5px] border border-quaternary p-[10px] focus:outline-none"
                name="name"
                type="text"
              />
              <ErrorMessage name="name" component="div" className="text-[12px] text-red-500" />
            </div>
            <div className="mt-[10px] mb-4">
              <label htmlFor="question">Question</label>
              <Field
                id="question"
                name="question"
                as="textarea"
                className="h-[80px] w-full rounded-[5px] border border-quaternary p-[10px] focus:outline-none lg:h-[150px]"
              />
              <ErrorMessage name="question" component="div" className="text-[12px] text-red-500" />
            </div>
            <button
              type="submit"
              className={`flex h-[35px] w-full cursor-pointer items-center justify-center rounded-[5px] bg-primary text-[14px] font-semibold text-white opacity-85 hover:opacity-100 sm:w-[127px]`}
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Question"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default QuestionAnswerForm;
