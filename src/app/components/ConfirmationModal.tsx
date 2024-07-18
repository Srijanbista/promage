import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export const ConfirmationModal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  description,
  handlePrimaryAction,
  primaryButtonLabel = "Proceed",
  logo = <ExclamationTriangleIcon aria-hidden="true" />,
  primaryButtonClassName = "bg-red-700",
  logoClassName = "bg-red-100 text-red-600",
}: {
  isModalOpen: boolean;
  title: string;
  description: string;
  logo?: React.ReactNode;
  setIsModalOpen: Function;
  handlePrimaryAction: Function;
  primaryButtonLabel?: string;
  primaryButtonClassName?: string;
  logoClassName?: string;
}) => {
  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[1049]"
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-[1050]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${logoClassName}`}
                  >
                    <div className="h-6 w-6">{logo}</div>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {title ?? "Confirmation"}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm hover:bg-slate- text-gray-500">
                        {description ??
                          `Are you sure you want to proceed? This action might be irreversible.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 sm:ml-3 sm:w-auto ${primaryButtonClassName}`}
                  onClick={() => {
                    setIsModalOpen(false);
                    handlePrimaryAction();
                  }}
                >
                  {primaryButtonLabel ?? "Proceed"}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
