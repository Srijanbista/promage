"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const LoaderWithBackdrop = () => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  console.log("isLoading", isLoading);
  return (
    <>
      {isLoading && (
        <div className=" z-[1051] absolute flex items-center justify-center w-full h-full bg-neutral-700 opacity-95">
          <div className="h-20 w-20 bg-white rounded-sm animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default LoaderWithBackdrop;
