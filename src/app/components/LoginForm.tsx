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
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../(slice)/LoaderSlice";

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
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  // Handles form submission
  const handleFormSubmit = async (
    values: SignUpValues | LoginValues,
    resetForm: FormikHelpers<LoginValues | SignUpValues>["resetForm"]
  ) => {
    dispatch(startLoading());
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (isSignInPage) {
      handleLogin(values as LoginValues)
        .then((resp) => {
          localStorage.setItem("user:token", resp.token);
          localStorage.setItem("user:name", resp.name);
          router.push("/");
          successToast("Login successful");
        })
        .catch(() => {
          console.log("Invalid credentials");
          errorToast("Invalid credentials");
        })
        .finally(() => {
          resetForm();
          setTimeout(() => dispatch(stopLoading()), 1000); // 2 seconds delay
        });
    } else {
      handleUserSignup(values as SignUpValues)
        .then((resp) => {
          successToast("Sign Up successful");
          setIsSignInPage(true);
        })
        .catch(() => {
          errorToast("Error creating user");
        })
        .finally(() => {
          resetForm();
          setTimeout(() => dispatch(stopLoading()), 1000); // 2 seconds delay
        });
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
