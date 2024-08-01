import toast from "react-hot-toast";

export const successToast = (message: string) => {
  toast.success(message, {
    icon: "😀",
    position: "top-right",
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    icon: "😢",
    position: "top-right",
  });
};
export const infoToast = (message: string) => {
  toast(message, {
    icon: "📢",
    position: "top-right",
  });
};
