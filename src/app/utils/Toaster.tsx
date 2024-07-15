import toast from "react-hot-toast";

export const successToast = (message: string) => {
  toast.success(message, {
    icon: "🚀",
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    icon: "😢",
  });
};
