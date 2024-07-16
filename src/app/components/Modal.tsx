import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

export const Modal = ({
  children,
  isLoading = false,
  isModalOpen,
  setIsModalOpen,
  size = "sm",
}: {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  children: ReactNode;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "7xl";
}) => {
  const getWidthClass = (size: string) => {
    switch (size) {
      case "xl":
        return "max-w-5xl";
      case "lg":
        // code for case lg
        break;
      case "md":
        // code for case md
        break;
      case "7xl":
        return "max-w-7xl";
      default:
        return "sm:max-w-lg";
    }
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        open={isModalOpen}
        onClose={() => {
          return isLoading ? undefined : setIsModalOpen(false);
        }}
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[1049] ${
              isLoading && "pointer-events-none"
            }`}
            aria-hidden="true"
          />
        </Transition.Child>

        <div
          className={`fixed inset-0 flex w-screen items-center justify-center p-4 z-[1050] ${
            isLoading && "pointer-events-none"
          }`}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel
              className={`relative transform rounded-lg bg-white text-left shadow-xl border border-zinc-300 transition-all sm:my-8 sm:w-full  ${getWidthClass(
                size
              )}`}
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
