"use client";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import LoaderWithBackdrop from "../components/LoaderWithBackdrop";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="h-screen w-screen bg-primary grid place-items-center">
      <LoaderWithBackdrop isLoading={isLoading} />
      <LoginForm setIsLoading={setIsLoading} />
    </div>
  );
};

export default Login;
