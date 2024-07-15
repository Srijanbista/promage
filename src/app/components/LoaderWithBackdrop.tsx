"use client";

const LoaderWithBackdrop = ({ isLoading }: { isLoading: boolean }) => {
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
