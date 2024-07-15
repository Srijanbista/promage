"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { HTMLInputTypeAttribute, useState } from "react";
import * as yup from "yup";
import { handleLogin } from "../login/(services)/Login.service";
import { useRouter } from "next/navigation";

// Validation schema for the login form
const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup.string().required("Required"),
});

// Validation schema for the signup form
const SignUpFormSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  password: yup.string().required("Required").min(8, "Password is too short"),
});

const LoginForm = () => {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const router = useRouter();
  // Initial values for the form
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <div className="border flex flex-col container items-center justify-center py-10 px-5 w-1/2 bg-white/30">
        <h1 className="text-slate-800 font-semibold mb-4 text-4xl text-center">
          {`Welcome ${isSignInPage ? "back" : ""} to Promage`}
        </h1>
        <span className="text-lg mb-10">
          {isSignInPage ? "Sign In to explore" : "Sign Up to continue"}
        </span>
        <Formik
          initialValues={
            isSignInPage ? initialValues : { name: "", ...initialValues }
          }
          onSubmit={(values) => {
            isSignInPage
              ? handleLogin(values)
                  .then((resp: any) => {
                    console.log(resp);
                    localStorage.setItem("user:token", resp.token);
                    router.push("/dashboard");
                  })
                  .catch((err) => console.log("Invalid credentials"))
              : console.log(values);
          }}
          validationSchema={isSignInPage ? LoginFormSchema : SignUpFormSchema}
        >
          <Form className="flex flex-col gap-y-2 w-1/2">
            {isSignInPage ? null : (
              <FieldGroup name="name" placeholder="Enter Email" label="Name" />
            )}
            <FieldGroup
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
            />
            <FieldGroup
              name="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg my-8"
            >
              {isSignInPage ? "Log In" : "Sign Up"}
            </button>
            <p className="text-center">
              {isSignInPage
                ? "Don't have an Account? "
                : "Already have an account? "}
              <button
                className="text-blue-500 underline"
                type="button"
                onClick={() => setIsSignInPage(!isSignInPage)}
              >
                {isSignInPage ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;

export const FieldGroup = ({
  name,
  type = "text",
  placeholder,
  label,
  className = "",
}: {
  name: string;
  type?: string;
  placeholder: string;
  label: string;
  className?: HTMLInputTypeAttribute;
}) => {
  return (
    <>
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
      <Field
        type={type}
        name={name}
        className={`border rounded-md p-2 ${className}`}
      />
      <ErrorMessage name={name} component="span" className="text-red-500" />
    </>
  );
};
