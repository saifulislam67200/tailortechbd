import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    question: Yup.string().required("Question is required"),
});

const QuestionAnswerForm = () => {

    const handleSubmit = async (values: { name: string; question: string }) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={{ name: "", question: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form
                    className="w-full bg-white border border-quaternary p-[20px] rounded-[5px] mt-[15px]"

                >
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field id="name" className="w-full p-[10px] focus:outline-none rounded-[5px] h-[55px] border-quaternary border" name="name" type="text" />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-[12px]" />
                    </div>
                    <div className="mt-[10px]">
                        <label htmlFor="question">Question</label>
                        <Field
                            id="question"
                            name="question"
                            as="textarea"
                            rows={4}
                            className="w-full rounded-[5px] h-[150px] p-[10px] focus:outline-none  border-quaternary border"
                        />
                        <ErrorMessage name="question" component="div" className="text-red-500 text-[12px]" />
                    </div>
                    <button type="submit" className="w-full sm:w-[127px] h-[35px] flex items-center justify-center rounded-[5px] bg-primary text-white hover:text-black text-[14px] font-semibold" disabled={isSubmitting}>
                        Submit Question
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default QuestionAnswerForm;