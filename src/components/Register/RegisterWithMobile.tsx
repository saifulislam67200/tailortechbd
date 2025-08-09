import { useAppDispatch } from "@/hooks/redux";
import { ICountry } from "@/hooks/useCountries";
import { useRegisterCustomerMutation } from "@/redux/features/user/user.api";
import { setToken, setUser } from "@/redux/features/user/user.slice";
import { IQueruMutationErrorResponse } from "@/types";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { ImSpinner11 } from "react-icons/im";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import CountrySelector from "../ui/CountrySelector";
import FormMessage, { IFormMessage } from "../ui/FormMessage";
import Input from "../ui/Input";

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const initialValues = {
  phoneNumber: "",
  password: "",
  fullName: "",
  userVerificationCode: "",
};

const RegisterWithMobile = () => {
  const [country, setCountry] = useState<ICountry>();
  const [verificationCode, setVerificationCode] = useState<number>(generateVerificationCode());

  const [registerUser, { isLoading }] = useRegisterCustomerMutation();
  const [formMessage, setFormMessage] = useState<IFormMessage | null>(null);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleSubmit = async (
    values: typeof initialValues,
    helper: FormikHelpers<typeof initialValues>
  ) => {
    setFormMessage(null);
    if (!country) {
      helper.setFieldError("phoneNumber", "* Country is required");
      return;
    }
    const phone = `${country?.dial_code}${values.phoneNumber}`;

    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      helper.setFieldError("phoneNumber", "* Invalid phone number");
      return;
    }

    const res = await registerUser({
      phoneNumber: phone,
      password: values.password,
      fullName: values.fullName,
      geo_profile: { country: country.name, phone_code: country.dial_code },
    });
    const error = res.error as IQueruMutationErrorResponse;

    if (error) {
      if (error.data?.message) {
        setFormMessage({ message: error.data.message, type: "error" });
      } else {
        setFormMessage({ message: "Something went wrong", type: "error" });
      }
      return;
    }

    const user = res.data?.data.result;
    const token = res.data?.data.accessToken;

    if (user) {
      dispatch(setUser(user));
    }

    if (token) {
      dispatch(setToken(token));
    }

    router.replace("/register/verification");
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("* phone number number is required")
      .matches(/^\d{6,15}$/, "* Enter a valid phone number number"),
    password: Yup.string()
      .required("* Password is required")
      .min(6, "* Password must be at least 6 characters"),
    fullName: Yup.string().required("* full Name is required"),
    userVerificationCode: Yup.string()
      .required("* Verification code is required")
      .test("match-code", "Verification code does not match", function (value) {
        return value === verificationCode.toString();
      }),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-[16px]">
          <CountrySelector onCountrySelect={(c) => setCountry(c)} />

          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center justify-start gap-0">
              <span className="border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
                {country?.dial_code || "+880"}
              </span>
              <Field
                type="number"
                name="phoneNumber"
                placeholder="Enter Your Mobile Number"
                as={Input}
              />
            </div>
            {touched.phoneNumber && errors.phoneNumber && (
              <span className="text-[12px] text-danger">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="flex flex-col gap-[5px]">
            <Field type="text" name="fullName" placeholder="Enter Your full name" as={Input} />
            {touched.fullName && errors.fullName && (
              <span className="text-[12px] text-danger">{errors.fullName}</span>
            )}
          </div>
          <div className="flex flex-col gap-[5px]">
            <Field type="password" name="password" placeholder="Enter Your Password" as={Input} />
            {touched.password && errors.password && (
              <span className="text-[12px] text-danger">{errors.password}</span>
            )}
          </div>

          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center justify-start">
              <div className="center w-[187px] rounded-[5px] bg-[#0c0c0c] text-[28px] text-white">
                {verificationCode}
              </div>
              <button
                type="button"
                onClick={() => setVerificationCode(generateVerificationCode())}
                className="h-[42px] cursor-pointer rounded-[5px] bg-[#198754] px-[12px] py-[6px] text-white"
              >
                <ImSpinner11 className="h-[16px] w-[16px]" />
              </button>
            </div>

            <div className="flex flex-col gap-[5px]">
              <Field
                type="number"
                name="userVerificationCode"
                placeholder="Enter above numbers"
                as={Input}
              />
              {touched.userVerificationCode && errors.userVerificationCode && (
                <span className="text-[12px] text-danger">{errors.userVerificationCode}</span>
              )}
            </div>
          </div>
          <FormMessage formMessage={formMessage} />
          <button
            disabled={isLoading}
            type="submit"
            className="center cursor-pointer gap-[10px] rounded-[5px] bg-primary py-[6px] text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-primary/50"
          >
            {isLoading ? (
              <>
                Please wait...
                <CgSpinner className="animate-spin" />
              </>
            ) : (
              "Submit"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterWithMobile;
