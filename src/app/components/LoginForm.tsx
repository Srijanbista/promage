// LoginForm.js
"use client";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "../utils/Toaster";
import {
  handleLogin,
  handleUserSignup,
} from "../login/(services)/Login.service";
import { FormikInputField } from "./CreatProjectForm";

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

interface LoginValues {
  email: string;
  password: string;
}

interface SignUpValues extends LoginValues {
  name: string;
}

const LoginForm = () => {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  // Handles form submission
  const handleFormSubmit = (
    values: SignUpValues | LoginValues,
    resetForm: FormikHelpers<LoginValues | SignUpValues>["resetForm"]
  ) => {
    if (isSignInPage) {
      handleLogin(values as LoginValues)
        .then((resp) => {
          debugger;
          console.log(resp);
          localStorage.setItem("user:token", resp.token);
          router.push("/dashboard");
          setTimeout(() => {
            successToast("Login successful");
          }, 2000);
        })
        .catch(() => {
          console.log("Invalid credentials");
          setTimeout(() => {
            errorToast("Invalid credentials");
          }, 2000);
        })
        .finally(() => resetForm());
    } else {
      handleUserSignup(values as SignUpValues)
        .then((resp) => {
          console.log(resp);
          setTimeout(() => {
            successToast("Sign Up successful");
          }, 2000);
        })
        .catch(() => {
          console.log("Error creating user");
          setTimeout(() => {
            errorToast("Error creating user");
          }, 2000);
        })
        .finally(() => resetForm());
    }
  };

  return (
    <div className="border flex flex-col items-center justify-center py-10 px-5 bg-white rounded-md shadow-lg max-w-md w-full mx-auto sm:w-3/4 lg:w-1/2">
      <h1 className="text-slate-800 font-semibold mb-4 text-4xl text-center">
        Promage
      </h1>
      <span className="text-lg mb-10 text-center">
        {isSignInPage ? "Sign In to explore" : "Sign Up to continue"}
      </span>
      <Formik
        enableReinitialize
        initialValues={
          isSignInPage ? initialValues : { name: "", ...initialValues }
        }
        onSubmit={(values, { resetForm }) =>
          handleFormSubmit(values, resetForm)
        }
        validationSchema={isSignInPage ? LoginFormSchema : SignUpFormSchema}
      >
        {(formikProps) => (
          <Form className="flex flex-col gap-y-6 w-full">
            {!isSignInPage && (
              <FormikInputField
                name="name"
                placeholder="Name"
                formikProps={formikProps}
              />
            )}
            <FormikInputField
              name="email"
              type="email"
              placeholder="Email"
              formikProps={formikProps}
            />
            <FormikInputField
              name="password"
              type="password"
              placeholder="Password"
              formikProps={formikProps}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg my-8 transition duration-150 ease-in-out transform hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700 active:scale-95"
            >
              {isSignInPage ? "Log In" : "Sign Up"}
            </button>
            <p className="text-center">
              {isSignInPage
                ? "Don't have an Account? "
                : "Already have an account? "}
              <button
                className="text-blue-500 underline transition duration-150 ease-in-out transform hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:text-blue-700 active:scale-95"
                type="button"
                onClick={() => setIsSignInPage(!isSignInPage)}
              >
                {isSignInPage ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
