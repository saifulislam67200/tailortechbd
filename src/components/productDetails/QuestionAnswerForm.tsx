import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  question: Yup.string().required("Question is required"),
});

//! temporary => no-unused-vars, i will fix this when i implement the api
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const QuestionAnswerForm = ({ productId }: { productId: string }) => {
  const handleSubmit = async (values: { name: string; question: string }) => {
    console.log(values);
  };

  return (
    <>
      <h1 className="mt-[12px] text-[16px] font-bold text-black">Your Question</h1>
      <Formik
        initialValues={{ name: "", question: "" }}
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
            <div className="mt-[10px]">
              <label htmlFor="question">Question</label>
              <Field
                id="question"
                name="question"
                as="textarea"
                rows={4}
                className="h-[150px] w-full rounded-[5px] border border-quaternary p-[10px] focus:outline-none"
              />
              <ErrorMessage name="question" component="div" className="text-[12px] text-red-500" />
            </div>
            <button
              type="submit"
              className="flex h-[35px] w-full cursor-pointer items-center justify-center rounded-[5px] bg-primary text-[14px] font-semibold text-white hover:text-black sm:w-[127px]"
              disabled={isSubmitting}
            >
              Submit Question
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default QuestionAnswerForm;
